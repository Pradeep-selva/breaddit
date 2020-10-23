package routes

import (
	"github.com/gin-gonic/gin"
	controllers "github.com/pradeep-selva/Breaddit/server/controllers"
)

func InitRoutes(router *gin.Engine) {
	router.GET("/", controllers.IndexRouteHandler)
}

func InitPublicRoutes(router *gin.RouterGroup) {
	//common
	router.GET("/", controllers.HomeHandler)

	//auth
	router.GET("/login", controllers.LoginHandler)
	router.POST("/signup", controllers.SignUpHandler)
	
	//user
	router.GET("/user/:id", controllers.GetUserById)

	//subs
	router.GET("/sub/:id", controllers.GetSubByIdHandler)
}

func InitPrivateRoutes(router *gin.RouterGroup) {
	//user
	router.GET("/user", controllers.GetUserHandler)
	router.PUT("/user", controllers.UpdateUserDataHandler)
	router.DELETE("/user", controllers.DeactivateUserHandler)
	
	//subs
	router.POST("/sub", controllers.CreateSubHandler)
	router.PUT("/sub/:id", controllers.UpdateSubHandler)
	router.DELETE("/sub/:id", controllers.DeleteSubHandler)
	router.POST("/sub/:id/join", controllers.JoinSubHandler)
}
