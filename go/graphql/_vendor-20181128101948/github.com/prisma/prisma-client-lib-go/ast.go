package prisma

import (
	"fmt"
	"strings"
)

type operationType uint8

const (
	opQuery operationType = iota + 1
	opMutation
	opSubscription
)

type fielder interface {
	addField(field)
}

type argumentList []argument

func (l argumentList) format(b *strings.Builder) {
	if len(l) == 0 {
		return
	}
	b.WriteByte('(')
	for i, arg := range l {
		if i != 0 {
			b.WriteString(", ")
		}
		b.WriteString(arg.name)
		b.WriteString(": ")
		b.WriteString(arg.value)
	}
	b.WriteByte(')')
}

type fieldList []field

func (l fieldList) format(b *strings.Builder) {
	for _, f := range l {
		f.format(b)
		b.WriteByte('\n')
	}
}

type operation struct {
	typ       operationType
	name      string
	arguments argumentList
	fields    fieldList
}

func (op *operation) addField(f field) {
	op.fields = append(op.fields, f)
}

type argument struct {
	name  string
	value string
}

func formatOperation(op *operation) string {
	// TODO(dh): verify that all names are valid (e.g. don't contain spaces)

	b := &strings.Builder{}
	switch op.typ {
	case opQuery:
		b.WriteString("query")
	case opMutation:
		b.WriteString("mutation")
	case opSubscription:
		b.WriteString("subscription")
	default:
		panic(fmt.Sprintf("invalid operation type %q", op.typ))
	}

	b.WriteByte(' ')
	b.WriteString(op.name)
	op.arguments.format(b)
	b.WriteString(" {\n")
	op.fields.format(b)
	b.WriteByte('}')

	return b.String()
}

type field interface {
	format(b *strings.Builder)
	isField()
}

type scalarField struct {
	name      string
	arguments argumentList
}

func (f scalarField) format(b *strings.Builder) {
	b.WriteString(f.name)
	f.arguments.format(b)
}

func (scalarField) isField() {}

type objectField struct {
	name      string
	arguments argumentList
	fields    fieldList
}

func (of *objectField) addField(f field) {
	of.fields = append(of.fields, f)
}

func (of objectField) format(b *strings.Builder) {
	b.WriteString(of.name)
	of.arguments.format(b)
	b.WriteString(" {\n")
	of.fields.format(b)
	b.WriteString("}")
}

func (objectField) isField() {}
