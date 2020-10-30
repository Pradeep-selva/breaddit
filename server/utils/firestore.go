package utils

import (
	"context"
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var Client *firestore.Client
var Ctx context.Context

func FirebaseInit() {
	Ctx = context.Background()
	serviceAccountKeyPath, _ := filepath.Abs("./serviceAccountKey.json")
	sa := option.WithCredentialsFile(serviceAccountKeyPath)
	app, err := firebase.NewApp(Ctx, nil, sa)

	if err != nil {
		panic(err)
	}

	Client, err = app.Firestore(Ctx)

	if err != nil {
		panic(err)
	}
}

func CheckImageUploadPerm(updateType string, ID string) error {
	fieldName := ""
	collectionName := ""

	if updateType == "Thumbnail" {
		fieldName = "ThumbnailUpdatedAt"
		collectionName = "subs"
	} else {
		fieldName = "AvatarUpdatedAt"
		collectionName = "users"
	}

	dsnap, err := Client.Collection(collectionName).Doc(ID).Get(Ctx)

	if err != nil {
		return fmt.Errorf("An error occured.")
	}

	doc := dsnap.Data()

	currentTime := time.Now()
	
	if doc[fieldName] == nil {
		return nil
	}

	updatedAt := doc[fieldName].(time.Time)
	
	duration := currentTime.Sub(updatedAt)

	if duration.Hours() < 6.0 {
		return fmt.Errorf("You can only change the "+strings.ToLower(updateType)+" once in 6 hours.")
	}

	return nil
}