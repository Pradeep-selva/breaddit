package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"

	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

//GET /api/v/feed/trending
func GetTrendingPostsHandler(c *gin.Context) {
	iter := utils.Client.Collection("posts").OrderBy("Upvotes", firestore.Desc).Limit(3).Documents(utils.Ctx)
	posts := []map[string]interface{}{}

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		var post map[string]interface{}
		dsnap.DataTo(&post)
		post["id"] = dsnap.Ref.ID

		posts = append(posts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       posts,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/feed/public
func GetPublicFeedHandler(c *gin.Context) {
	limit, offset := utils.GetLimitAndOffset(c)

	iter := utils.Client.Collection("posts").OrderBy("CreatedAt", firestore.Desc).Offset(offset).Limit(limit).Documents(utils.Ctx)

	posts := []map[string]interface{}{}

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		var post map[string]interface{}
		dsnap.DataTo(&post)
		post["ID"] = dsnap.Ref.ID

		posts = append(posts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       posts,
		"statusCode": http.StatusOK,
	})
}

//GET /api/v/feed/private
func GetPrivateFeedHandler(c *gin.Context) {
	UID := c.MustGet("UID").(string)
	limit, offset := utils.GetLimitAndOffset(c)

	dsnap, _ := utils.Client.Collection("users").Doc(UID).Get(utils.Ctx)

	var user entities.UserData
	posts := []map[string]interface{}{}

	dsnap.DataTo(&user)

	iter := utils.Client.Collection("posts").Where("Sub", "in", user.JoinedSubs).Offset(offset).OrderBy("CreatedAt", firestore.Desc).Limit(limit).Documents(utils.Ctx)

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error":      "An error occured.",
				"statusCode": http.StatusInternalServerError,
			})
			return
		}

		var post map[string]interface{}
		dsnap.DataTo(&post)
		post["ID"] = dsnap.Ref.ID

		posts = append(posts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       posts,
		"statusCode": http.StatusOK,
	})
}
