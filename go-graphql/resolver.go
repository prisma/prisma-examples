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
	result, err := r.Prisma.Cat(&prisma.CatWhereUniqueInput{ID: &obj.ID}).FavBrother(nil).Exec()
	favBrother := Cat{
		ID:    result.ID,
		Color: result.Color,
		Name:  result.Name,
	}
	return &favBrother, err
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Masters(ctx context.Context) ([]SpecialMaster, error) {
	result, err := r.Prisma.Masters(nil).Exec()
	specialMasters := make([]SpecialMaster, len(result))
	for i, v := range result {
		specialMasters[i] = SpecialMaster{
			ID: v.ID,
		}
	}
	return specialMasters, err
}

type specialMasterResolver struct{ *Resolver }

func (r *specialMasterResolver) CatBrothers(ctx context.Context, obj *SpecialMaster) ([]Cat, error) {
	result, err := r.Prisma.Master(&prisma.MasterWhereUniqueInput{ID: &obj.ID}).Catz(nil).Exec()
	catBrothers := make([]Cat, len(result))
	for i, v := range result {
		catBrothers[i] = Cat{
			ID:    v.ID,
			Color: v.Color,
			Name:  v.Name,
		}
	}
	return catBrothers, err
}
