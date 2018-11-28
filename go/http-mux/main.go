package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	prisma "github.com/prisma/prisma-examples/go/http-mux/prisma-client"

	"github.com/gorilla/mux"
)

func main() {
	client := prisma.New(nil)
	ctx := context.Background()

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/post/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		post, err := client.Post(prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("GET")

	router.HandleFunc("/feed", func(w http.ResponseWriter, r *http.Request) {
		published := true
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				Published: &published,
			},
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}).Methods("GET")

	router.HandleFunc("/filterPosts", func(w http.ResponseWriter, r *http.Request) {
		keys := r.URL.Query()["searchString"]
		searchString := ""
		if len(keys) >= 1 {
			searchString = keys[0]
		}
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				Or: []prisma.PostWhereInput{
					prisma.PostWhereInput{
						TitleContains: &searchString,
					},
					prisma.PostWhereInput{
						TitleContains: &searchString,
					},
				},
			},
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	}).Methods("GET")

	router.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
		var p map[string]string
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&p); err != nil {
			return
		}
		defer r.Body.Close()

		title := p["title"]
		content := p["content"]
		authorEmail := p["authorEmail"]

		post, err := client.CreatePost(prisma.PostCreateInput{
			Title:   title,
			Content: &content,
			Author: prisma.UserCreateOneWithoutPostsInput{
				Connect: &prisma.UserWhereUniqueInput{
					Email: &authorEmail,
				},
			},
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("POST")

	router.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		var u map[string]string
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&u); err != nil {
			return
		}
		defer r.Body.Close()

		name := u["name"]
		email := u["email"]

		user, err := client.CreateUser(prisma.UserCreateInput{
			Email: email,
			Name:  &name,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}).Methods("POST")

	router.HandleFunc("/post/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		post, err := client.DeletePost(prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("DELETE")

	router.HandleFunc("/publish/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		published := true
		post, err := client.UpdatePost(prisma.PostUpdateParams{
			Where: prisma.PostWhereUniqueInput{
				ID: &id,
			},
			Data: prisma.PostUpdateInput{
				Published: &published,
			},
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(post)
	}).Methods("PUT")

	fmt.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
