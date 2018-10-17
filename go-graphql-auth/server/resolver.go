package main

import (
	context "context"
	"fmt"

	prisma "github.com/prisma/prisma-examples/go-graphql-auth/prisma-client"
)

type Resolver struct {
	Prisma *prisma.Client
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Post() PostResolver {
	return &postResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) User() UserResolver {
	return &userResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateDraft(ctx context.Context, title string, content string, authorEmail string) (prisma.Post, error) {
	userID, err := getUserID(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{
		ID: &userID,
	}).Exec(ctx)

	if user.Email != authorEmail {
		fmt.Errorf("Author invalid")
	}

	post, err := r.Prisma.CreatePost(prisma.PostCreateInput{
		Title:   title,
		Content: content,
		Author: prisma.UserCreateOneWithoutPostsInput{
			Connect: &prisma.UserWhereUniqueInput{
				Email: &authorEmail,
			},
		},
	}).Exec(ctx)

	return *post, err
}
func (r *mutationResolver) DeletePost(ctx context.Context, id string) (*prisma.Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) Publish(ctx context.Context, id string) (*prisma.Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) Signup(ctx context.Context, name string, email string, password string) (AuthPayload, error) {
	hashedPassword, _ := HashPassword(password)
	// TODO : error handling
	user, err := r.Prisma.CreateUser(prisma.UserCreateInput{
		Name:     name,
		Email:    email,
		Password: hashedPassword,
	}).Exec(ctx)
	signedToken, err := SignToken(user.ID)
	authPayload := AuthPayload{
		Token: signedToken,
		User:  *user,
	}
	return authPayload, err
}
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (AuthPayload, error) {
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{
		Email: &email,
	}).Exec(ctx)

	if err != nil {

		fmt.Errorf("No user found for email : %v", email, err)
	}

	valid := CheckPasswordHash(password, user.Password)
	if !valid {

		fmt.Errorf("Invalid password")
	}
	signedToken, err := SignToken(user.ID)
	authPayload := AuthPayload{
		Token: signedToken,
		User:  *user,
	}

	return authPayload, err

}

type postResolver struct{ *Resolver }

func (r *postResolver) Author(ctx context.Context, obj *prisma.Post) (prisma.User, error) {
	author, err := r.Prisma.Post(prisma.PostWhereUniqueInput{
		ID: &obj.ID,
	}).Author().Exec(ctx)
	return *author, err
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*prisma.User, error) {

	userID, _ := getUserID(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{
		ID: &userID,
	}).Exec(ctx)

	return user, err
}
func (r *queryResolver) Feed(ctx context.Context) ([]prisma.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Drafts(ctx context.Context) ([]prisma.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Post(ctx context.Context, id string) (*prisma.Post, error) {
	post, err := r.Prisma.Post(prisma.PostWhereUniqueInput{
		ID: &id,
	}).Exec(ctx)
	return post, err
}

type userResolver struct{ *Resolver }

func (r *userResolver) Posts(ctx context.Context, obj *prisma.User) ([]prisma.Post, error) {
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{
		ID: &obj.ID,
	}).Posts(nil).Exec(ctx)
	return user, err
}
