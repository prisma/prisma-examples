package main

import "github.com/gin-gonic/gin"
import "go-gin/prisma-client"

func main() {

	client := prisma.New(&prisma.PrismaOptions{
		Debug:    true,
		Endpoint: "http://localhost:4466/go-gin/dev",
	})

	r := gin.Default()

	r.POST("/publish/:id", func(c *gin.Context) {
		id := c.Param("id")
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
			panic(err)
		}

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.POST("/delete/:id", func(c *gin.Context) {
		id := c.Param("id")

		post, err := client.DeletePost(&prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec()

		if err != nil {
			panic(err)
		}

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.POST("/draft", func(c *gin.Context) {
		title := "Draft"
		email := "alice@prisma.io"

		post, err := client.CreatePost(&prisma.PostCreateInput{
			Title:   &title,
			Content: &title,
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
		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.GET("/post/:id", func(c *gin.Context) {
		id := c.Param("id")

		post, err := client.Post(&prisma.PostWhereUniqueInput{
			ID: &id,
		},
		).Exec()

		if err != nil {
			panic(err)
		}

		c.JSON(200, gin.H{
			"post": post,
		})
	})

	r.GET("/drafts", func(c *gin.Context) {
		published := false
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				IsPublished: &published,
			},
		},
		).Exec()

		if err != nil {
			panic(err)
		}

		c.JSON(200, gin.H{
			"posts": posts,
		})
	})

	r.GET("/feed", func(c *gin.Context) {
		published := true
		posts, err := client.Posts(&prisma.PostsParams{
			Where: &prisma.PostWhereInput{
				IsPublished: &published,
			},
		},
		).Exec()

		if err != nil {
			panic(err)
		}

		c.JSON(200, gin.H{
			"posts": posts,
		})
	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
