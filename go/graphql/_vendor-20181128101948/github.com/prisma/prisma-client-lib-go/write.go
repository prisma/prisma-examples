package prisma

type BatchPayloadExec struct {
	client *Client
	stack  []instruction
}

type BatchPayload struct {
	Count int64 `json:"count"`
}

type UpdateParams struct {
	Data  interface{}
	Where interface{}
}

func (client *Client) UpdateMany(params UpdateParams, typeNames [2]string, instrName string) *BatchPayloadExec {
	var args []graphQLArg
	args = append(args, graphQLArg{
		Name:     "data",
		Key:      "data",
		TypeName: typeNames[0],
		Value:    params.Data,
	})
	if params.Where != nil {
		args = append(args, graphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: typeNames[1],
			Value:    params.Where,
		})
	}

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &BatchPayloadExec{
		client: client,
		stack:  stack,
	}
}

func (client *Client) Update(params UpdateParams, typeNames [3]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	args = append(args, graphQLArg{
		Name:     "data",
		Key:      "data",
		TypeName: typeNames[0],
		Value:    params.Data,
	})
	args = append(args, graphQLArg{
		Name:     "where",
		Key:      "where",
		TypeName: typeNames[1],
		Value:    params.Where,
	})

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[2],
			TypeFields: typeFields,
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}

func (client *Client) DeleteMany(params interface{}, typeName string, instrName string) *BatchPayloadExec {
	args := []graphQLArg{{
		Name:     "where",
		Key:      "where",
		TypeName: typeName,
		Value:    params,
	}}

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   "BatchPayload",
			TypeFields: []string{"count"},
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &BatchPayloadExec{
		client: client,
		stack:  stack,
	}
}

func (client *Client) Delete(params interface{}, typeNames [2]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	if params != nil {
		args = []graphQLArg{{
			Name:     "where",
			Key:      "where",
			TypeName: typeNames[0],
			Value:    params,
		}}
	}

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[1],
			TypeFields: typeFields,
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}

func (client *Client) Create(params interface{}, typeNames [2]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	if params != nil {
		args = append(args, graphQLArg{
			Name:     "data",
			Key:      "data",
			TypeName: typeNames[0],
			Value:    params,
		})
	}

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[1],
			TypeFields: typeFields,
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}

type UpsertParams struct {
	Where  interface{}
	Create interface{}
	Update interface{}
}

func (client *Client) Upsert(params *UpsertParams, typeNames [4]string, instrName string, typeFields []string) *Exec {
	var args []graphQLArg
	if params != nil {
		args = append(args, graphQLArg{
			Name:     "where",
			Key:      "where",
			TypeName: typeNames[0],
			Value:    params.Where,
		})
		args = append(args, graphQLArg{
			Name:     "create",
			Key:      "create",
			TypeName: typeNames[1],
			Value:    params.Create,
		})
		args = append(args, graphQLArg{
			Name:     "update",
			Key:      "update",
			TypeName: typeNames[2],
			Value:    params.Update,
		})
	}

	stack := []instruction{{
		Name: instrName,
		Field: graphQLField{
			Name:       instrName,
			TypeName:   typeNames[3],
			TypeFields: typeFields,
		},
		Operation: "mutation",
		Args:      args,
	}}

	return &Exec{
		Client: client,
		Stack:  stack,
	}
}
