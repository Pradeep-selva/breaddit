package routes

import (
	"github.com/gin-gonic/gin"
	controllers "github.com/pradeep-selva/Breaddit/server/controllers"
)

func InitRoutes(router *gin.Engine) {
	router.GET("/", controllers.IndexRouteHandler)
}

func InitPublicRoutes(router *gin.RouterGroup) {
	router.GET("/", controllers.HomeHandler)
	router.GET("/login", controllers.LoginHandler)
	
	router.POST("/signup", controllers.SignUpHandler)
	router.GET("/user/:id", controllers.GetUserById)
}

func InitPrivateRoutes(router *gin.RouterGroup) {
	router.GET("/user", controllers.GetUserHandler)
	router.PUT("/user", controllers.UpdateUserDataHandler)
	router.DELETE("/user", controllers.DeactivateUserHandler)
}
