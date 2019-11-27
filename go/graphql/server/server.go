package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	"github.com/prisma/prisma-examples/go/graphql/prisma-client"
)

const defaultPort = "4000"

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
	}

	client := prisma.New(nil)
	resolver := Resolver{
		Prisma: client,
	}

	http.Handle("/", handler.Playground("GraphQL Playground", "/query"))
	http.Handle("/query", handler.GraphQL(NewExecutableSchema(Config{Resolvers: &resolver})))

	log.Printf("Server is running on http://localhost:%s", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
