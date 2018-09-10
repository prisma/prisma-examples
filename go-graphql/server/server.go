package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	go_graphql "github.com/prisma/prisma-examples/go-graphql"
	"github.com/prisma/prisma-examples/go-graphql/prisma-client"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	client := prisma.New(&prisma.PrismaOptions{})
	resolver := go_graphql.Resolver{
		Prisma: &client,
	}

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))
	http.Handle("/query", handler.GraphQL(go_graphql.NewExecutableSchema(go_graphql.Config{Resolvers: &resolver})))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
