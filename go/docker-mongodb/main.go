package main

import (
	"context"
	"fmt"
	"log"

	prisma "github.com/prisma/prisma-examples/go/docker-mongodb/prisma-client"
)

func main() {

	client := prisma.New(nil)
	ctx := context.Background()

	// Retrieve all published posts
	published := true
	allPosts, err := client.Posts(&prisma.PostsParams{
		Where: &prisma.PostWhereInput{
			Published: &published,
		},
	}).Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Retrieved all published posts: : %+v\n", allPosts)

	// Create a new post (written by an already existing user with email alice@prisma.io)
	title := "Join the Prisma Slack community"
	content := "http://slack.prisma.io"
	email := "alice@prisma.io" // Should have been created during initial seeding
	post, err := client.CreatePost(prisma.PostCreateInput{
		Title:   title,
		Content: &content,
		Author: prisma.UserCreateOneWithoutPostsInput{
			Connect: &prisma.UserWhereUniqueInput{
				Email: &email,
			},
		},
	},
	).Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Created a new post: %+v\n", post)

	// Publish the new post
	postID := post.ID
	updatedPost, err := client.UpdatePost(prisma.PostUpdateParams{
		Where: prisma.PostWhereUniqueInput{
			ID: &postID,
		},
		Data: prisma.PostUpdateInput{
			Published: &published,
		},
	}).Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Published the newly created post:  %+v\n", updatedPost)

	postsByUser, err := client.User(prisma.UserWhereUniqueInput{
		Email: &email,
	}).Posts(nil).Exec(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Retrieved all posts from a specific user: %+v\n", postsByUser)

}
