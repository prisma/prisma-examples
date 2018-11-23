package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	prisma "github.com/prisma/prisma-examples/go/cli-app/prisma-client"
)

func main() {
	db := prisma.New(&prisma.Options{
		Endpoint: "http://localhost:4466/go-orm/dev",
	})
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
			fmt.Println("Total Todos: ", len(allTodos(ctx, db)))
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
		case command == "get-user":
			user := getTodoUser(ctx, db, v1)
			printUser(*user, nil)
		case command == "list":
			v1Int, err := strconv.ParseInt(v1, 10, 32)
			if err != nil {
				panic(err)
			}
			todos := someTodoes(ctx, db, int32(v1Int))
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

func printUser(user prisma.User, key *int) {
	if key != nil {
		fmt.Println("User #", *key, ": ", user.Name, " - ", user.ID)
	} else {
		fmt.Println("User ", user.Name, " - ", user.ID)
	}
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

func someTodoes(ctx context.Context, db *prisma.Client, first int32) []prisma.Todo {
	fmt.Println("Some Todos:", first)
	todoes, err := db.Todoes(&prisma.TodoesParams{
		First: &first,
	}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todoes
}

func searchTodos(ctx context.Context, db *prisma.Client, q string) []prisma.Todo {
	fmt.Println("Search Todos:", q)
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
	fmt.Println("Create Todo")
	userID := "cjmsueuph00da0855an60n0oq"
	todo, err := db.CreateTodo(prisma.TodoCreateInput{
		Done: false,
		Text: text,
		User: prisma.UserCreateOneInput{
			Connect: &prisma.UserWhereUniqueInput{
				ID: &userID,
			},
		},
	}).Exec(ctx)
	if err != nil {
		panic(err)
	}
	return todo
}

func deleteTodo(ctx context.Context, db *prisma.Client, id string) *prisma.Todo {
	fmt.Println("Create Todo")
	todo, err := db.DeleteTodo(prisma.TodoWhereUniqueInput{
		ID: &id,
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

func getTodoUser(ctx context.Context, db *prisma.Client, id string) *prisma.User {
	fmt.Println("Get Todo User")

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
	}).User().Exec(ctx)
	return todo
}
