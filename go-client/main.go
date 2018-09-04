package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/prisma/go-client/prisma"
)

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

func printTodoes(todoes []prisma.Todo) {
	for key, todo := range todoes {
		printTodo(todo, &key)
	}
}

func allTodoes(db prisma.DB) []prisma.Todo {
	fmt.Println("All Todoes:")
	todoes := db.Todoes(&prisma.TodoesParams{}).Exec()
	return todoes
}

func someTodoes(db prisma.DB, first int32) []prisma.Todo {
	fmt.Println("Some Todoes:", first)
	todoes := db.Todoes(&prisma.TodoesParams{
		First: &first,
	}).Exec()
	return todoes
}

func searchTodoes(db prisma.DB, q string) []prisma.Todo {
	fmt.Println("Search Todoes:", q)
	orderBy := prisma.CreatedAtDescTodoOrderByInput
	todoes := db.Todoes(&prisma.TodoesParams{
		Where: &prisma.TodoWhereInput{
			TextContains: &q,
		},
		OrderBy: &orderBy,
	}).Exec()
	return todoes
}

func createTodo(db prisma.DB, text string) prisma.Todo {
	fmt.Println("Create Todo")
	done := false
	userID := "cjlhytekx005708701pice3uj"
	todo := db.CreateTodo(&prisma.TodoCreateInput{
		Done: &done,
		Text: &text,
		User: &prisma.UserCreateOneInput{
			Connect: &prisma.UserWhereUniqueInput{
				ID: &userID,
			},
		},
	}).Exec()
	return todo
}

func deleteTodo(db prisma.DB, id string) prisma.Todo {
	fmt.Println("Create Todo")
	todo := db.DeleteTodo(&prisma.TodoWhereUniqueInput{
		ID: &id,
	}).Exec()
	return todo
}

func getTodo(db prisma.DB, id string) prisma.Todo {
	fmt.Println("Get Todo")

	exists := db.Exists.Todo(&prisma.TodoWhereUniqueInput{
		ID: &id,
	})
	if exists {
		fmt.Println("Todo exists")
	} else {
		fmt.Println("Todo does not exist")
	}

	todo := db.Todo(&prisma.TodoWhereUniqueInput{
		ID: &id,
	}).Exec()
	return todo
}

func getTodoUser(db prisma.DB, id string) prisma.User {
	fmt.Println("Get Todo User")

	exists := db.Exists.Todo(&prisma.TodoWhereUniqueInput{
		ID: &id,
	})
	if exists {
		fmt.Println("Todo exists")
	} else {
		fmt.Println("Todo does not exist")
	}

	todo := db.Todo(&prisma.TodoWhereUniqueInput{
		ID: &id,
	}).User(&prisma.UserWhereInput{}).Exec()
	return todo
}

func main() {
	db := prisma.DB{
		Debug: true,
	}

	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) == 0 {
		todoes := allTodoes(db)
		printTodoes(todoes)
		os.Exit(0)
	}
	command := argsWithoutProg[0]

	if len(argsWithoutProg) == 1 {
		if command == "count" {
			fmt.Println("Total Todoes: ", len(allTodoes(db)))
		} else {
			fmt.Println("Invalid command: ", command, " printing todoes")
			todoes := allTodoes(db)
			printTodoes(todoes)
		}
		os.Exit(0)
	}

	if len(argsWithoutProg) == 2 {
		v1 := argsWithoutProg[1]
		if command == "create" {
			todo := createTodo(db, v1)
			printTodo(todo, nil)
		} else if command == "delete" {
			todo := deleteTodo(db, v1)
			printTodo(todo, nil)
		} else if command == "get" {
			todo := getTodo(db, v1)
			printTodo(todo, nil)
		} else if command == "get-user" {
			user := getTodoUser(db, v1)
			printUser(user, nil)
		} else if command == "list" {
			v1Int, err := strconv.ParseInt(v1, 10, 32)
			if err != nil {
				panic(err)
			}
			todoes := someTodoes(db, int32(v1Int))
			printTodoes(todoes)
		} else if command == "search" {
			todoes := searchTodoes(db, v1)
			printTodoes(todoes)
		} else {
			fmt.Println("Invalid command: ", command, " printing todoes")
			allTodoes(db)
		}
		os.Exit(0)
	}
	fmt.Println("Invalid command: ", command, " printing todoes")
	todoes := allTodoes(db)
	printTodoes(todoes)
}
