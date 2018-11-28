package prisma

func (client *Client) GetOne(base *Exec, params interface{}, typeNames [2]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	if params != nil {
		args = append(args, graphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: typeNames[0],
			Value:    params,
		})
	}

	var stack []instruction
	if base != nil {
		stack = make([]instruction, len(base.Stack), len(base.Stack)+1)
		copy(stack, base.Stack)
	}
	stack = append(stack, instruction{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[1],
			TypeFields: typeFields,
		},
		Operation: "query",
		Args:      args,
	})

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}

type WhereParams struct {
	Where   interface{} `json:"where,omitempty"`
	OrderBy *string     `json:"orderBy,omitempty"`
	Skip    *int32      `json:"skip,omitempty"`
	After   *string     `json:"after,omitempty"`
	Before  *string     `json:"before,omitempty"`
	First   *int32      `json:"first,omitempty"`
	Last    *int32      `json:"last,omitempty"`
}

func (client *Client) GetMany(base *Exec, params *WhereParams, typeNames [3]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	if params != nil {
		if params.Where != nil {
			args = append(args, graphQLArg{
				Name:     "where",
				Key:      "where",
				TypeName: typeNames[0],
				Value:    params.Where,
			})
		}
		if params.OrderBy != nil {
			args = append(args, graphQLArg{
				Name:     "orderBy",
				Key:      "orderBy",
				TypeName: typeNames[1],
				Value:    *params.OrderBy,
			})
		}
		if params.Skip != nil {
			args = append(args, graphQLArg{
				Name:     "skip",
				Key:      "skip",
				TypeName: "Int",
				Value:    *params.Skip,
			})
		}
		if params.After != nil {
			args = append(args, graphQLArg{
				Name:     "after",
				Key:      "after",
				TypeName: "String",
				Value:    *params.After,
			})
		}
		if params.Before != nil {
			args = append(args, graphQLArg{
				Name:     "before",
				Key:      "before",
				TypeName: "String",
				Value:    *params.Before,
			})
		}
		if params.First != nil {
			args = append(args, graphQLArg{
				Name:     "first",
				Key:      "first",
				TypeName: "Int",
				Value:    *params.First,
			})
		}
		if params.Last != nil {
			args = append(args, graphQLArg{
				Name:     "last",
				Key:      "last",
				TypeName: "Int",
				Value:    *params.Last,
			})
		}
	}

	var stack []instruction
	if base != nil {
		stack = make([]instruction, len(base.Stack), len(base.Stack)+1)
		copy(stack, base.Stack)
	}
	stack = append(stack, instruction{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[2],
			TypeFields: typeFields,
		},
		Operation: "query",
		Args:      args,
	})

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}
