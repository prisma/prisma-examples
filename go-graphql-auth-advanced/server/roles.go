package main

import (
	fmt "fmt"
	io "io"
	strconv "strconv"
)

type Role string

const (
	RolePostOwner Role = "PostOwner"
	RoleUser      Role = "User"
	RoleAuthor    Role = "Author"
)

func (e Role) IsValid() bool {
	switch e {
	case RolePostOwner, RoleUser, RoleAuthor:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
