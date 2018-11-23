package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	prisma "github.com/prisma/prisma-examples/go/http-mux/prisma-client"

	"github.com/gorilla/mux"
)

func main() {
	client := prisma.New(nil)

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/delete/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		post, err := client.DeletePost(&prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("POST")

	router.HandleFunc("/publish/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		published := true
		post, err := client.UpdatePost(&prisma.UpdatePostParams{
			Where: &prisma.PostWhereUniqueInput{
				ID: &id,
			},
			Data: &prisma.PostUpdateInput{
				IsPublished: &published,
			},
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("POST")

	router.HandleFunc("/draft", func(w http.ResponseWriter, r *http.Request) {
		// TODO: How do we get request body?
		title := "Draft"
		email := "alice@prisma.io"

		post, err := client.CreatePost(&prisma.PostCreateInput{
			Title:   "Draft",
			Content: "Draft",
			Author: prisma.UserCreateOneWithoutPostsInput{
				Connect: &prisma.UserWhereUniqueInput{
					Email: &email,
				},
			},
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("POST")

	router.HandleFunc("/post/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		post, err := client.Post(&prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("GET")

	router.HandleFunc("/drafts", func(w http.ResponseWriter, r *http.Request) {

		published := false
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				IsPublished: &published,
			},
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}).Methods("GET")

	router.HandleFunc("/feed", func(w http.ResponseWriter, r *http.Request) {

		published := true
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				IsPublished: &published,
			},
		},
		).Exec()

		if err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}).Methods("GET")

	router.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Ping!")
	}).Methods("GET")

	fmt.Println("Running on PORT 8080!")
	log.Fatal(http.ListenAndServe(":8080", router))
}
