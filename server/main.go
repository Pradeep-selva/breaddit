package main

import (
	"os"

	"github.com/gin-gonic/gin"

	routes "github.com/pradeep-selva/Breaddit/server/routes"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

var PORT string

func main() {
	utils.FirebaseInit()
	defer utils.Client.Close()

	router := gin.Default()

	routes.Init(router)

	PORT = os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	router.Run(":" + PORT)
}
