package controllers

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"

	entities "github.com/pradeep-selva/Breaddit/server/entities"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

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

//GET /api/v/search?q=
func SearchKeywordHandler(c *gin.Context) {
	key := strings.ToLower(c.Request.URL.Query().Get("q"))
	log.Println("search -->", key)

	users := []entities.UserSearch{}
	subs := []entities.SubsSearch{}

	iter := utils.Client.Collection("users").Where("UserName", ">=", key).Where("UserName", "<", key+"\uf8ff").Limit(20).Documents(utils.Ctx)

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
		}
		var user entities.UserSearch
		dsnap.DataTo(&user)

		users = append(users, user)
	}

	iter = utils.Client.Collection("subs").Where("Name", ">=", key).Where("Name", "<", key+"\uf8ff").Limit(20).Documents(utils.Ctx)

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
		}
		data := dsnap.Data()
		sub := entities.SubsSearch{
			Name:        data["Name"].(string),
			Thumbnail:   data["Thumbnail"].(string),
			Description: data["Description"].(string),
			Members:     len(data["Users"].([]interface{})),
		}

		subs = append(subs, sub)
	}

	iter = utils.Client.Collection("subs").Where("Tags", "array-contains-any", strings.Split(key, " ")).Limit(20).Documents(utils.Ctx)

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
		}

		data := dsnap.Data()
		f := 0
		for _, v := range subs {
			if v.Name == data["Name"] {
				f = 1
			}
		}
		if f != 1 {
			sub := entities.SubsSearch{
				Name:        data["Name"].(string),
				Thumbnail:   data["Thumbnail"].(string),
				Description: data["Description"].(string),
				Members:     len(data["Users"].([]interface{})),
			}

			subs = append(subs, sub)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"data": map[string]interface{}{
			"Users": users,
			"Subs":  subs,
		},
		"statusCode": http.StatusOK,
	})
}
