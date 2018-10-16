package main

import (
	"log"
	"net/http"
)

// func New() Config {
// 	log.Printf("Initialize GraphQL service...")

// 	port := os.Getenv("PORT")
// 	if len(port) == 0 {
// 		port = defaultPort
// 	}

// 	client := prisma.New(nil)
// 	resolver := Resolver{
// 		Prisma: client,
// 	}
// 	c := Config{Resolvers: &resolver}
// 	return c
// }

func Middleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// user := getUserByID(db, userId)

		// // put it in context
		// ctx := context.WithValue(r.Context(), userCtxKey, user)

		// // and call the next with our new context
		// r = r.WithContext(ctx)
		// next.ServeHTTP(w, r)
		log.Printf("Logged connection from %s", r.RemoteAddr)
		next.ServeHTTP(w, r)
	}
}
