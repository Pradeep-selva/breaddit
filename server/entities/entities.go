package entitites

import (
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthDoc struct {
	Email string
	Password string 
}

type UserCredentials struct {
	UserName string 
	Email string 
	Password string 
}

type Sub struct {
	Name string 
	Description string 
	Users []string 
	CreatedAt *timestamppb.Timestamp 
	UpdatedAt *timestamppb.Timestamp 
	Owner string 
	Thumbnail string 
}

type UserData struct {
	UserName string 	
	Email string 	
	Avatar string 	
	Bio string 
	Status string 
	Location string 
	CreatedAt *timestamppb.Timestamp 
	UpdatedAt *timestamppb.Timestamp 
	JoinedSubs []string 
	Breads int 
}