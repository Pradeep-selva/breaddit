package controllers

import (
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/ptypes"
	"google.golang.org/api/iterator"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

//POST /api/v/sub/:id/post
func PostToSubHandler(c *gin.Context) {
	post := entities.Post{
		Content:   c.PostForm("Content"),
		Link:      c.PostForm("Link"),
		Comments:  0,
		Upvotes:   0,
		Downvotes: 0,
		CreatedAt: ptypes.TimestampNow(),
		Title:     c.PostForm("Title"),
	}
	UID := c.MustGet("UID").(string)
	subID, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("subs").Doc(subID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      subID + " is not an existing subbreaddit",
			"statusCode": http.StatusBadRequest,
		})
		return
	}
	var subData entities.Sub
	dsnap.DataTo(&subData)
	found := utils.ArrayContains(subData.Users, UID)

	if !found {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "You must join a subbreaddit before trying to post there.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	_, header, _ := c.Request.FormFile("Image")

	if header != nil {
		url, err := _aws.UploadImageHandler(c, "Image")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":      err.Error(),
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		post.Image = url
	}

	dsnap, err = utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}
	user := dsnap.Data()
	post.User = struct {
		UserName string
		Avatar   string
	}{user["UserName"].(string), user["Avatar"].(string)}

	post.Sub = subID

	_, _, err = utils.Client.Collection("posts").Add(utils.Ctx, post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       post,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/user/:id/posts/
func GetUserPostsHandler(c *gin.Context) {
	UID, _ := c.Params.Get("id")

	if _, err := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "The specified user is not found",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	userPosts := []map[string]interface{}{}
	iter := utils.Client.Collection("posts").Where("User.UserName", "==", UID).OrderBy("CreatedAt", firestore.Desc).Documents(utils.Ctx)

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":      "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}
		post := dsnap.Data()
		post["ID"] = dsnap.Ref.ID

		userPosts = append(userPosts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       userPosts,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/subs/:id/posts/
func GetSubPostsHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")

	if _, err := utils.Client.Collection("subs").Doc(ID).Get(utils.Ctx); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "The specified subbreaddit is not found",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	subPosts := []map[string]interface{}{}
	iter := utils.Client.Collection("posts").Where("Sub", "==", ID).OrderBy("CreatedAt", firestore.Desc).Documents(utils.Ctx)

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":      "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}
		post := dsnap.Data()
		post["ID"] = dsnap.Ref.ID

		subPosts = append(subPosts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       subPosts,
		"statusCode": http.StatusOK,
	})
}

//GET /api/posts/:id
func GetPostByIdhandler(c *gin.Context) {
	postId, _ := c.Params.Get("id")

	dsnap, err := utils.Client.Collection("posts").Doc(postId).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "This post does not exist!",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       dsnap.Data(),
		"statusCode": http.StatusOK,
	})
}

//POST /api/v/posts/:id/upvote
func UpvotePostsHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")
	UID := c.MustGet("UID").(string)
	Downvote := ""

	postRef := utils.Client.Collection("posts").Doc(ID)

	_, err := postRef.Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "This post does not exist.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	iter := utils.Client.Collection("downvotes").Where("UserName", "==", UID).Where("PostId", "==", ID).Limit(1).Documents(utils.Ctx)
	dsnap, err := iter.Next()

	if err == nil {
		downvoteId := dsnap.Ref.ID

		_,err := utils.Client.Collection("downvotes").Doc(downvoteId).Delete(utils.Ctx)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		_, err = postRef.Update(utils.Ctx, []firestore.Update{
			{Path: "Downvotes", Value: firestore.Increment(-1)},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":     "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}	

		Downvote = "deleted successfully"
	}

	iter = utils.Client.Collection("upvotes").Where("UserName", "==", UID).Where("PostId", "==", ID).Limit(1).Documents(utils.Ctx)

	dsnap, err = iter.Next()
	if err == nil {
		upvoteId := dsnap.Ref.ID

		_, err := utils.Client.Collection("upvotes").Doc(upvoteId).Delete(utils.Ctx)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":      "An error occured",
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		_, err = postRef.Update(utils.Ctx, []firestore.Update{
			{Path: "Upvotes", Value: firestore.Increment(-1)},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":     "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": "upvote removed successfully",
			"statusCode": http.StatusOK,
		})
		return
	}

	payload := map[string]interface{}{
		"UserName": UID,
		"PostId":   ID,
	}

	_, _, err = utils.Client.Collection("upvotes").Add(utils.Ctx, payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	_, err = postRef.Update(utils.Ctx, []firestore.Update{
		{Path: "Upvotes", Value: firestore.Increment(1)},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     "An error occured",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	if Downvote != "" {
		payload["Downvote"] = Downvote
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       payload,
		"statusCode": http.StatusOK,
	})
}

//POST /api/v/posts/:id/downvote
func DownvotePostsHandler(c *gin.Context) {
	ID, _ := c.Params.Get("id")
	UID := c.MustGet("UID").(string)
	Upvote := ""

	postRef := utils.Client.Collection("posts").Doc(ID)

	_, err := postRef.Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "This post does not exist.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	iter := utils.Client.Collection("upvotes").Where("UserName", "==", UID).Where("PostId", "==", ID).Limit(1).Documents(utils.Ctx)
	dsnap, err := iter.Next()

	if err == nil {
		upvoteId := dsnap.Ref.ID

		_,err := utils.Client.Collection("upvotes").Doc(upvoteId).Delete(utils.Ctx)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		_, err = postRef.Update(utils.Ctx, []firestore.Update{
			{Path: "Upvotes", Value: firestore.Increment(-1)},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":     "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}	

		Upvote = "deleted successfully"
	}

	iter = utils.Client.Collection("downvotes").Where("UserName", "==", UID).Where("PostId", "==", ID).Limit(1).Documents(utils.Ctx)

	dsnap, err = iter.Next()
	if err == nil {
		downvoteId := dsnap.Ref.ID

		_, err := utils.Client.Collection("downvotes").Doc(downvoteId).Delete(utils.Ctx)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":      "An error occured",
				"statusCode": http.StatusBadRequest,
			})
			return
		}

		_, err = postRef.Update(utils.Ctx, []firestore.Update{
			{Path: "Downvotes", Value: firestore.Increment(-1)},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":     "An error occured",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": "downvote removed successfully",
			"statusCode": http.StatusOK,
		})
		return
	}

	payload := map[string]interface{}{
		"UserName": UID,
		"PostId":   ID,
	}

	_, _, err = utils.Client.Collection("downvotes").Add(utils.Ctx, payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	_, err = postRef.Update(utils.Ctx, []firestore.Update{
		{Path: "Downvotes", Value: firestore.Increment(1)},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     "An error occured",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	if Upvote != "" {
		payload["Upvote"] = Upvote
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       payload,
		"statusCode": http.StatusOK,
	})
}


//DELETE /api/v/posts/:id
func DeletePostHandler(c *gin.Context) {
	postId, _ := c.Params.Get("id")

	docRef := utils.Client.Collection("posts").Doc(postId)
	dsnap, err := docRef.Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "This post does not exist.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	var post entities.Post
	dsnap.DataTo(&post)
	if post.User.UserName != c.MustGet("UID").(string) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "You can only deleted posts that you posted.",
			"statusCode": http.StatusBadRequest,
		})
		return
	}

	if _, err := docRef.Delete(utils.Ctx); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":      "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       "Post deleted succesfully!",
		"statusCode": http.StatusOK,
	})
}
