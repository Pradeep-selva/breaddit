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
	posts := []entities.Post{}

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

		var post entities.Post
		dsnap.DataTo(&post)

		posts = append(posts, post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data": posts,
		"statusCode": http.StatusOK,
	})
}


//GET /api/v/feed
func GetFeedHandler(c *gin.Context) {
	limit, offset := utils.GetLimitAndOffset(c)

	iter := utils.Client.Collection("posts").OrderBy("CreatedAt", firestore.Desc).Offset(offset).Limit(limit).Documents(utils.Ctx)

	posts := []entities.Post{}

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

		var post entities.Post
		dsnap.DataTo(&post)

		posts = append(posts,post)
	}

	c.JSON(http.StatusOK, gin.H{
		"data": posts,
		"statusCode": http.StatusOK,
	})
}