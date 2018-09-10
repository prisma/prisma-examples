//go:generate gorunpkg github.com/99designs/gqlgen

package tmp

import (
	context "context"

	go_graphql "github.com/prisma/prisma-examples/go-graphql"
)

type Resolver struct{}

func (r *Resolver) Cat() go_graphql.CatResolver {
	return &catResolver{r}
}
func (r *Resolver) Query() go_graphql.QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) SpecialMaster() go_graphql.SpecialMasterResolver {
	return &specialMasterResolver{r}
}

type catResolver struct{ *Resolver }

func (r *catResolver) FavBrother(ctx context.Context, obj *go_graphql.Cat) (*go_graphql.Cat, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Masters(ctx context.Context) ([]go_graphql.SpecialMaster, error) {
	panic("not implemented")
}

type specialMasterResolver struct{ *Resolver }

func (r *specialMasterResolver) CatBrothers(ctx context.Context, obj *go_graphql.SpecialMaster) ([]go_graphql.Cat, error) {
	panic("not implemented")
}
