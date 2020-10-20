package utils

import (
	"context"
	"path/filepath"

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
