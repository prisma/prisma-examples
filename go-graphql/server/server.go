package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
)

const defaultPort = "4000"

func main() {
	log.Info("Initialize GraphQL service...")

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
	}

	client := prisma.New(nil)
	resolver := Resolver{
		Prisma: &client,
	}

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))
	http.Handle("/query", handler.GraphQL(NewExecutableSchema(Config{Resolvers: &resolver})))

	err := http.ListenAndServe(":" + port)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
}
