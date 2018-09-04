package prisma

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"reflect"
	"strconv"
	"text/template"

	"github.com/machinebox/graphql"
	"github.com/mitchellh/mapstructure"
)

// ID docs
type ID struct{}

// GraphQLField docs
type GraphQLField struct {
	Name       string
	TypeName   string
	TypeFields []string
}

// GraphQLArg docs
type GraphQLArg struct {
	Name     string
	Key      string
	TypeName string
	Value    interface{}
}

// Instruction docs
type Instruction struct {
	Name      string
	Field     GraphQLField
	Operation string
	Args      []GraphQLArg
}

func isZeroOfUnderlyingType(x interface{}) bool {
	return reflect.DeepEqual(x, reflect.Zero(reflect.TypeOf(x)).Interface())
}

func isArray(i interface{}) bool {
	v := reflect.ValueOf(i)
	switch v.Kind() {
	case reflect.Array:
		return true
	case reflect.Slice:
		return true
	default:
		return false
	}
}

// DB Type to represent the client
type DB struct {
	Endpoint string
	Debug    bool
	Exists   Exists
}

// Exists docs
// TODO: Handle scoping better
type Exists struct {
	Endpoint string
	Debug    bool
}

// ProcessInstructions docs
func (db *DB) ProcessInstructions(stack []Instruction) string {
	query := make(map[string]interface{})
	// TODO: This needs to handle arg name collisions across instructions
	argsByInstruction := make(map[string][]GraphQLArg)
	var allArgs []GraphQLArg
	firstInstruction := stack[0]
	for i := len(stack) - 1; i >= 0; i-- {
		instruction := stack[i]
		if db.Debug {
			fmt.Println("Instruction: ", instruction)
		}
		if len(query) == 0 {
			query[instruction.Name] = instruction.Field.TypeFields
			argsByInstruction[instruction.Name] = instruction.Args
			for _, arg := range instruction.Args {
				allArgs = append(allArgs, arg)
			}
		} else {
			previousInstruction := stack[i+1]
			query[instruction.Name] = map[string]interface{}{
				previousInstruction.Name: query[previousInstruction.Name],
			}
			argsByInstruction[instruction.Name] = instruction.Args
			for _, arg := range instruction.Args {
				allArgs = append(allArgs, arg)
			}
			delete(query, previousInstruction.Name)
		}
	}

	if db.Debug {
		fmt.Println("Final Query:", query)
		fmt.Println("Final Args By Instruction:", argsByInstruction)
		fmt.Println("Final All Args:", allArgs)
	}

	// TODO: Make this recursive - current depth = 3
	queryTemplateString := `
  {{ $.operation }} {{ $.operationName }} 
  	{{- if eq (len $.allArgs) 0 }} {{ else }} ( {{ end }}
    	{{- range $_, $arg := $.allArgs }}
			${{ $arg.Name }}: {{ $arg.TypeName }}, 
		{{- end }}
	{{- if eq (len $.allArgs) 0 }} {{ else }} ) {{ end }}
    {
    {{- range $k, $v := $.query }}
    {{- if isArray $v }}
	  {{- $k }}
	  {{- range $argKey, $argValue := $.argsByInstruction }}
	  {{- if eq $argKey $k }}
	  	{{- if eq (len $argValue) 0 }} {{ else }} ( {{ end }}
				{{- range $k, $arg := $argValue}}
					{{ $arg.Key }}: ${{ $arg.Name }},
				{{- end }}
		{{- if eq (len $argValue) 0 }} {{ else }} ) {{ end }}
			{{- end }}
		{{- end }}
	  {
        {{- range $k1, $v1 := $v }}
          {{ $v1 }}
        {{end}}
      }
    {{- else }}
	  {{ $k }} 
	  {{- range $argKey, $argValue := $.argsByInstruction }}
	  	{{- if eq $argKey $k }}
	  		{{- if eq (len $argValue) 0 }} {{ else }} ( {{ end }}
            {{- range $k, $arg := $argValue}}
              {{ $arg.Key }}: ${{ $arg.Name }},
            {{- end }}
			{{- if eq (len $argValue) 0 }} {{ else }} ) {{ end }}
          {{- end }}
        {{- end }}
		{
        {{- range $k, $v := $v }}
        {{- if isArray $v }}
		  {{ $k }} 
		  {{- range $argKey, $argValue := $.argsByInstruction }}
		  {{- if eq $argKey $k }}
			{{- if eq (len $argValue) 0 }} {{ else }} ( {{ end }}
                {{- range $k, $arg := $argValue}}
                  {{ $arg.Key }}: ${{ $arg.Name }},
                {{- end }}
				{{- if eq (len $argValue) 0 }} {{ else }} ) {{ end }} 
              {{- end }}
            {{- end }}
			{ 
            {{- range $k1, $v1 := $v }}
              {{ $v1 }}
            {{end}}
          }
        {{- else }}
		  {{ $k }} 
		  {{- range $argKey, $argValue := $.argsByInstruction }}
		  {{- if eq $argKey $k }}
		  	{{- if eq (len $argValue) 0 }} {{ else }} ( {{ end }}
                {{- range $k, $arg := $argValue}}
                  {{ $arg.Key }}: ${{ $arg.Name }},
                {{- end }}
				{{- if eq (len $argValue) 0 }} {{ else }} ) {{ end }} 
              {{- end }}
            {{- end }}
			{
            {{- range $k, $v := $v }}
              {{- if isArray $v }}
                {{ $k }} { 
                  {{- range $k1, $v1 := $v }}
                    {{ $v1 }}
                  {{end}}
                }
              {{- else }}
				{{ $k }} 
				{{- range $argKey, $argValue := $.argsByInstruction }}
				{{- if eq $argKey $k }}
					{{- if eq (len $argValue) 0 }} {{ else }} ( {{ end }}
                      {{- range $k, $arg := $argValue}}
                        {{ $arg.Key }}: ${{ $arg.Name }},
                      {{- end }}
					  {{- if eq (len $argValue) 0 }} {{ else }} ) {{ end }} 
                    {{- end }}
                  {{- end }}
				  {
                  id
                }
              {{- end }}
              {{- end }}
          }
        {{- end }}
        {{- end }}
      }
    {{- end }}
    {{- end }}
    }
  `

	templateFunctions := template.FuncMap{
		"isArray": isArray,
	}

	queryTemplate, err := template.New("query").Funcs(templateFunctions).Parse(queryTemplateString)
	var queryBytes bytes.Buffer
	var data = make(map[string]interface{})
	data = map[string]interface{}{
		"query":             query,
		"argsByInstruction": argsByInstruction,
		"allArgs":           allArgs,
		"operation":         firstInstruction.Operation,
		"operationName":     firstInstruction.Name,
	}
	queryTemplate.Execute(&queryBytes, data)

	if db.Debug {
		fmt.Println("Query String: ", queryBytes.String())
	}
	if err == nil {
		return queryBytes.String()
	}
	return "Failed to generate query"
}

// Queries

// TodoesParams docs
type TodoesParams struct {
	Where   *TodoWhereInput   `json:"where,omitempty"`
	OrderBy *TodoOrderByInput `json:"orderBy,omitempty"`
	Skip    *int32            `json:"skip,omitempty"`
	After   *string           `json:"after,omitempty"`
	Before  *string           `json:"before,omitempty"`
	First   *int32            `json:"first,omitempty"`
	Last    *int32            `json:"last,omitempty"`
}

// Todoes docs
func (db DB) Todoes(params *TodoesParams) *TodoExecArray {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereInput",
			Value:    *params.Where,
		})
	}
	if params.OrderBy != nil {
		args = append(args, GraphQLArg{
			Name:     "orderBy",
			Key:      "orderBy",
			TypeName: "TodoOrderByInput",
			Value:    *params.OrderBy,
		})
	}
	if params.Skip != nil {
		args = append(args, GraphQLArg{
			Name:     "skip",
			Key:      "skip",
			TypeName: "Int",
			Value:    *params.Skip,
		})
	}
	if params.After != nil {
		args = append(args, GraphQLArg{
			Name:     "after",
			Key:      "after",
			TypeName: "String",
			Value:    *params.After,
		})
	}
	if params.Before != nil {
		args = append(args, GraphQLArg{
			Name:     "before",
			Key:      "before",
			TypeName: "String",
			Value:    *params.Before,
		})
	}
	if params.First != nil {
		args = append(args, GraphQLArg{
			Name:     "first",
			Key:      "first",
			TypeName: "Int",
			Value:    *params.First,
		})
	}
	if params.Last != nil {
		args = append(args, GraphQLArg{
			Name:     "last",
			Key:      "last",
			TypeName: "Int",
			Value:    *params.Last,
		})
	}

	stack = append(stack, Instruction{
		Name: "todoes",
		Field: GraphQLField{
			Name:       "todoes",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "query",
		Args:      args,
	})

	return &TodoExecArray{
		db:    db,
		stack: stack,
	}
}

// UsersParams docs
type UsersParams struct {
	Where   *UserWhereInput   `json:"where,omitempty"`
	OrderBy *UserOrderByInput `json:"orderBy,omitempty"`
	Skip    *int32            `json:"skip,omitempty"`
	After   *string           `json:"after,omitempty"`
	Before  *string           `json:"before,omitempty"`
	First   *int32            `json:"first,omitempty"`
	Last    *int32            `json:"last,omitempty"`
}

// Users docs
func (db DB) Users(params *UsersParams) *UserExecArray {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereInput",
			Value:    *params.Where,
		})
	}
	if params.OrderBy != nil {
		args = append(args, GraphQLArg{
			Name:     "orderBy",
			Key:      "orderBy",
			TypeName: "UserOrderByInput",
			Value:    *params.OrderBy,
		})
	}
	if params.Skip != nil {
		args = append(args, GraphQLArg{
			Name:     "skip",
			Key:      "skip",
			TypeName: "Int",
			Value:    *params.Skip,
		})
	}
	if params.After != nil {
		args = append(args, GraphQLArg{
			Name:     "after",
			Key:      "after",
			TypeName: "String",
			Value:    *params.After,
		})
	}
	if params.Before != nil {
		args = append(args, GraphQLArg{
			Name:     "before",
			Key:      "before",
			TypeName: "String",
			Value:    *params.Before,
		})
	}
	if params.First != nil {
		args = append(args, GraphQLArg{
			Name:     "first",
			Key:      "first",
			TypeName: "Int",
			Value:    *params.First,
		})
	}
	if params.Last != nil {
		args = append(args, GraphQLArg{
			Name:     "last",
			Key:      "last",
			TypeName: "Int",
			Value:    *params.Last,
		})
	}

	stack = append(stack, Instruction{
		Name: "users",
		Field: GraphQLField{
			Name:       "users",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "query",
		Args:      args,
	})

	return &UserExecArray{
		db:    db,
		stack: stack,
	}
}

// Exists

// Todo exists docs
func (exists *Exists) Todo(params *TodoWhereUniqueInput) bool {
	// TODO: Reference to DB in a better way
	db := DB{
		Endpoint: (map[bool]string{true: exists.Endpoint, false: "http://localhost:4466/go-orm/dev"})[exists.Endpoint != ""],
		Debug:    exists.Debug,
	}
	data := db.Todo(
		params,
	).Exec()
	if isZeroOfUnderlyingType(data) {
		return false
	}
	return true
}

// TodoParams docs
type TodoParams struct {
	Where *TodoWhereUniqueInput `json:"where"`
}

// Todo docs
func (db DB) Todo(params *TodoWhereUniqueInput) *TodoExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereUniqueInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "todo",
		Field: GraphQLField{
			Name:       "todo",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "query",
		Args:      args,
	})

	return &TodoExec{
		db:    db,
		stack: stack,
	}
}

// Exists

// User exists docs
func (exists *Exists) User(params *UserWhereUniqueInput) bool {
	// TODO: Reference to DB in a better way
	db := DB{
		Endpoint: (map[bool]string{true: exists.Endpoint, false: "http://localhost:4466/go-orm/dev"})[exists.Endpoint != ""],
		Debug:    exists.Debug,
	}
	data := db.User(
		params,
	).Exec()
	if isZeroOfUnderlyingType(data) {
		return false
	}
	return true
}

// UserParams docs
type UserParams struct {
	Where *UserWhereUniqueInput `json:"where"`
}

// User docs
func (db DB) User(params *UserWhereUniqueInput) *UserExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereUniqueInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "user",
		Field: GraphQLField{
			Name:       "user",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "query",
		Args:      args,
	})

	return &UserExec{
		db:    db,
		stack: stack,
	}
}

// Exists

// TodoesConnection exists docs
func (exists *Exists) TodoesConnection(params *TodoWhereInput) bool {
	// TODO: Reference to DB in a better way
	db := DB{
		Endpoint: (map[bool]string{true: exists.Endpoint, false: "http://localhost:4466/go-orm/dev"})[exists.Endpoint != ""],
		Debug:    exists.Debug,
	}
	data := db.TodoesConnection(
		&TodoesConnectionParams{
			Where: params,
		},
	).Exec()
	if isZeroOfUnderlyingType(data) {
		return false
	}
	return true
}

// TodoesConnectionParams docs
type TodoesConnectionParams struct {
	Where   *TodoWhereInput   `json:"where,omitempty"`
	OrderBy *TodoOrderByInput `json:"orderBy,omitempty"`
	Skip    *int32            `json:"skip,omitempty"`
	After   *string           `json:"after,omitempty"`
	Before  *string           `json:"before,omitempty"`
	First   *int32            `json:"first,omitempty"`
	Last    *int32            `json:"last,omitempty"`
}

// TodoesConnection docs
func (db DB) TodoesConnection(params *TodoesConnectionParams) *TodoConnectionExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereInput",
			Value:    *params.Where,
		})
	}
	if params.OrderBy != nil {
		args = append(args, GraphQLArg{
			Name:     "orderBy",
			Key:      "orderBy",
			TypeName: "TodoOrderByInput",
			Value:    *params.OrderBy,
		})
	}
	if params.Skip != nil {
		args = append(args, GraphQLArg{
			Name:     "skip",
			Key:      "skip",
			TypeName: "Int",
			Value:    *params.Skip,
		})
	}
	if params.After != nil {
		args = append(args, GraphQLArg{
			Name:     "after",
			Key:      "after",
			TypeName: "String",
			Value:    *params.After,
		})
	}
	if params.Before != nil {
		args = append(args, GraphQLArg{
			Name:     "before",
			Key:      "before",
			TypeName: "String",
			Value:    *params.Before,
		})
	}
	if params.First != nil {
		args = append(args, GraphQLArg{
			Name:     "first",
			Key:      "first",
			TypeName: "Int",
			Value:    *params.First,
		})
	}
	if params.Last != nil {
		args = append(args, GraphQLArg{
			Name:     "last",
			Key:      "last",
			TypeName: "Int",
			Value:    *params.Last,
		})
	}

	stack = append(stack, Instruction{
		Name: "todoesConnection",
		Field: GraphQLField{
			Name:       "todoesConnection",
			TypeName:   "TodoConnection",
			TypeFields: []string{},
		},
		Operation: "query",
		Args:      args,
	})

	return &TodoConnectionExec{
		db:    db,
		stack: stack,
	}
}

// Exists

// UsersConnection exists docs
func (exists *Exists) UsersConnection(params *UserWhereInput) bool {
	// TODO: Reference to DB in a better way
	db := DB{
		Endpoint: (map[bool]string{true: exists.Endpoint, false: "http://localhost:4466/go-orm/dev"})[exists.Endpoint != ""],
		Debug:    exists.Debug,
	}
	data := db.UsersConnection(
		&UsersConnectionParams{
			Where: params,
		},
	).Exec()
	if isZeroOfUnderlyingType(data) {
		return false
	}
	return true
}

// UsersConnectionParams docs
type UsersConnectionParams struct {
	Where   *UserWhereInput   `json:"where,omitempty"`
	OrderBy *UserOrderByInput `json:"orderBy,omitempty"`
	Skip    *int32            `json:"skip,omitempty"`
	After   *string           `json:"after,omitempty"`
	Before  *string           `json:"before,omitempty"`
	First   *int32            `json:"first,omitempty"`
	Last    *int32            `json:"last,omitempty"`
}

// UsersConnection docs
func (db DB) UsersConnection(params *UsersConnectionParams) *UserConnectionExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereInput",
			Value:    *params.Where,
		})
	}
	if params.OrderBy != nil {
		args = append(args, GraphQLArg{
			Name:     "orderBy",
			Key:      "orderBy",
			TypeName: "UserOrderByInput",
			Value:    *params.OrderBy,
		})
	}
	if params.Skip != nil {
		args = append(args, GraphQLArg{
			Name:     "skip",
			Key:      "skip",
			TypeName: "Int",
			Value:    *params.Skip,
		})
	}
	if params.After != nil {
		args = append(args, GraphQLArg{
			Name:     "after",
			Key:      "after",
			TypeName: "String",
			Value:    *params.After,
		})
	}
	if params.Before != nil {
		args = append(args, GraphQLArg{
			Name:     "before",
			Key:      "before",
			TypeName: "String",
			Value:    *params.Before,
		})
	}
	if params.First != nil {
		args = append(args, GraphQLArg{
			Name:     "first",
			Key:      "first",
			TypeName: "Int",
			Value:    *params.First,
		})
	}
	if params.Last != nil {
		args = append(args, GraphQLArg{
			Name:     "last",
			Key:      "last",
			TypeName: "Int",
			Value:    *params.Last,
		})
	}

	stack = append(stack, Instruction{
		Name: "usersConnection",
		Field: GraphQLField{
			Name:       "usersConnection",
			TypeName:   "UserConnection",
			TypeFields: []string{},
		},
		Operation: "query",
		Args:      args,
	})

	return &UserConnectionExec{
		db:    db,
		stack: stack,
	}
}

// NodeParams docs
type NodeParams struct {
	ID *string `json:"id"`
}

// Node docs
func (db DB) Node(params *ID) *NodeExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "id",
			Key:      "id",
			TypeName: "ID!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "node",
		Field: GraphQLField{
			Name:       "node",
			TypeName:   "Node",
			TypeFields: []string{},
		},
		Operation: "query",
		Args:      args,
	})

	return &NodeExec{
		db:    db,
		stack: stack,
	}
}

// Mutations

// CreateTodoParams docs
type CreateTodoParams struct {
	Data *TodoCreateInput `json:"data"`
}

// CreateTodo docs
func (db DB) CreateTodo(params *TodoCreateInput) *TodoExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "TodoCreateInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "createTodo",
		Field: GraphQLField{
			Name:       "createTodo",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &TodoExec{
		db:    db,
		stack: stack,
	}
}

// CreateUserParams docs
type CreateUserParams struct {
	Data *UserCreateInput `json:"data"`
}

// CreateUser docs
func (db DB) CreateUser(params *UserCreateInput) *UserExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "UserCreateInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "createUser",
		Field: GraphQLField{
			Name:       "createUser",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &UserExec{
		db:    db,
		stack: stack,
	}
}

// UpdateTodoParams docs
type UpdateTodoParams struct {
	Data  *TodoUpdateInput      `json:"data"`
	Where *TodoWhereUniqueInput `json:"where"`
}

// UpdateTodo docs
func (db DB) UpdateTodo(params *UpdateTodoParams) *TodoExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Data != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "TodoUpdateInput!",
			Value:    *params.Data,
		})
	}
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereUniqueInput!",
			Value:    *params.Where,
		})
	}

	stack = append(stack, Instruction{
		Name: "updateTodo",
		Field: GraphQLField{
			Name:       "updateTodo",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &TodoExec{
		db:    db,
		stack: stack,
	}
}

// UpdateUserParams docs
type UpdateUserParams struct {
	Data  *UserUpdateInput      `json:"data"`
	Where *UserWhereUniqueInput `json:"where"`
}

// UpdateUser docs
func (db DB) UpdateUser(params *UpdateUserParams) *UserExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Data != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "UserUpdateInput!",
			Value:    *params.Data,
		})
	}
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereUniqueInput!",
			Value:    *params.Where,
		})
	}

	stack = append(stack, Instruction{
		Name: "updateUser",
		Field: GraphQLField{
			Name:       "updateUser",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &UserExec{
		db:    db,
		stack: stack,
	}
}

// DeleteTodoParams docs
type DeleteTodoParams struct {
	Where *TodoWhereUniqueInput `json:"where"`
}

// DeleteTodo docs
func (db DB) DeleteTodo(params *TodoWhereUniqueInput) *TodoExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereUniqueInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "deleteTodo",
		Field: GraphQLField{
			Name:       "deleteTodo",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &TodoExec{
		db:    db,
		stack: stack,
	}
}

// DeleteUserParams docs
type DeleteUserParams struct {
	Where *UserWhereUniqueInput `json:"where"`
}

// DeleteUser docs
func (db DB) DeleteUser(params *UserWhereUniqueInput) *UserExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereUniqueInput!",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "deleteUser",
		Field: GraphQLField{
			Name:       "deleteUser",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &UserExec{
		db:    db,
		stack: stack,
	}
}

// UpsertTodoParams docs
type UpsertTodoParams struct {
	Where  *TodoWhereUniqueInput `json:"where"`
	Create *TodoCreateInput      `json:"create"`
	Update *TodoUpdateInput      `json:"update"`
}

// UpsertTodo docs
func (db DB) UpsertTodo(params *UpsertTodoParams) *TodoExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereUniqueInput!",
			Value:    *params.Where,
		})
	}
	if params.Create != nil {
		args = append(args, GraphQLArg{
			Name:     "create",
			Key:      "create",
			TypeName: "TodoCreateInput!",
			Value:    *params.Create,
		})
	}
	if params.Update != nil {
		args = append(args, GraphQLArg{
			Name:     "update",
			Key:      "update",
			TypeName: "TodoUpdateInput!",
			Value:    *params.Update,
		})
	}

	stack = append(stack, Instruction{
		Name: "upsertTodo",
		Field: GraphQLField{
			Name:       "upsertTodo",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &TodoExec{
		db:    db,
		stack: stack,
	}
}

// UpsertUserParams docs
type UpsertUserParams struct {
	Where  *UserWhereUniqueInput `json:"where"`
	Create *UserCreateInput      `json:"create"`
	Update *UserUpdateInput      `json:"update"`
}

// UpsertUser docs
func (db DB) UpsertUser(params *UpsertUserParams) *UserExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereUniqueInput!",
			Value:    *params.Where,
		})
	}
	if params.Create != nil {
		args = append(args, GraphQLArg{
			Name:     "create",
			Key:      "create",
			TypeName: "UserCreateInput!",
			Value:    *params.Create,
		})
	}
	if params.Update != nil {
		args = append(args, GraphQLArg{
			Name:     "update",
			Key:      "update",
			TypeName: "UserUpdateInput!",
			Value:    *params.Update,
		})
	}

	stack = append(stack, Instruction{
		Name: "upsertUser",
		Field: GraphQLField{
			Name:       "upsertUser",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &UserExec{
		db:    db,
		stack: stack,
	}
}

// UpdateManyTodoesParams docs
type UpdateManyTodoesParams struct {
	Data  *TodoUpdateInput `json:"data"`
	Where *TodoWhereInput  `json:"where,omitempty"`
}

// UpdateManyTodoes docs
func (db DB) UpdateManyTodoes(params *UpdateManyTodoesParams) *BatchPayloadExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Data != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "TodoUpdateInput!",
			Value:    *params.Data,
		})
	}
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereInput",
			Value:    *params.Where,
		})
	}

	stack = append(stack, Instruction{
		Name: "updateManyTodoes",
		Field: GraphQLField{
			Name:       "updateManyTodoes",
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &BatchPayloadExec{
		db:    db,
		stack: stack,
	}
}

// UpdateManyUsersParams docs
type UpdateManyUsersParams struct {
	Data  *UserUpdateInput `json:"data"`
	Where *UserWhereInput  `json:"where,omitempty"`
}

// UpdateManyUsers docs
func (db DB) UpdateManyUsers(params *UpdateManyUsersParams) *BatchPayloadExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params.Data != nil {
		args = append(args, GraphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: "UserUpdateInput!",
			Value:    *params.Data,
		})
	}
	if params.Where != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereInput",
			Value:    *params.Where,
		})
	}

	stack = append(stack, Instruction{
		Name: "updateManyUsers",
		Field: GraphQLField{
			Name:       "updateManyUsers",
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &BatchPayloadExec{
		db:    db,
		stack: stack,
	}
}

// DeleteManyTodoesParams docs
type DeleteManyTodoesParams struct {
	Where *TodoWhereInput `json:"where,omitempty"`
}

// DeleteManyTodoes docs
func (db DB) DeleteManyTodoes(params *TodoWhereInput) *BatchPayloadExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "TodoWhereInput",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "deleteManyTodoes",
		Field: GraphQLField{
			Name:       "deleteManyTodoes",
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &BatchPayloadExec{
		db:    db,
		stack: stack,
	}
}

// DeleteManyUsersParams docs
type DeleteManyUsersParams struct {
	Where *UserWhereInput `json:"where,omitempty"`
}

// DeleteManyUsers docs
func (db DB) DeleteManyUsers(params *UserWhereInput) *BatchPayloadExec {

	stack := make([]Instruction, 0)
	var args []GraphQLArg
	if params != nil {
		args = append(args, GraphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: "UserWhereInput",
			Value:    *params,
		})
	}

	stack = append(stack, Instruction{
		Name: "deleteManyUsers",
		Field: GraphQLField{
			Name:       "deleteManyUsers",
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	})

	return &BatchPayloadExec{
		db:    db,
		stack: stack,
	}
}

// Types

// TodoOrderByInput docs
type TodoOrderByInput string

const (

	// IDAscTodoOrderByInput docs
	IDAscTodoOrderByInput TodoOrderByInput = "id_ASC"

	// IDDescTodoOrderByInput docs
	IDDescTodoOrderByInput TodoOrderByInput = "id_DESC"

	// TextAscTodoOrderByInput docs
	TextAscTodoOrderByInput TodoOrderByInput = "text_ASC"

	// TextDescTodoOrderByInput docs
	TextDescTodoOrderByInput TodoOrderByInput = "text_DESC"

	// DoneAscTodoOrderByInput docs
	DoneAscTodoOrderByInput TodoOrderByInput = "done_ASC"

	// DoneDescTodoOrderByInput docs
	DoneDescTodoOrderByInput TodoOrderByInput = "done_DESC"

	// UpdatedAtAscTodoOrderByInput docs
	UpdatedAtAscTodoOrderByInput TodoOrderByInput = "updatedAt_ASC"

	// UpdatedAtDescTodoOrderByInput docs
	UpdatedAtDescTodoOrderByInput TodoOrderByInput = "updatedAt_DESC"

	// CreatedAtAscTodoOrderByInput docs
	CreatedAtAscTodoOrderByInput TodoOrderByInput = "createdAt_ASC"

	// CreatedAtDescTodoOrderByInput docs
	CreatedAtDescTodoOrderByInput TodoOrderByInput = "createdAt_DESC"
)

// MutationType docs
type MutationType string

const (

	// CreatedMutationType docs
	CreatedMutationType MutationType = "CREATED"

	// UpdatedMutationType docs
	UpdatedMutationType MutationType = "UPDATED"

	// DeletedMutationType docs
	DeletedMutationType MutationType = "DELETED"
)

// UserOrderByInput docs
type UserOrderByInput string

const (

	// IDAscUserOrderByInput docs
	IDAscUserOrderByInput UserOrderByInput = "id_ASC"

	// IDDescUserOrderByInput docs
	IDDescUserOrderByInput UserOrderByInput = "id_DESC"

	// NameAscUserOrderByInput docs
	NameAscUserOrderByInput UserOrderByInput = "name_ASC"

	// NameDescUserOrderByInput docs
	NameDescUserOrderByInput UserOrderByInput = "name_DESC"

	// UpdatedAtAscUserOrderByInput docs
	UpdatedAtAscUserOrderByInput UserOrderByInput = "updatedAt_ASC"

	// UpdatedAtDescUserOrderByInput docs
	UpdatedAtDescUserOrderByInput UserOrderByInput = "updatedAt_DESC"

	// CreatedAtAscUserOrderByInput docs
	CreatedAtAscUserOrderByInput UserOrderByInput = "createdAt_ASC"

	// CreatedAtDescUserOrderByInput docs
	CreatedAtDescUserOrderByInput UserOrderByInput = "createdAt_DESC"
)

// TodoCreateInput input struct docs
type TodoCreateInput struct {
	Text *string             `json:"text,omitempty"`
	Done *bool               `json:"done,omitempty"`
	User *UserCreateOneInput `json:"user,omitempty"`
}

// UserWhereUniqueInput input struct docs
type UserWhereUniqueInput struct {
	ID *string `json:"id,omitempty"`
}

// TodoWhereInput input struct docs
type TodoWhereInput struct {
	And               *TodoWhereInput `json:"AND,omitempty"`
	Or                *TodoWhereInput `json:"OR,omitempty"`
	Not               *TodoWhereInput `json:"NOT,omitempty"`
	ID                *string         `json:"id,omitempty"`
	IDNot             *string         `json:"id_not,omitempty"`
	IDIn              *string         `json:"id_in,omitempty"`
	IDNotIn           *string         `json:"id_not_in,omitempty"`
	IDLt              *string         `json:"id_lt,omitempty"`
	IDLte             *string         `json:"id_lte,omitempty"`
	IDGt              *string         `json:"id_gt,omitempty"`
	IDGte             *string         `json:"id_gte,omitempty"`
	IDContains        *string         `json:"id_contains,omitempty"`
	IDNotContains     *string         `json:"id_not_contains,omitempty"`
	IDStartsWith      *string         `json:"id_starts_with,omitempty"`
	IDNotStartsWith   *string         `json:"id_not_starts_with,omitempty"`
	IDEndsWith        *string         `json:"id_ends_with,omitempty"`
	IDNotEndsWith     *string         `json:"id_not_ends_with,omitempty"`
	Text              *string         `json:"text,omitempty"`
	TextNot           *string         `json:"text_not,omitempty"`
	TextIn            *string         `json:"text_in,omitempty"`
	TextNotIn         *string         `json:"text_not_in,omitempty"`
	TextLt            *string         `json:"text_lt,omitempty"`
	TextLte           *string         `json:"text_lte,omitempty"`
	TextGt            *string         `json:"text_gt,omitempty"`
	TextGte           *string         `json:"text_gte,omitempty"`
	TextContains      *string         `json:"text_contains,omitempty"`
	TextNotContains   *string         `json:"text_not_contains,omitempty"`
	TextStartsWith    *string         `json:"text_starts_with,omitempty"`
	TextNotStartsWith *string         `json:"text_not_starts_with,omitempty"`
	TextEndsWith      *string         `json:"text_ends_with,omitempty"`
	TextNotEndsWith   *string         `json:"text_not_ends_with,omitempty"`
	Done              *bool           `json:"done,omitempty"`
	DoneNot           *bool           `json:"done_not,omitempty"`
	User              *UserWhereInput `json:"user,omitempty"`
}

// UserUpdateDataInput input struct docs
type UserUpdateDataInput struct {
	Name *string `json:"name,omitempty"`
}

// UserWhereInput input struct docs
type UserWhereInput struct {
	And               *UserWhereInput `json:"AND,omitempty"`
	Or                *UserWhereInput `json:"OR,omitempty"`
	Not               *UserWhereInput `json:"NOT,omitempty"`
	ID                *string         `json:"id,omitempty"`
	IDNot             *string         `json:"id_not,omitempty"`
	IDIn              *string         `json:"id_in,omitempty"`
	IDNotIn           *string         `json:"id_not_in,omitempty"`
	IDLt              *string         `json:"id_lt,omitempty"`
	IDLte             *string         `json:"id_lte,omitempty"`
	IDGt              *string         `json:"id_gt,omitempty"`
	IDGte             *string         `json:"id_gte,omitempty"`
	IDContains        *string         `json:"id_contains,omitempty"`
	IDNotContains     *string         `json:"id_not_contains,omitempty"`
	IDStartsWith      *string         `json:"id_starts_with,omitempty"`
	IDNotStartsWith   *string         `json:"id_not_starts_with,omitempty"`
	IDEndsWith        *string         `json:"id_ends_with,omitempty"`
	IDNotEndsWith     *string         `json:"id_not_ends_with,omitempty"`
	Name              *string         `json:"name,omitempty"`
	NameNot           *string         `json:"name_not,omitempty"`
	NameIn            *string         `json:"name_in,omitempty"`
	NameNotIn         *string         `json:"name_not_in,omitempty"`
	NameLt            *string         `json:"name_lt,omitempty"`
	NameLte           *string         `json:"name_lte,omitempty"`
	NameGt            *string         `json:"name_gt,omitempty"`
	NameGte           *string         `json:"name_gte,omitempty"`
	NameContains      *string         `json:"name_contains,omitempty"`
	NameNotContains   *string         `json:"name_not_contains,omitempty"`
	NameStartsWith    *string         `json:"name_starts_with,omitempty"`
	NameNotStartsWith *string         `json:"name_not_starts_with,omitempty"`
	NameEndsWith      *string         `json:"name_ends_with,omitempty"`
	NameNotEndsWith   *string         `json:"name_not_ends_with,omitempty"`
}

// UserUpdateInput input struct docs
type UserUpdateInput struct {
	Name *string `json:"name,omitempty"`
}

// UserCreateOneInput input struct docs
type UserCreateOneInput struct {
	Create  *UserCreateInput      `json:"create,omitempty"`
	Connect *UserWhereUniqueInput `json:"connect,omitempty"`
}

// UserCreateInput input struct docs
type UserCreateInput struct {
	Name *string `json:"name,omitempty"`
}

// TodoUpdateInput input struct docs
type TodoUpdateInput struct {
	Text *string             `json:"text,omitempty"`
	Done *bool               `json:"done,omitempty"`
	User *UserUpdateOneInput `json:"user,omitempty"`
}

// UserUpdateOneInput input struct docs
type UserUpdateOneInput struct {
	Create  *UserCreateInput       `json:"create,omitempty"`
	Connect *UserWhereUniqueInput  `json:"connect,omitempty"`
	Delete  *bool                  `json:"delete,omitempty"`
	Update  *UserUpdateDataInput   `json:"update,omitempty"`
	Upsert  *UserUpsertNestedInput `json:"upsert,omitempty"`
}

// TodoSubscriptionWhereInput input struct docs
type TodoSubscriptionWhereInput struct {
	And                        *TodoSubscriptionWhereInput `json:"AND,omitempty"`
	Or                         *TodoSubscriptionWhereInput `json:"OR,omitempty"`
	Not                        *TodoSubscriptionWhereInput `json:"NOT,omitempty"`
	MutationIn                 *MutationType               `json:"mutation_in,omitempty"`
	UpdatedFieldsContains      *string                     `json:"updatedFields_contains,omitempty"`
	UpdatedFieldsContainsEvery *string                     `json:"updatedFields_contains_every,omitempty"`
	UpdatedFieldsContainsSome  *string                     `json:"updatedFields_contains_some,omitempty"`
	Node                       *TodoWhereInput             `json:"node,omitempty"`
}

// TodoWhereUniqueInput input struct docs
type TodoWhereUniqueInput struct {
	ID *string `json:"id,omitempty"`
}

// UserSubscriptionWhereInput input struct docs
type UserSubscriptionWhereInput struct {
	And                        *UserSubscriptionWhereInput `json:"AND,omitempty"`
	Or                         *UserSubscriptionWhereInput `json:"OR,omitempty"`
	Not                        *UserSubscriptionWhereInput `json:"NOT,omitempty"`
	MutationIn                 *MutationType               `json:"mutation_in,omitempty"`
	UpdatedFieldsContains      *string                     `json:"updatedFields_contains,omitempty"`
	UpdatedFieldsContainsEvery *string                     `json:"updatedFields_contains_every,omitempty"`
	UpdatedFieldsContainsSome  *string                     `json:"updatedFields_contains_some,omitempty"`
	Node                       *UserWhereInput             `json:"node,omitempty"`
}

// UserUpsertNestedInput input struct docs
type UserUpsertNestedInput struct {
	Update *UserUpdateDataInput `json:"update,omitempty"`
	Create *UserCreateInput     `json:"create,omitempty"`
}

// NodeExec docs
type NodeExec struct {
	db    DB
	stack []Instruction
}

// Node docs
type Node interface {
	ID() string
}

// UserEdgeExec docs
type UserEdgeExec struct {
	db    DB
	stack []Instruction
}

// Node docs - executable for types
func (instance *UserEdgeExec) Node() *UserExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "node",
		Field: GraphQLField{
			Name:       "node",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "",
		Args:      args,
	})
	return &UserExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance UserEdgeExec) Exec() UserEdge {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData UserEdge
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserEdgeExecArray docs
type UserEdgeExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserEdgeExecArray) Exec() []UserEdge {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []UserEdge
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserEdge docs - generated with types
type UserEdge struct {
	Node   *User  `json:"node"`
	Cursor string `json:"cursor"`
}

// BatchPayloadExec docs
type BatchPayloadExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance BatchPayloadExec) Exec() BatchPayload {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData BatchPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// BatchPayloadExecArray docs
type BatchPayloadExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance BatchPayloadExecArray) Exec() []BatchPayload {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []BatchPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// BatchPayload docs - generated with types
type BatchPayload struct {
	Count int64 `json:"count"`
}

// UserPreviousValuesExec docs
type UserPreviousValuesExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserPreviousValuesExec) Exec() UserPreviousValues {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData UserPreviousValues
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserPreviousValuesExecArray docs
type UserPreviousValuesExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserPreviousValuesExecArray) Exec() []UserPreviousValues {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []UserPreviousValues
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserPreviousValues docs - generated with types
type UserPreviousValues struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// AggregateUserExec docs
type AggregateUserExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance AggregateUserExec) Exec() AggregateUser {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData AggregateUser
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// AggregateUserExecArray docs
type AggregateUserExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance AggregateUserExecArray) Exec() []AggregateUser {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []AggregateUser
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// AggregateUser docs - generated with types
type AggregateUser struct {
	Count int32 `json:"count"`
}

// UserConnectionExec docs
type UserConnectionExec struct {
	db    DB
	stack []Instruction
}

// PageInfo docs - executable for types
func (instance *UserConnectionExec) PageInfo() *PageInfoExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "pageInfo",
		Field: GraphQLField{
			Name:       "pageInfo",
			TypeName:   "PageInfo",
			TypeFields: []string{"hasNextPage", "hasPreviousPage", "startCursor", "endCursor"},
		},
		Operation: "",
		Args:      args,
	})
	return &PageInfoExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Edges docs - executable for types
func (instance *UserConnectionExec) Edges() *UserEdgeExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "edges",
		Field: GraphQLField{
			Name:       "edges",
			TypeName:   "UserEdge",
			TypeFields: []string{"cursor"},
		},
		Operation: "",
		Args:      args,
	})
	return &UserEdgeExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Aggregate docs - executable for types
func (instance *UserConnectionExec) Aggregate() *AggregateUserExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "aggregate",
		Field: GraphQLField{
			Name:       "aggregate",
			TypeName:   "AggregateUser",
			TypeFields: []string{"count"},
		},
		Operation: "",
		Args:      args,
	})
	return &AggregateUserExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance UserConnectionExec) Exec() UserConnection {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData UserConnection
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserConnectionExecArray docs
type UserConnectionExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserConnectionExecArray) Exec() []UserConnection {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []UserConnection
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserConnection docs - generated with types
type UserConnection struct {
	PageInfo  *PageInfo      `json:"pageInfo"`
	Edges     *UserEdge      `json:"edges"`
	Aggregate *AggregateUser `json:"aggregate"`
}

// TodoSubscriptionPayloadExec docs
type TodoSubscriptionPayloadExec struct {
	db    DB
	stack []Instruction
}

// Node docs - executable for types
func (instance *TodoSubscriptionPayloadExec) Node() *TodoExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "node",
		Field: GraphQLField{
			Name:       "node",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "",
		Args:      args,
	})
	return &TodoExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// PreviousValues docs - executable for types
func (instance *TodoSubscriptionPayloadExec) PreviousValues() *TodoPreviousValuesExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "previousValues",
		Field: GraphQLField{
			Name:       "previousValues",
			TypeName:   "TodoPreviousValues",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "",
		Args:      args,
	})
	return &TodoPreviousValuesExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance TodoSubscriptionPayloadExec) Exec() TodoSubscriptionPayload {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData TodoSubscriptionPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoSubscriptionPayloadExecArray docs
type TodoSubscriptionPayloadExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoSubscriptionPayloadExecArray) Exec() []TodoSubscriptionPayload {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []TodoSubscriptionPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoSubscriptionPayload docs - generated with types
type TodoSubscriptionPayload struct {
	Mutation       *MutationType       `json:"mutation"`
	Node           *Todo               `json:"node,omitempty"`
	UpdatedFields  string              `json:"updatedFields"`
	PreviousValues *TodoPreviousValues `json:"previousValues,omitempty"`
}

// TodoPreviousValuesExec docs
type TodoPreviousValuesExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoPreviousValuesExec) Exec() TodoPreviousValues {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData TodoPreviousValues
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoPreviousValuesExecArray docs
type TodoPreviousValuesExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoPreviousValuesExecArray) Exec() []TodoPreviousValues {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []TodoPreviousValues
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoPreviousValues docs - generated with types
type TodoPreviousValues struct {
	ID   string `json:"id"`
	Text string `json:"text"`
	Done bool   `json:"done"`
}

// PageInfoExec docs
type PageInfoExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance PageInfoExec) Exec() PageInfo {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData PageInfo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// PageInfoExecArray docs
type PageInfoExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance PageInfoExecArray) Exec() []PageInfo {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []PageInfo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// PageInfo docs - generated with types
type PageInfo struct {
	HasNextPage     bool   `json:"hasNextPage"`
	HasPreviousPage bool   `json:"hasPreviousPage"`
	StartCursor     string `json:"startCursor,omitempty"`
	EndCursor       string `json:"endCursor,omitempty"`
}

// AggregateTodoExec docs
type AggregateTodoExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance AggregateTodoExec) Exec() AggregateTodo {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData AggregateTodo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// AggregateTodoExecArray docs
type AggregateTodoExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance AggregateTodoExecArray) Exec() []AggregateTodo {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []AggregateTodo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// AggregateTodo docs - generated with types
type AggregateTodo struct {
	Count int32 `json:"count"`
}

// UserSubscriptionPayloadExec docs
type UserSubscriptionPayloadExec struct {
	db    DB
	stack []Instruction
}

// Node docs - executable for types
func (instance *UserSubscriptionPayloadExec) Node() *UserExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "node",
		Field: GraphQLField{
			Name:       "node",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "",
		Args:      args,
	})
	return &UserExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// PreviousValues docs - executable for types
func (instance *UserSubscriptionPayloadExec) PreviousValues() *UserPreviousValuesExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "previousValues",
		Field: GraphQLField{
			Name:       "previousValues",
			TypeName:   "UserPreviousValues",
			TypeFields: []string{"id", "name"},
		},
		Operation: "",
		Args:      args,
	})
	return &UserPreviousValuesExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance UserSubscriptionPayloadExec) Exec() UserSubscriptionPayload {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData UserSubscriptionPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserSubscriptionPayloadExecArray docs
type UserSubscriptionPayloadExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserSubscriptionPayloadExecArray) Exec() []UserSubscriptionPayload {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []UserSubscriptionPayload
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserSubscriptionPayload docs - generated with types
type UserSubscriptionPayload struct {
	Mutation       *MutationType       `json:"mutation"`
	Node           *User               `json:"node,omitempty"`
	UpdatedFields  string              `json:"updatedFields"`
	PreviousValues *UserPreviousValues `json:"previousValues,omitempty"`
}

// TodoExec docs
type TodoExec struct {
	db    DB
	stack []Instruction
}

// User docs - executable for types
func (instance *TodoExec) User(where *UserWhereInput) *UserExec {
	var args []GraphQLArg
	args = append(args, GraphQLArg{
		Name:     "where",
		Key:      "where",
		TypeName: "UserWhereInput",
		Value:    where,
	})
	instance.stack = append(instance.stack, Instruction{
		Name: "user",
		Field: GraphQLField{
			Name:       "user",
			TypeName:   "User",
			TypeFields: []string{"id", "name"},
		},
		Operation: "",
		Args:      args,
	})
	return &UserExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance TodoExec) Exec() Todo {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData Todo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoExecArray docs
type TodoExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoExecArray) Exec() []Todo {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []Todo
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// Todo docs - generated with types
type Todo struct {
	ID   string `json:"id"`
	Text string `json:"text"`
	Done bool   `json:"done"`
	User *User  `json:"user"`
}

// UserExec docs
type UserExec struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserExec) Exec() User {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData User
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// UserExecArray docs
type UserExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance UserExecArray) Exec() []User {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []User
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// User docs - generated with types
type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// TodoConnectionExec docs
type TodoConnectionExec struct {
	db    DB
	stack []Instruction
}

// PageInfo docs - executable for types
func (instance *TodoConnectionExec) PageInfo() *PageInfoExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "pageInfo",
		Field: GraphQLField{
			Name:       "pageInfo",
			TypeName:   "PageInfo",
			TypeFields: []string{"hasNextPage", "hasPreviousPage", "startCursor", "endCursor"},
		},
		Operation: "",
		Args:      args,
	})
	return &PageInfoExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Edges docs - executable for types
func (instance *TodoConnectionExec) Edges() *TodoEdgeExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "edges",
		Field: GraphQLField{
			Name:       "edges",
			TypeName:   "TodoEdge",
			TypeFields: []string{"cursor"},
		},
		Operation: "",
		Args:      args,
	})
	return &TodoEdgeExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Aggregate docs - executable for types
func (instance *TodoConnectionExec) Aggregate() *AggregateTodoExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "aggregate",
		Field: GraphQLField{
			Name:       "aggregate",
			TypeName:   "AggregateTodo",
			TypeFields: []string{"count"},
		},
		Operation: "",
		Args:      args,
	})
	return &AggregateTodoExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance TodoConnectionExec) Exec() TodoConnection {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData TodoConnection
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoConnectionExecArray docs
type TodoConnectionExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoConnectionExecArray) Exec() []TodoConnection {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []TodoConnection
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoConnection docs - generated with types
type TodoConnection struct {
	PageInfo  *PageInfo      `json:"pageInfo"`
	Edges     *TodoEdge      `json:"edges"`
	Aggregate *AggregateTodo `json:"aggregate"`
}

// TodoEdgeExec docs
type TodoEdgeExec struct {
	db    DB
	stack []Instruction
}

// Node docs - executable for types
func (instance *TodoEdgeExec) Node() *TodoExec {
	var args []GraphQLArg

	instance.stack = append(instance.stack, Instruction{
		Name: "node",
		Field: GraphQLField{
			Name:       "node",
			TypeName:   "Todo",
			TypeFields: []string{"id", "text", "done"},
		},
		Operation: "",
		Args:      args,
	})
	return &TodoExec{
		db:    instance.db,
		stack: instance.stack,
	}
}

// Exec docs
func (instance TodoEdgeExec) Exec() TodoEdge {
	var allArgs []GraphQLArg
	variables := make(map[string]interface{})
	for instructionKey := range instance.stack {
		instruction := &instance.stack[instructionKey]
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for argKey := range instruction.Args {
			arg := &instruction.Args[argKey]
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			isUnique := false
			for isUnique == false {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						if instance.db.Debug {
							fmt.Println("Resolving Collision Arg Name: ", arg.Name)
						}
						break
					}
				}
			}
			if instance.db.Debug {
				fmt.Println("Arg Name: ", arg.Name)
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := instance.db.ProcessInstructions(instance.stack)
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		unpackedData := data
		for _, instruction := range instance.stack {
			if instance.db.Debug {
				fmt.Println("Original Unpacked Data Step Exec:", unpackedData)
			}
			unpackedData = (unpackedData[instruction.Name]).(map[string]interface{})
			if instance.db.Debug {
				fmt.Println("Unpacked Data Step Instruction Exec:", instruction.Name)
				fmt.Println("Unpacked Data Step Exec:", unpackedData)
				fmt.Println("Unpacked Data Step Type Exec:", reflect.TypeOf(unpackedData))
			}
			genericData = unpackedData
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData TodoEdge
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoEdgeExecArray docs
type TodoEdgeExecArray struct {
	db    DB
	stack []Instruction
}

// Exec docs
func (instance TodoEdgeExecArray) Exec() []TodoEdge {
	query := instance.db.ProcessInstructions(instance.stack)
	variables := make(map[string]interface{})
	for _, instruction := range instance.stack {
		if instance.db.Debug {
			fmt.Println("Instruction Exec: ", instruction)
		}
		for _, arg := range instruction.Args {
			if instance.db.Debug {
				fmt.Println("Instruction Arg Exec: ", instruction)
			}
			// TODO: Need to handle arg.Name collisions
			variables[arg.Name] = arg.Value
		}
	}
	if instance.db.Debug {
		fmt.Println("Query Exec:", query)
		fmt.Println("Variables Exec:", variables)
	}
	data := instance.db.GraphQL(query, variables)
	if instance.db.Debug {
		fmt.Println("Data Exec:", data)
	}

	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	// Is unpacking needed
	dataType := reflect.TypeOf(data)
	if !isArray(dataType) {
		for _, instruction := range instance.stack {
			unpackedData := data[instruction.Name]
			if isArray(unpackedData) {
				genericData = (unpackedData).([]interface{})
			} else {
				genericData = (unpackedData).(map[string]interface{})
			}
		}
	}
	if instance.db.Debug {
		fmt.Println("Data Unpacked Exec:", genericData)
	}

	var decodedData []TodoEdge
	mapstructure.Decode(genericData, &decodedData)
	if instance.db.Debug {
		fmt.Println("Data Exec Decoded:", decodedData)
	}
	return decodedData
}

// TodoEdge docs - generated with types
type TodoEdge struct {
	Node   *Todo  `json:"node"`
	Cursor string `json:"cursor"`
}

// GraphQL Send a GraphQL operation request
func (db DB) GraphQL(query string, variables map[string]interface{}) map[string]interface{} {
	// TODO: Add auth support

	req := graphql.NewRequest(query)
	client := graphql.NewClient(
		(map[bool]string{true: db.Endpoint, false: "http://localhost:4466/go-orm/dev"})[db.Endpoint != ""],
	)

	for key, value := range variables {
		req.Var(key, value)
	}

	ctx := context.Background()

	// var respData ResponseStruct
	var respData map[string]interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		if db.Debug {
			fmt.Println("GraphQL Response:", respData)
		}
		log.Fatal(err)
	}
	return respData
}
