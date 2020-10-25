package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/ptypes"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

//POST /api/v/sub/:id/post
func PostToSubHandler(c *gin.Context) {
	post := entities.Post{
		Content: c.PostForm("Content"),
		Link: c.PostForm("Link"),
		Comments: 0,
		Upvotes: 0,
		Downvotes: 0,
		CreatedAt: ptypes.TimestampNow(),
		Title: c.PostForm("Title"),
	}
	UID := c.MustGet("UID").(string)
	subID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(subID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": subID+" is not an existing subbreaddit",
			"statusCode": http.StatusBadRequest,
		})
		return
	}
	var subData entities.Sub
	dsnap.DataTo(&subData)
	found := utils.ArrayContains(subData.Users, UID)

	if !found {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You must join a subbreaddit before trying to post there.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	_, header, _ := c.Request.FormFile("Image")

	if header != nil {
		url, err := _aws.UploadImageHandler(c, "Image")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		post.Image = url
	}

	dsnap, err = utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}
	user := dsnap.Data()
	post.User = struct{UserName string; Avatar string}{user["UserName"].(string), user["Avatar"].(string)}

	post.Sub = subID

	_, _, err = utils.Client.Collection("posts").Add(utils.Ctx, post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return	
	}

	c.JSON(http.StatusOK, gin.H{
		"data": post,
		"statusCode": http.StatusOK,
	})
}


//GET /api/post/:id
func GetPostByIdhandler(c *gin.Context) {
	postId,_ := c.Params.Get("id")

	dsnap,err := utils.Client.Collection("posts").Doc(postId).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "This post does not exist!",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": dsnap.Data(),
		"statusCode": http.StatusOK,
	})
}


//DELETE /api/v/post/:id
func DeletePostHandler(c *gin.Context) {
	postId,_ := c.Params.Get("id")

	docRef := utils.Client.Collection("posts").Doc(postId)
	dsnap,err := docRef.Get(utils.Ctx)
	if  err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "This post does not exist.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	var post entities.Post
	dsnap.DataTo(&post)
	if post.User.UserName != c.MustGet("UID").(string) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You can only deleted posts that you posted.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	if _,err := docRef.Delete(utils.Ctx); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Post deleted succesfully!",
		"statusCode": http.StatusOK,
	})
}