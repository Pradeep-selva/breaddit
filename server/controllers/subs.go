package controllers

import (
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/ptypes"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entitites "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

// /api/v/sub
func CreateSubHandler(c *gin.Context) {
	body := &entitites.Sub{
		Name: c.PostForm("Name"),
		Description: c.PostForm("Description"),
	}
	
	_, err := utils.Client.Collection("subs").Doc(body.Name).Get(utils.Ctx)

	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": body.Name+" is already an existing subbreaddit",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	body.Owner = c.MustGet("UID").(string)
	body.CreatedAt = ptypes.TimestampNow()
	body.UpdatedAt = ptypes.TimestampNow()
	body.Users = []string{}

	_,header,_ := c.Request.FormFile("Thumbnail")

	if header == nil {
		body.Thumbnail = _aws.GetBucketLink("default-thumbnail.png")
	} else {
		url, err := _aws.UploadImageHandler(c, "Thumbnail")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
			"error":"Error occured while creating subbreaddit",
			"statusCode": http.StatusInternalServerError,
			})
			return
		}

		body.Thumbnail = url
	}

	_,err = utils.Client.Collection("subs").Doc(body.Name).Set(utils.Ctx, body)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":"Error occured while creating subbreaddit",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":body,
		"statusCode": http.StatusOK,
	})
}

// /api/v/sub/:id
func UpdateSubHandler(c *gin.Context) {
	formData := map[string]interface{}{
		"Description": c.PostForm("Description"),
		"UpdatedAt": ptypes.TimestampNow(),
	}

	ID,_ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
				"error": "This subbreaddit does not exist",
				"statusCode": http.StatusBadRequest,
			})
		return
	}
	
	data := dsnap.Data()

	if data["Owner"].(string) != c.MustGet("UID").(string) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "You are not authorized to modify this subbreaddit!",
			"statusCode": http.StatusUnauthorized,
		})
		return
	}

	if formData["Description"] == "" {
		delete(formData, "Description")
	}

	_,header,_ := c.Request.FormFile("Thumbnail")

	if header != nil {
		url, err := _aws.UploadImageHandler(c, "Thumbnail")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err,
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		formData["Thumbnail"] = url
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Set(utils.Ctx, formData, firestore.MergeAll)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured while updating",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": formData,
		"statusCode": http.StatusOK,
	})
}

// /api/v/sub/:id
func DeleteSubHandler(c *gin.Context) {
	ID,_ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
				"error": "This subbreaddit does not exist",
				"statusCode": http.StatusBadRequest,
			})
		return
	}
	
	data := dsnap.Data()

	if data["Owner"].(string) != c.MustGet("UID").(string) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "You are not authorized to delete this subbreaddit!",
			"statusCode": http.StatusUnauthorized,
		})
		return
	}

	_, err = utils.Client.Collection("subs").Doc(ID).Delete(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured while deleting.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "This subbreaddit will be missed. Big F!",
		"statusCode": http.StatusOK,
	})
}

// /api/v/sub/:id
func GetSubByIdHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "This subbreaddit does not exist.",
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