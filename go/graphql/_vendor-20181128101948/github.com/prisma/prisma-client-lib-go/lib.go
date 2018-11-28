package prisma

import (
	"context"
	"fmt"
	"reflect"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/machinebox/graphql"
)

type Exec struct {
	Client *Client
	Stack  []instruction
}

type graphQLField struct {
	Name       string
	TypeName   string
	TypeFields []string
}

type graphQLArg struct {
	Name     string
	Key      string
	TypeName string
	Value    interface{}
}

type instruction struct {
	Name      string
	Field     graphQLField
	Operation string
	Args      []graphQLArg
}

// TODO(dh): get rid of this function if we can
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

func New(endpoint string, secret string, opts ...graphql.ClientOption) *Client {

	var tokenString string
	if secret != "" {
		token := jwt.New(jwt.SigningMethodHS256)
		signedToken, err := token.SignedString([]byte(secret))
		if err != nil {
			fmt.Println("Failed to sign JWT token")
			panic(err)
		}
		tokenString = signedToken
	}

	return &Client{
		Endpoint:  endpoint,
		Secret:    tokenString,
		GQLClient: graphql.NewClient(endpoint, opts...),
	}
}

type Client struct {
	Endpoint string
	Secret   string
	// TODO(dh): find a better name for this field
	GQLClient *graphql.Client
}

// GraphQL Send a GraphQL operation request
func (client *Client) GraphQL(ctx context.Context, query string, variables map[string]interface{}) (map[string]interface{}, error) {

	req := graphql.NewRequest(query)

	if client.Secret != "" {
		req.Header.Add("Authorization", "Bearer "+client.Secret)
	}

	for key, value := range variables {
		req.Var(key, value)
	}

	var respData map[string]interface{}
	if err := client.GQLClient.Run(ctx, req, &respData); err != nil {
		return nil, err
	}
	return respData, nil
}

func (client *Client) ProcessInstructions(stack []instruction) string {
	query := make(map[string]interface{})
	argsByInstruction := make(map[string][]graphQLArg)
	var allArgs []graphQLArg
	firstInstruction := stack[0]

	// XXX why are we walking over the stack backwards? can't we just
	// walk it forwards and construct the AST?
	for i := len(stack) - 1; i >= 0; i-- {
		instruction := stack[i]
		if len(query) == 0 {
			query[instruction.Name] = instruction.Field.TypeFields
			argsByInstruction[instruction.Name] = instruction.Args
			allArgs = append(allArgs, instruction.Args...)
		} else {
			previousInstruction := stack[i+1]
			query[instruction.Name] = map[string]interface{}{
				previousInstruction.Name: query[previousInstruction.Name],
			}
			argsByInstruction[instruction.Name] = instruction.Args
			allArgs = append(allArgs, instruction.Args...)
			delete(query, previousInstruction.Name)
		}
	}

	var opTyp operationType
	switch op := firstInstruction.Operation; op {
	case "query":
		opTyp = opQuery
	case "mutation":
		opTyp = opMutation
	case "subscription":
		opTyp = opSubscription
	default:
		panic(fmt.Sprintf("invalid operation type %q", op))
	}
	op := operation{
		typ:  opTyp,
		name: firstInstruction.Name,
	}
	for _, arg := range allArgs {
		op.arguments = append(op.arguments, argument{
			name:  "$" + arg.Name,
			value: arg.TypeName,
		})
	}

	var fn func(root fielder, query map[string]interface{})
	fn = func(root fielder, query map[string]interface{}) {
		// XXX can len(query) ever be larger than 1?
		for k, v := range query {
			q := objectField{
				name: k,
			}
			args := argsByInstruction[k]
			for _, arg := range args {
				q.arguments = append(q.arguments, argument{
					name:  arg.Key,
					value: "$" + arg.Name,
				})
			}
			// TODO(dh): redesign the whole instruction processing step,
			// avoid excessive use of interface{} and maps
			switch v := v.(type) {
			case []string:
				for _, f := range v {
					q.fields = append(q.fields, scalarField{
						name: f,
					})
				}
			case map[string]interface{}:
				fn(&q, v)
			default:
				panic(fmt.Sprintf("unexpected type %T", v))
			}
			root.addField(q)
		}
	}
	fn(&op, query)

	return formatOperation(&op)
}
