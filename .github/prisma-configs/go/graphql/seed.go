package main

import (
	"context"

	prisma "github.com/prisma/prisma-examples/go/graphql/prisma-client"
)

func main() {

	client := prisma.New(nil)
	ctx := context.Background()

	published := true

	email1 := "alice@prisma.io"
	name1 := "Alice"
	title1 := "Join us for GraphQL Conf 2019 in Berlin"
	content1 := "https://www.graphqlconf.org/"
	client.CreateUser(prisma.UserCreateInput{
		Name:  &name1,
		Email: email1,
		Posts: &prisma.PostCreateManyWithoutAuthorInput{
			Create: []prisma.PostCreateWithoutAuthorInput{
				prisma.PostCreateWithoutAuthorInput{
					Title:     title1,
					Content:   &content1,
					Published: &published,
				},
			},
		},
	}).Exec(ctx)

	email2 := "bob@prisma.io"
	name2 := "Bob"
	title2 := "Subscribe to GraphQL Weekly for community news"
	content2 := "https://graphqlweekly.com/"
	title3 := "Follow Prisma on Twitter"
	content3 := "https://twitter.com/prisma/"
	client.CreateUser(prisma.UserCreateInput{
		Name:  &name2,
		Email: email2,
		Posts: &prisma.PostCreateManyWithoutAuthorInput{
			Create: []prisma.PostCreateWithoutAuthorInput{
				prisma.PostCreateWithoutAuthorInput{
					Title:     title2,
					Content:   &content2,
					Published: &published,
				},
				prisma.PostCreateWithoutAuthorInput{
					Title:   title3,
					Content: &content3,
				},
			},
		},
	}).Exec(ctx)
}
