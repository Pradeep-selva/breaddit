package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

var PORT string

func main() {
	router := gin.Default()

	router.GET("/", IndexRouteHandler)
	router.GET(utils.GetRouteWithVersion("/"), HomeHandler)

	PORT = os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	router.Run(":" + PORT)
}

func IndexRouteHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Go to path /v1 to use api",
	})
}

func HomeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to breaddit api -- " + utils.Version,
	})
}
