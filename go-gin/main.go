package main

import "fmt"
import "github.com/gin-gonic/gin"
import "go-gin/prisma-client"

func main() {


	client := prisma.New(&prisma.PrismaOptions{
		Debug: true,
		Endpoint: "http://localhost:4466/go-gin/dev",
	})

	r := gin.Default()

	r.POST("/draft", func(c *gin.Context) {

		title := "Draft"
		email := "alice@prisma.io"

		fmt.Println(title, email);

		post, err := client.CreatePost(&prisma.PostCreateInput{
				Title: &title,
				Content: &title,
				Author: &prisma.UserCreateOneWithoutPostsInput{
					Connect: &prisma.UserWhereUniqueInput{
						Email: &email,
					},
				},
		},
	).Exec()

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(post)

	// fmt.Println(&post, &err)

		// c.JSON(200, gin.H{
		// 	"message": "pong",
		// })

	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}

// app.post(`/draft`, async (req, res) => {
//   const result = await prisma.createPost({
//     ...req.body,
//     author: { connect: { email: 'alice@prisma.io' } },
//   })
//   res.json(result)
// })
