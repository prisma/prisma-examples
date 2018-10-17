package main

import (
	"context"
	"net/http"

	"github.com/go-chi/jwtauth"
)

// func Middleware(r *Resolver) func(http.Handler) http.Handler {
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {

		//get authorization header
		tokenString := jwtauth.TokenFromHeader(req)

		ctx := req.Context()

		token, err := VerifyToken(tokenString)

		// Allow unauthenticated users in, to access signup resolver for example
		// ??

		// put token in context
		newCtx := jwtauth.NewContext(ctx, token, err)

		// and call next with our new context
		req = req.WithContext(newCtx)
		next.ServeHTTP(w, req)
	})
}

//}

func getUserID(ctx context.Context) (string, error) {
	_, claims, err := jwtauth.FromContext(ctx)
	userID := claims["userID"].(string)
	return userID, err
}
