package core

type OpenBreweryDbError struct {
	IsOpenBreweryDbError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenBreweryDbError(code string, msg string, ctx *Context) *OpenBreweryDbError {
	return &OpenBreweryDbError{
		IsOpenBreweryDbError: true,
		Sdk:              "OpenBreweryDb",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenBreweryDbError) Error() string {
	return e.Msg
}
