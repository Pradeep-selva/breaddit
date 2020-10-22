package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

// /

func IndexRouteHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Go to path /api/"+utils.Version+" to use api",
	})
}

// /api/v/

func HomeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to breaddit api -- " + utils.Version,
	})
}

