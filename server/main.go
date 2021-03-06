package main

import (
	"os"

	"github.com/gin-gonic/gin"

	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	middleware "github.com/pradeep-selva/Breaddit/server/middleware"
	routes "github.com/pradeep-selva/Breaddit/server/routes"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

var PORT string

func main() {
	utils.FirebaseInit()
	defer utils.Client.Close()

	_aws.LoadDotEnv()
	_aws.ConnectAWS()

	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.CheckApiAuthorization)
	router.Use(func(c *gin.Context) {
		c.Set("sess", _aws.Sess)
		c.Next()
	})

	publicRoutes := router.Group("/api/" + utils.Version + "/")
	privateRoutes := router.Group("/api/" + utils.Version + "/")

	privateRoutes.Use(middleware.IsAuthorized)

	routes.InitRoutes(router)
	routes.InitPublicRoutes(publicRoutes)
	routes.InitPrivateRoutes(privateRoutes)

	PORT = os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	router.Run(":" + PORT)
}
