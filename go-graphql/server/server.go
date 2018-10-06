package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/99designs/gqlgen/handler"
	"github.com/prisma/prisma-examples/go-graphql/prisma-client"
)

const defaultPort = "4000"

func main() {
	log.Printf("Initialize GraphQL service...")

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = defaultPort
	}

	client := prisma.New(nil)
	resolver := Resolver{
		Prisma: client,
	}

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))
	http.Handle("/query", handler.GraphQL(NewExecutableSchema(Config{Resolvers: &resolver})))
  
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	srv := &http.Server{
		Addr: ":" + port,
	}

	shutdown := make(chan struct{}, 1)
	go func() {
		err := srv.ListenAndServe()
		if err != nil {
			shutdown <- struct{}{}
			log.Printf("%v", err)
		}
	}()
	log.Print("The GraphQL playground is ready to listen and serve http://localhost:" + port)

	select {
	case killSignal := <-interrupt:
		switch killSignal {
		case os.Interrupt:
			log.Print("Got SIGINT...")
		case syscall.SIGTERM:
			log.Print("Got SIGTERM...")
		}
	case <-shutdown:
		log.Printf("Got an error...")
	}

	log.Print("The GraphQL service is shutting down...")
	srv.Shutdown(context.Background())
	log.Print("Done")
}
