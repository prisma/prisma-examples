package main

import (
	"context"
	"fmt"
	"os"

	prisma "github.com/prisma/prisma-examples/go/cli-app/prisma-client"
)

func main() {
	db := prisma.New(nil)
	ctx := context.Background()

	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) == 0 {
		todos := allTodos(ctx, db)
		printTodos(todos)
		os.Exit(0)
	}
	command := argsWithoutProg[0]

	if len(argsWithoutProg) == 1 {
		if command == "count" {
			todoes, err := db.Todoes(&prisma.TodoesParams{}).Exec(ctx)
			if err != nil {
				panic(err)
			}
			fmt.Println("Number of TODOs: ", len(todoes))
		} else {
			fmt.Println("Invalid command: ", command, " printing todos")
			todos := allTodos(ctx, db)
			printTodos(todos)
		}
		os.Exit(0)
	}

	if len(argsWithoutProg) == 2 {
		v1 := argsWithoutProg[1]
		switch {
		case command == "create":
			todo := createTodo(ctx, db, v1)
			printTodo(*todo, nil)
		case command == "delete":
			todo := deleteTodo(ctx, db, v1)
			printTodo(*todo, nil)
		case command == "get":
			todo := getTodo(ctx, db, v1)
			printTodo(*todo, nil)
		case command == "list":
			todos := allTodos(ctx, db)
			printTodos(todos)
		case command == "search":
			todos := searchTodos(ctx, db, v1)
			printTodos(todos)
		default:
			fmt.Println("Invalid command: ", command, " printing todos")
			allTodos(ctx, db)
		}
		os.Exit(0)
	}
	fmt.Println("Invalid command: ", command, " printing todos")
	todos := allTodos(ctx, db)
	printTodos(todos)
}

func printTodo(todo prisma.Todo, key *int) {
	if key != nil {
		fmt.Println("Todo #", *key, ": ", todo.Text, " - ", todo.ID)
	} else {
		fmt.Println("Todo ", todo.Text, " - ", todo.ID)
	}
}

func printTodos(todos []prisma.Todo) {
	for key, todo := range todos {
		printTodo(todo, &key)
	}
}

func allTodos(ctx context.Context, db *prisma.Client) []prisma.Todo {
	fmt.Println("All Todos:")
	todoes, err := db.Todoes(&prisma.TodoesParams{}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todoes
}

func searchTodos(ctx context.Context, db *prisma.Client, q string) []prisma.Todo {
	fmt.Println("Search TODOs:", q)
	orderBy := prisma.TodoOrderByInputCreatedAtDesc
	todoes, err := db.Todoes(&prisma.TodoesParams{
		Where: &prisma.TodoWhereInput{
			TextContains: &q,
		},
		OrderBy: &orderBy,
	}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todoes
}

func createTodo(ctx context.Context, db *prisma.Client, text string) *prisma.Todo {
	fmt.Println("Creating TODO ...")
	todo, err := db.CreateTodo(prisma.TodoCreateInput{
		Text: text,
	}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todo
}

func deleteTodo(ctx context.Context, db *prisma.Client, text string) *prisma.Todo {
	fmt.Println("Deleting TODO ...")
	todo, err := db.DeleteTodo(prisma.TodoWhereUniqueInput{
		Text: &text,
	}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todo
}

func getTodo(ctx context.Context, db *prisma.Client, id string) *prisma.Todo {
	fmt.Println("Get Todo")

	exists, err := db.Todo(prisma.TodoWhereUniqueInput{
		ID: &id,
	}).Exists(ctx)
	if err != nil {
		panic(err)
	}
	if exists {
		fmt.Println("Todo exists")
	} else {
		fmt.Println("Todo dos not exist")
	}

	todo, err := db.Todo(prisma.TodoWhereUniqueInput{
		ID: &id,
	}).Exec(ctx)
	return todo
}
