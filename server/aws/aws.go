package _aws

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var AccessKeyID string
var SecretKey string
var AWSRegion string
var AWSBucket string
var filePath string
var Sess *session.Session

func GetEnvVar(key string) string {
	return os.Getenv(key)
}

func LoadDotEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalln("An error occured", err)
	}
}

func ConnectAWS(){
	AccessKeyID = GetEnvVar("AWS_ACCESS_KEY_ID")
	SecretKey = GetEnvVar("AWS_SECRET_KEY")
	AWSRegion = GetEnvVar("AWS_REGION")
	AWSBucket = GetEnvVar("BUCKET_NAME")

	var err error

	Sess, err = session.NewSession(
		&aws.Config{
			Region: aws.String(AWSRegion),
			Credentials: credentials.NewStaticCredentials(
				AccessKeyID,
				SecretKey,
				"",
			),
		})

	if err != nil {
		panic(err)
	}
}

func GetBucketLink(filename string) string {
	return "https://" + GetEnvVar("BUCKET_NAME") + "." + "s3.amazonaws.com/" + filename
}

func UploadImageHandler(c *gin.Context, fieldName string) (string, error){
	sess := c.MustGet("sess").(*session.Session)
	uploader := s3manager.NewUploader(sess)

	file, header, err := c.Request.FormFile(fieldName)
	fileName := header.Filename

	upload, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWSBucket),
		ACL:    aws.String("public-read"),
		Key:    aws.String(fileName),
		Body:   file,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":    "Failed to upload file!",
			"err":      err,
			"uploader": upload,
		})
		return "", fmt.Errorf("Failed to upload avatar")
	}

	return GetBucketLink(fileName), nil
}