package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	prisma "github.com/prisma/prisma-examples/go/rest-gin/prisma-client"
)

func main() {

	client := prisma.New(nil)

	r := gin.Default()
	ctx := context.Background()

	r.PUT("/publish/:id", func(c *gin.Context) {
		id := c.Param("id")
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

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.DELETE("/post/:id", func(c *gin.Context) {
		id := c.Param("id")

		post, err := client.DeletePost(prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.POST("/post", func(c *gin.Context) {
		var p map[string]string
		c.BindJSON(&p)

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
		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.POST("/user", func(c *gin.Context) {
		var u map[string]string
		c.BindJSON(&u)

		email := u["email"]
		name := u["name"]

		user, err := client.CreateUser(prisma.UserCreateInput{
			Email: email,
			Name:  &name,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}
		c.JSON(200, gin.H{
			"user": user,
		})
	})

	r.GET("/post/:id", func(c *gin.Context) {
		id := c.Param("id")

		post, err := client.Post(prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec(ctx)

		if err != nil {
			log.Printf("%v", err)
		}

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.GET("/filterPosts", func(c *gin.Context) {
		searchString := c.DefaultQuery("searchString", "")

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
		c.JSON(200, gin.H{
			"posts": posts,
		})
	})

	r.GET("/feed", func(c *gin.Context) {
		published := true
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				Published: &published,
			},
		},
		).Exec(ctx)

		if err != nil {
			panic(err)
		}

		c.JSON(200, gin.H{
			"posts": posts,
		})
	})

	fmt.Println("Server is running on http://localhost:8080")
	r.Run()
}
