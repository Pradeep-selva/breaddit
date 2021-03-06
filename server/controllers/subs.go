package controllers

import (
	"context"
	"fmt"
	"strings"

	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/ptypes"
	"google.golang.org/api/iterator"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

//POST /api/v/sub
func CreateSubHandler(c *gin.Context) {
	body := &entities.Sub{
		Name:        c.PostForm("Name"),
		Description: c.PostForm("Description"),
	}

	_tags := c.PostForm("Tags")
	if _tags != "" {
		body.Tags = strings.Split(strings.ToLower(_tags), " ")
	}

	subRef := utils.Client.Collection("subs").Doc(body.Name)
	_, err := subRef.Get(utils.Ctx)

	if err == nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      body.Name + " is already an existing subbreaddit",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	body.Owner = c.MustGet("UID").(string)
	body.CreatedAt = ptypes.TimestampNow()
	body.UpdatedAt = ptypes.TimestampNow()
	body.Users = []string{body.Owner}

	_, header, _ := c.Request.FormFile("Thumbnail")

	if header == nil {
		body.Thumbnail = _aws.GetBucketLink("default-thumbnail.png")
	} else {
		url, err := _aws.UploadImageHandler(c, "Thumbnail")

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      err.Error(),
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		body.Thumbnail = url
	}

	_, err = subRef.Set(utils.Ctx, body)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "Error occured while creating subbreaddit",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	userRef := utils.Client.Collection("users").Doc(c.MustGet("UID").(string))
	dsnap, err := userRef.Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "Error occured while creating subbreaddit",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	var user entities.UserData
	dsnap.DataTo(&user)
	user.JoinedSubs = append(user.JoinedSubs, body.Name)
	user.UpdatedAt = ptypes.TimestampNow()

	_, _ = userRef.Set(utils.Ctx, user)

	c.JSON(http.StatusOK, gin.H{
		"data":       body,
		"statusCode": http.StatusOK,
	})
}

//PUT /api/v/sub/:id
func UpdateSubHandler(c *gin.Context) {
	formData := map[string]interface{}{
		"Description": c.PostForm("Description"),
		"UpdatedAt":   ptypes.TimestampNow(),
		"Tags":        strings.Split(strings.ToLower(c.PostForm("Tags")), ", "),
	}

	if formData["Description"] == "" {
		delete(formData, "Description")
	}
	if formData["Tags"].([]string)[0] == "" {
		delete(formData, "Tags")
	}

	ID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "This subbreaddit does not exist",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	data := dsnap.Data()

	if data["Owner"].(string) != c.MustGet("UID").(string) {
		c.JSON(http.StatusOK, gin.H{
			"error":      "You are not authorized to modify this subbreaddit!",
			"statusCode": http.StatusUnauthorized,
		})
		return
	}

	_, header, _ := c.Request.FormFile("Thumbnail")

	if header != nil {
		err := utils.CheckImageUploadPerm("Thumbnail", ID)

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      err.Error(),
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		url, err := _aws.UploadImageHandler(c, "Thumbnail")

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      err.Error(),
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		formData["Thumbnail"] = url
		formData["ThumbnailUpdatedAt"] = ptypes.TimestampNow()
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Set(utils.Ctx, formData, firestore.MergeAll)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured while updating",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       formData,
		"statusCode": http.StatusOK,
	})
}

//DELETE /api/v/sub/:id
func DeleteSubHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "This subbreaddit does not exist",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	data := dsnap.Data()

	if data["Owner"].(string) != c.MustGet("UID").(string) {
		c.JSON(http.StatusOK, gin.H{
			"error":      "You are not authorized to delete this subbreaddit!",
			"statusCode": http.StatusUnauthorized,
		})
		return
	}

	iter := utils.Client.Collection("users").Where("JoinedSubs", "array-contains", ID).Documents(utils.Ctx)

	batch := utils.Client.Batch()
	var user entities.UserData
	updates := 0

	for {
		dsnap, err := iter.Next()

		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      "An error occured while deleting.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		dsnap.DataTo(&user)
		user.JoinedSubs = utils.RemoveArrayElement(user.JoinedSubs, utils.FindInArray(user.JoinedSubs, ID))
		docRef := utils.Client.Collection("users").Doc(user.UserName)

		batch.Set(docRef, user)
		updates += 1
	}

	if updates != 0 {
		_, err = batch.Commit(utils.Ctx)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      "An error occured while deleting.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Delete(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured while deleting.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       "This subbreaddit will be missed. Big F!",
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/sub/:id
func GetSubByIdHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "This subbreaddit does not exist.",
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

//POST /api/v/sub/:id/join
func JoinSubHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)
	ID, _ := c.Params.Get("id")

	var user entities.UserData
	var sub entities.Sub

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "This subreddit does not exist.",
			"statusCode": http.StatusNotFound,
		})
		return
	}

	dsnap.DataTo(&sub)

	ref := utils.Client.Collection("users").Doc(UID)
	err = utils.Client.RunTransaction(utils.Ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		dsnap, err := tx.Get(ref)

		if err != nil {
			return fmt.Errorf("An error occured.")
		}
		dsnap.DataTo(&user)

		found := utils.ArrayContains(user.JoinedSubs, ID)

		if found {
			return fmt.Errorf("You are already in the subbreaddit.")
		}

		user.JoinedSubs = append(user.JoinedSubs, ID)
		user.UpdatedAt = ptypes.TimestampNow()
		sub.Users = append(sub.Users, UID)
		sub.UpdatedAt = ptypes.TimestampNow()

		return tx.Set(ref, user)
	})

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      err.Error(),
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Set(utils.Ctx, sub)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured while joining.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": map[string]interface{}{
			"User": user,
			"Sub":  sub,
		},
		"statusCode": http.StatusOK,
	})
}

//POST /api/v/sub/:id/leave
func LeaveSubHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)
	ID, _ := c.Params.Get("id")

	var user entities.UserData
	var sub entities.Sub

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "This subreddit does not exist.",
			"statusCode": http.StatusNotFound,
		})
		return
	}

	dsnap.DataTo(&sub)

	ref := utils.Client.Collection("users").Doc(UID)
	err = utils.Client.RunTransaction(utils.Ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		dsnap, err := tx.Get(ref)

		if err != nil {
			return fmt.Errorf("An error occured.")
		}
		dsnap.DataTo(&user)

		found := utils.ArrayContains(user.JoinedSubs, ID)

		if !found {
			return fmt.Errorf("You must join a subreddit before trying to leave it.")
		}

		user.JoinedSubs = utils.RemoveArrayElement(user.JoinedSubs, utils.FindInArray(user.JoinedSubs, ID))
		user.UpdatedAt = ptypes.TimestampNow()
		sub.Users = utils.RemoveArrayElement(sub.Users, utils.FindInArray(sub.Users, UID))
		sub.UpdatedAt = ptypes.TimestampNow()

		return tx.Set(ref, user)
	})

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      err.Error(),
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Set(utils.Ctx, sub)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured while leaving.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": map[string]interface{}{
			"User": user,
			"Sub":  sub,
		},
		"statusCode": http.StatusOK,
	})
}
