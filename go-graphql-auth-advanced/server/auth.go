package main

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
	prisma "github.com/prisma/prisma-examples/go-graphql-auth-advanced/prisma-client"
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

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
	})
	tokenString, err := token.SignedString(appSecret)
	return tokenString, err
}

func VerifyToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return appSecret, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		id := claims["userID"].(string)
		return id, err
	} else {
		fmt.Println(err)
	}
	return "", err

}
