package main

import (
	"context"

	prisma "github.com/prisma/prisma-examples/go/cli-app/prisma-client"
)

func main() {

	client := prisma.New(nil)
	ctx := context.Background()

	text1 := "Join us for Prisma Day 2019 in Berlin"
	text2 := "Subscribe to GraphQL Weekly for community news"

	client.CreateTodo(prisma.TodoCreateInput{
		Text: text1,
	}).Exec(ctx)

	client.CreateTodo(prisma.TodoCreateInput{
		Text: text2,
	}).Exec(ctx)
}
