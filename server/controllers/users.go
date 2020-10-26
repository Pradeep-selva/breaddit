package controllers

import (
	"net/http"

	// "encoding/json"

	// "net/http"
	// "time"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"

	// "github.com/gin-gonic/gin/binding"
	"github.com/golang/protobuf/ptypes"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entities "github.com/pradeep-selva/Breaddit/server/entities"

	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

//GET /api/v/user
func GetUserHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)

	dsnap, err := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "Failed to retrieve your data!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	data := dsnap.Data()

	c.JSON(http.StatusOK, gin.H{
		"data":       data,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/user/:id
func GetUserById(c *gin.Context) {
	UID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":      "User Not Found",
			"statusCode": http.StatusNotFound,
		})
		return
	}

	data := dsnap.Data()

	c.JSON(http.StatusOK, gin.H{
		"data":       data,
		"statusCode": http.StatusOK,
	})
}

//PUT /api/v/user
func UpdateUserDataHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)

	formData := map[string]interface{}{
		"Bio":       c.PostForm("Bio"),
		"Location":  c.PostForm("Location"),
		"Status":    c.PostForm("Status"),
		"UpdatedAt": ptypes.TimestampNow(),
	}

	for key, value := range formData {
		if value == "" {
			delete(formData, key)
		}
	}

	_, header, _ := c.Request.FormFile("Avatar")

	if header != nil {
		avatarUrl, err := _aws.UploadImageHandler(c, "Avatar")

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":      err.Error(),
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		formData["Avatar"] = avatarUrl
	}

	_, err := utils.Client.Collection("users").Doc(UID).Set(utils.Ctx, formData, firestore.MergeAll)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured while updating your profile!",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       formData,
		"statusCode": http.StatusOK,
	})
}

//DELETE /api/v/user
func DeactivateUserHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)
	batch := utils.Client.Batch()

	iter := utils.Client.Collection("subs").Where("Users", "array-contains", UID).Documents(utils.Ctx)
	var sub entities.Sub
	updates := 0

	for {
		dsnap, err := iter.Next()

		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":      "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		dsnap.DataTo(&sub)
		sub.Users = utils.RemoveArrayElement(sub.Users, utils.FindInArray(sub.Users, UID))
		docRef := utils.Client.Collection("subs").Doc(sub.Name)

		batch.Set(docRef, sub)
		updates += 1
	}

	if updates != 0 {
		_, err := batch.Commit(utils.Ctx)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":      "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}
	}

	_, err := utils.Client.Collection("users").Doc(UID).Delete(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured while deactivating.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	_, err = utils.Client.Collection("auth").Doc(UID).Delete(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured while deactivating.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       "Deactivated succesfully! We'll see you around.",
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/users/upvotes
func GetUserUpvotesHandler(c * gin.Context) {
	UID := c.MustGet("UID").(string)
	var upvotes []entities.Vote
	var upvoteDoc entities.Vote

	iter := utils.Client.Collection("upvotes").Where("UserName","==", UID).Documents(utils.Ctx)
	
	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		dsnap.DataTo(&upvoteDoc)
		upvoteDoc.ID = dsnap.Ref.ID
		upvotes = append(upvotes, upvoteDoc)
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":upvotes,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/users/downvotes
func GetUserDownvotesHandler(c * gin.Context) {
	UID := c.MustGet("UID").(string)
	var downvotes []entities.Vote
	var downvoteDoc entities.Vote

	iter := utils.Client.Collection("downvotes").Where("UserName","==", UID).Documents(utils.Ctx)
	
	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		dsnap.DataTo(&downvoteDoc)
		downvoteDoc.ID = dsnap.Ref.ID
		downvotes = append(downvotes, downvoteDoc)
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data":downvotes,
		"statusCode": http.StatusOK,
	})
}