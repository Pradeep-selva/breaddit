package controllers

import (
	"net/http"

	// "encoding/json"

	// "net/http"
	// "time"

	// "cloud.google.com/go/firestore"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"

	// "github.com/gin-gonic/gin/binding"
	"github.com/golang/protobuf/ptypes"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"

	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

// /api/v/user
func GetUserHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)

	dsnap, err := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve your data!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	data := dsnap.Data()

	c.JSON(http.StatusOK, gin.H{
		"data": data,
		"statusCode": http.StatusOK,
	})
}

// /api/v/user/{id}
func GetUserById(c *gin.Context) {
	UID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User Not Found",
			"statusCode": http.StatusNotFound,
		})
		return
	}

	data := dsnap.Data()

	c.JSON(http.StatusOK, gin.H{
		"data": data,
		"statusCode": http.StatusOK,
	})
}

// /api/v/user
func UpdateUserDataHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)

	formData := map[string]interface{} {
		"Bio": c.PostForm("Bio"),
		"Location": c.PostForm("Location"),
		"Status": c.PostForm("Status"),
		"UpdatedAt": ptypes.TimestampNow(),
	}

	for key,value := range formData {
		if value == "" {
			delete(formData,key)
		}
	}

	avatarUrl, err := _aws.UploadImageHandler(c)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	formData["Avatar"] = avatarUrl

	_, err = utils.Client.Collection("users").Doc(UID).Set(utils.Ctx, formData, firestore.MergeAll)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured while updating your profile!",
			"statusCode": http.StatusInternalServerError,
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"data": formData,
		"statusCode": http.StatusOK,
	})
}

// /api/v/user
func DeactivateUserHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)

	_, err := utils.Client.Collection("users").Doc(UID).Delete(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured while deactivating.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Deactivated succesfully! We'll see you around.",
		"statusCode": http.StatusOK,
	})
}