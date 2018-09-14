//go:generate gorunpkg github.com/99designs/gqlgen

package main

import (
	"context"

	"github.com/prisma/prisma-examples/go-graphql/prisma-client"
)

type Resolver struct {
	Prisma *prisma.Client
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateDraft(ctx context.Context, title string, content string) (prisma.Post, error) {
	return r.Prisma.CreatePost(&prisma.PostCreateInput{Title: &title, Content: &content}).Exec()
}
func (r *mutationResolver) DeletePost(ctx context.Context, id string) (*prisma.Post, error) {
	// TODO remove pointer once fixed: https://github.com/prisma/prisma/issues/3066
	post, err := r.Prisma.DeletePost(&prisma.PostWhereUniqueInput{ID: &id}).Exec()
	return &post, err
}
func (r *mutationResolver) Publish(ctx context.Context, id string) (*prisma.Post, error) {
	// TODO remove pointer once fixed: https://github.com/prisma/prisma/issues/3066
	isPublished := true
	post, err := r.Prisma.UpdatePost(&prisma.UpdatePostParams{
		Where: &prisma.PostWhereUniqueInput{ID: &id},
		Data:  &prisma.PostUpdateInput{IsPublished: &isPublished},
	}).Exec()
	return &post, err
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Feed(ctx context.Context) ([]prisma.Post, error) {
	isPublished := true
	return r.Prisma.Posts(&prisma.PostsParams{
		Where: &prisma.PostWhereInput{IsPublished: &isPublished},
	}).Exec()
}
func (r *queryResolver) Drafts(ctx context.Context) ([]prisma.Post, error) {
	isPublished := false
	return r.Prisma.Posts(&prisma.PostsParams{
		Where: &prisma.PostWhereInput{IsPublished: &isPublished},
	}).Exec()
}
func (r *queryResolver) Post(ctx context.Context, id string) (*prisma.Post, error) {
	// TODO remove pointer once fixed: https://github.com/prisma/prisma/issues/3066
	post, err := r.Prisma.Post(&prisma.PostWhereUniqueInput{ID: &id}).Exec()
	return &post, err
}
