package main

import (
	"fmt"
	prisma "go-gin/prisma-client"
)

func main() {

	client := prisma.New(&prisma.PrismaOptions{
		Endpoint: "http://localhost:4466/go-script/dev",
	})

	title := "Draft Post"
	content := "This is a draft post."
	email := "alice@prisma.io"

	post, err := client.CreatePost(&prisma.PostCreateInput{
		Title:   &title,
		Content: &content,
		Author: &prisma.UserCreateOneWithoutPostsInput{
			Connect: &prisma.UserWhereUniqueInput{
				Email: &email,
			},
		},
	},
	).Exec()

	if err != nil {
		panic(err)
	}

	id := post.ID

	fmt.Println("Created post with id", &id)
	fmt.Println(" ")

	published := false

	posts, err := client.Posts(&prisma.PostsParams{
		Where: &prisma.PostWhereInput{
			IsPublished: &published,
		},
	}).Exec()

	if err != nil {
		panic(err)
	}

	fmt.Printf("Queried unpublished posts: %+v\n", posts)
	fmt.Println(" ")

	ispublished := true

	updatedPost, err := client.UpdatePost(&prisma.UpdatePostParams{
		Where: &prisma.PostWhereUniqueInput{
			ID: &id,
		},
		Data: &prisma.PostUpdateInput{
			IsPublished: &ispublished,
		},
	},
	).Exec()

	if err != nil {
		panic(err)
	}

	fmt.Println("Published Post with id:", updatedPost.ID)
	fmt.Println(" ")

	publishedPosts, err := client.Posts(&prisma.PostsParams{
		Where: &prisma.PostWhereInput{
			IsPublished: &ispublished,
		},
	}).Exec()

	if err != nil {
		panic(err)
	}

	fmt.Printf("Queried published posts %+v\n", publishedPosts)
	fmt.Println(" ")

	publishedPost, err := client.Post(&prisma.PostWhereUniqueInput{
		ID: &updatedPost.ID,
	}).Exec()

	if err != nil {
		panic(err)
	}

	fmt.Println("Queried for post with id", updatedPost.ID)
	fmt.Printf("%+v\n", publishedPost)
	fmt.Println(" ")

	client.DeletePost(&prisma.PostWhereUniqueInput{
		ID: &updatedPost.ID,
	},
	).Exec()

	fmt.Println("Deleted post with id", updatedPost.ID)
}
