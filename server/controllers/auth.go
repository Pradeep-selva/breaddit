package controllers

import (
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/golang/protobuf/ptypes"

	jwt "github.com/dgrijalva/jwt-go"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entities "github.com/pradeep-selva/Breaddit/server/entities"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

//POST /api/v/signup

func SignUpHandler(c *gin.Context) {
	var body entities.UserCredentials
	c.ShouldBindBodyWith(&body, binding.JSON)
	log.Println(body.UserName, "signed up")

	_, err := utils.Client.Collection("auth").Doc(body.UserName).Get(utils.Ctx)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "Account with specified username already exists!",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	iter := utils.Client.Collection("auth").Where("Email", "==", body.Email).Documents(utils.Ctx)
	_, err = iter.Next()
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "Account with specified email already exists!",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	body.Password = string(hashedPassword)

	_, err = utils.Client.Collection("auth").Doc(body.UserName).Set(utils.Ctx, entities.AuthDoc{
		Email:    body.Email,
		Password: body.Password,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	_, err = utils.Client.Collection("users").Doc(body.UserName).Set(utils.Ctx, entities.UserData{
		UserName:   body.UserName,
		Email:      body.Email,
		Avatar:     _aws.GetBucketLink("default-avatar.png"),
		Bio:        "🍞",
		Status:     "",
		Location:   "",
		CreatedAt:  ptypes.TimestampNow(),
		UpdatedAt:  ptypes.TimestampNow(),
		JoinedSubs: []string{},
		Breads:     0,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       body,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/login

func LoginHandler(c *gin.Context) {
	var body entities.UserCredentials
	var doc *firestore.DocumentSnapshot
	var err error

	c.ShouldBindBodyWith(&body, binding.JSON)

	if body.UserName == "" {
		iter := utils.Client.Collection("auth").Where("Email", "==", body.Email).Documents(utils.Ctx)
		doc, err = iter.Next()
	} else {
		doc, err = utils.Client.Collection("auth").Doc(body.UserName).Get(utils.Ctx)
	}

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":      "Specified user does not exist!",
			"statusCode": http.StatusNotFound,
		})
		return
	}
	id := doc.Ref.ID
	m := doc.Data()
	_password := m["Password"].(string)

	err = bcrypt.CompareHashAndPassword([]byte(_password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "Wrong credentials entered",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	dsnap, err := utils.Client.Collection("notifications").Doc(body.UserName).Get(utils.Ctx)
	if err == nil {
		var notifDoc struct {
			Notifications []entities.Notification
		}
		dsnap.DataTo(&notifDoc)

		if len(notifDoc.Notifications) > 20 {
			notifDoc.Notifications = notifDoc.Notifications[len(notifDoc.Notifications)-20:]
			_, err := utils.Client.Collection("notifications").Doc(body.UserName).Set(utils.Ctx, notifDoc)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":      "An error occured!",
					"statusCode": http.StatusInternalServerError,
				})
				return
			}
		}
	}

	token, err := GenerateJWT(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":      token,
		"statusCode": http.StatusOK,
	})
}

// helper

func GenerateJWT(userName string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["authorised"] = true
	claims["user"] = userName
	claims["exp"] = time.Now().Add(time.Minute * 60).Unix()

	tokenString, err := token.SignedString([]byte(_aws.GetEnvVar("SIGNING_KEY")))

	if err != nil {
		log.Println("Error occured while created JWT tokenString", err)
		return "", err
	}

	return tokenString, nil
}
