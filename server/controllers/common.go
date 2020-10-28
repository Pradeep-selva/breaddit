package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"

	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

type userSearch struct {
	UserName string
	Avatar   string
	Bio      string
}

type subsSearch struct {
	Name        string
	Thumbnail   string
	Description string
}

//GET /
func IndexRouteHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Go to path /api/" + utils.Version + " to use api",
	})
}

//GET /api/v/
func HomeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to breaddit api -- " + utils.Version,
	})
}

func SearchKeywordHandler(c *gin.Context) {
	key := c.Request.URL.Query().Get("q")

	users := []userSearch{}
	subs := []subsSearch{}

	iter := utils.Client.Collection("users").Where("UserName", ">=", key).Where("UserName", "<", key+"\uf8ff").Documents(utils.Ctx)

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		var user userSearch
		dsnap.DataTo(&user)

		users = append(users, user)
	}

	iter = utils.Client.Collection("subs").Where("Name", ">=", key).Where("Name", "<", key+"\uf8ff").Documents(utils.Ctx)

	for {
		dsnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		var sub subsSearch
		dsnap.DataTo(&sub)

		subs = append(subs, sub)
	}

	c.JSON(http.StatusOK, gin.H{
		"data": map[string]interface{}{
			"Users": users,
			"Subs":  subs,
		},
		"statusCode": http.StatusOK,
	})
}
