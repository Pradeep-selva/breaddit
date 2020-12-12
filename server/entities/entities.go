package entitites

import (
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthDoc struct {
	Email    string
	Password string
}

type UserCredentials struct {
	UserName string
	Email    string
	Password string
}

type Sub struct {
	Name        string
	Description string
	Users       []string
	ThumbnailUpdatedAt *timestamppb.Timestamp
	CreatedAt   *timestamppb.Timestamp
	UpdatedAt   *timestamppb.Timestamp
	Owner       string
	Thumbnail   string
	Tags []string
}

type UserData struct {
	UserName   string
	Email      string
	Avatar     string
	Bio        string
	Status     string
	Location   string
	AvatarUpdatedAt *timestamppb.Timestamp
	CreatedAt  *timestamppb.Timestamp
	UpdatedAt  *timestamppb.Timestamp
	JoinedSubs []string
	Breads     int
}

type Post struct {
	Title   string
	Link    string
	Content string
	Image   string
	User    struct {
		UserName string
		Avatar   string
	}
	Sub       string
	Upvotes   int
	Comments  int
	Downvotes int
	CreatedAt *timestamppb.Timestamp
}

type PostWithID struct {
	Title   string
	Link    string
	Content string
	Image   string
	User    struct {
		UserName string
		Avatar   string
	}
	Sub       string
	Upvotes   int
	Comments  int
	Downvotes int
	CreatedAt *timestamppb.Timestamp
	ID string
}

type Vote struct {
	ID string
	UserName string
	PostId string
}

type Comment struct {
	PostId string
	Body string
	CreatedAt *timestamppb.Timestamp
	CreatedBy string
}

type Notification struct {
	Sender string
	PostId string
	Time *timestamppb.Timestamp
	Content string
	Seen bool
}

