package entitites

type UserCredentials struct {
	UserName string `json:"userName,omitempty"`
	Email string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
}