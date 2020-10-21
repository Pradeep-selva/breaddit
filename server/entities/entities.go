package entitites

import (
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthDoc struct {
	Email string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`	
}

type UserCredentials struct {
	UserName string `json:"userName,omitempty"`
	Email string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
}

type Subs struct {
	Name string `json:"name,omitempty"`
	Description string `json:"description:omitempty"`
	Users []string `json:"users,omitempty"`
	CreatedAt *timestamppb.Timestamp `json:"createdAt,omitempty"`
	UpdatedAt *timestamppb.Timestamp `json:"updatedAt,omitempty"`
	Owner string `json:"owner,omitempty"`
	Thumbnail string `json:"thumbnail,omitempty"`
}

type UserData struct {
	UserName string `json:"userName,omitempty"`	
	Email string `json:"email,omitempty"`	
	Avatar string `json:"avatar,omitempty"`	
	Bio string `json:"bio,omitempty"`
	Status string `json:"status,omitempty"`
	Location string `json:"location,omitempty"`
	CreatedAt *timestamppb.Timestamp `json:"createdAt,omitempty"`
	UpdatedAt *timestamppb.Timestamp `json:"updatedAt,omitempty"`
	JoinedSubs []Subs `json:"joinedSubs,omitempty"`
	Breads int `json:"breads:omitempty"`
}