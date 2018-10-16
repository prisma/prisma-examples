package main

import (
	"net/http"

	"github.com/go-chi/jwtauth"
)

// func Middleware(r *Resolver) func(http.Handler) http.Handler {
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {

		//get authorization header
		tokenString := jwtauth.TokenFromHeader(req)
		//log.Println(tokenString)

		ctx := req.Context()

		token, err := VerifyToken(tokenString)

		// Allow unauthenticated users in, to access signup resolver for example
		// ??

		// put it in context
		newCtx := jwtauth.NewContext(ctx, token, err)

		// and call the next with our new context
		req = req.WithContext(newCtx)
		next.ServeHTTP(w, req)
	})
}

//}
