package main

import (
	jwt "github.com/dgrijalva/jwt-go"
	jwtauth "github.com/go-chi/jwtauth"
	prisma "github.com/prisma/prisma-examples/go-graphql-auth/prisma-client"
	"golang.org/x/crypto/bcrypt"
)

type AuthPayload struct {
	Token string      `json:"token"`
	User  prisma.User `json:"user"`
}

var appSecret = []byte("appsecret321") // TODO : use env variable

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func SignToken(userID string) (string, error) {

	tokenAuth := jwtauth.New("HS256", []byte(appSecret), nil) // init() ?
	_, tokenString, err := tokenAuth.Encode(jwt.MapClaims{"userID": userID})

	return tokenString, err
}

func VerifyToken(tokenString string) (*jwt.Token, error) {

	tokenAuth := jwtauth.New("HS256", []byte(appSecret), nil) // init() ?
	token, err := tokenAuth.Decode(tokenString)

	//TODO : Verify if token valid
	return token, err

}
