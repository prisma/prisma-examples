package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/jwtauth"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {

		tokenString := jwtauth.TokenFromHeader(req)

		token, err := VerifyToken(tokenString)
		if err != nil || !token.Valid {
			fmt.Errorf("Token is not valid", err)
		}
		ctx := req.Context()
		newCtx := jwtauth.NewContext(ctx, token, err)

		req = req.WithContext(newCtx)
		next.ServeHTTP(w, req)
	})
}

func getUserID(ctx context.Context) (string, error) {
	_, claims, err := jwtauth.FromContext(ctx)
	userID := claims["userID"].(string)
	return userID, err
}
