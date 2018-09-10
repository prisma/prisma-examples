//go:generate gorunpkg github.com/99designs/gqlgen

package go_graphql

import (
	context "context"

	"github.com/prisma/prisma-examples/go-graphql/prisma-client"
)

type Resolver struct {
	Prisma *prisma.Client
}

func (r *Resolver) Cat() CatResolver {
	return &catResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) SpecialMaster() SpecialMasterResolver {
	return &specialMasterResolver{r}
}

type catResolver struct{ *Resolver }

func (r *catResolver) FavBrother(ctx context.Context, obj *Cat) (*Cat, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Masters(ctx context.Context) ([]SpecialMaster, error) {
	result, err := r.Prisma.Masters(nil).Exec()
	specialMasters := []SpecialMaster{}
	for i, v := range result {
		specialMasters[i] = SpecialMaster{
			ID: v.ID,
		}
	}
	return specialMasters, err
}

type specialMasterResolver struct{ *Resolver }

func (r *specialMasterResolver) CatBrothers(ctx context.Context, obj *SpecialMaster) ([]Cat, error) {
	result, err := r.Prisma.Master(&prisma.MasterWhereUniqueInput{ID: &obj.ID}).Catz(nil, nil, nil, nil, nil, nil, nil).Exec()
	catBrothers := []Cat{}
	for i, v := range result {
		catBrothers[i] = SpecialMaster{
			ID: v.ID,
		}
	}
	return catBrothers, err
	// panic("not implemented")
}
