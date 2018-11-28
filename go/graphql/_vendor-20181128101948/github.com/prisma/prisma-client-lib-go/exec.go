package prisma

import (
	"context"
	"strconv"

	"github.com/mitchellh/mapstructure"
)

func (client *Client) decode(exec *Exec, data map[string]interface{}, v interface{}) (bool, error) {
	var genericData interface{} // This can handle both map[string]interface{} and []interface[]

	unpackedData := data
	for _, instruction := range exec.Stack {
		v := (unpackedData[instruction.Name])
		if v == nil {
			return false, nil
		}
		if isArray(v) {
			genericData = v.([]interface{})
			break
		} else {
			unpackedData = v.(map[string]interface{})
		}
		genericData = unpackedData
	}

	return true, mapstructure.Decode(genericData, v)
}

func (exec *Exec) buildQuery() (string, map[string]interface{}) {
	var allArgs []graphQLArg
	variables := make(map[string]interface{})
	for i := range exec.Stack {
		instruction := &exec.Stack[i]
		for j := range instruction.Args {
			arg := &instruction.Args[j]
			isUnique := false
			for !isUnique {
				isUnique = true
				for key, existingArg := range allArgs {
					if existingArg.Name == arg.Name {
						isUnique = false
						arg.Name = arg.Name + "_" + strconv.Itoa(key)
						break
					}
				}
			}
			allArgs = append(allArgs, *arg)
			variables[arg.Name] = arg.Value
		}
	}
	query := exec.Client.ProcessInstructions(exec.Stack)
	return query, variables
}

func (exec *Exec) Exec(ctx context.Context, v interface{}) (bool, error) {
	query, variables := exec.buildQuery()
	data, err := exec.Client.GraphQL(ctx, query, variables)
	if err != nil {
		return false, err
	}
	if data == nil {
		return false, nil
	}

	return exec.Client.decode(exec, data, v)
}

func (exec *Exec) Exists(ctx context.Context) (bool, error) {
	query, variables := exec.buildQuery()
	data, err := exec.Client.GraphQL(ctx, query, variables)
	if err != nil {
		return false, err
	}
	if len(data) == 0 {
		return false, nil
	}
	for _, v := range data {
		return v != nil, nil
	}
	panic("unreachable")
}

func (exec *Exec) ExecArray(ctx context.Context, v interface{}) error {
	query := exec.Client.ProcessInstructions(exec.Stack)
	variables := make(map[string]interface{})
	for _, instruction := range exec.Stack {
		for _, arg := range instruction.Args {
			variables[arg.Name] = arg.Value
		}
	}
	data, err := exec.Client.GraphQL(ctx, query, variables)
	if err != nil {
		return err
	}
	_, err = exec.Client.decode(exec, data, v)
	return err
}

func (exec *BatchPayloadExec) Exec(ctx context.Context) (BatchPayload, error) {
	sexec := &Exec{Stack: exec.stack}
	query, variables := sexec.buildQuery()

	data, err := exec.client.GraphQL(ctx, query, variables)
	if err != nil {
		return BatchPayload{}, err
	}

	var bp BatchPayload
	_, err = exec.client.decode(sexec, data, &bp)
	return bp, err
}
