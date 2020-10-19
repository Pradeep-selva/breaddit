package main

import (
	"os"

	"github.com/gin-gonic/gin"
	routes "github.com/pradeep-selva/Breaddit/server/routes"
)

var PORT string

func main() {
	router := gin.Default()

	routes.Init(router)

	PORT = os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	router.Run(":" + PORT)
}


