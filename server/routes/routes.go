package routes

import (
	"github.com/gin-gonic/gin"
	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	controllers "github.com/pradeep-selva/Breaddit/server/controllers"
)

func InitRoutes(router *gin.Engine) {
	router.GET("/", controllers.IndexRouteHandler)
}

func InitPublicRoutes(router *gin.RouterGroup) {
	router.GET("/", controllers.HomeHandler)
	router.GET("/login", controllers.LoginHandler)
	
	router.POST("/signup", controllers.SignUpHandler)
	router.POST("/upload", _aws.UploadImageHandler)
}

func InitPrivateRoutes(router *gin.RouterGroup) {
	router.GET("/showUID", privateHandler)
}

func privateHandler(c *gin.Context){
	k := c.MustGet("UID").(string)
	c.JSON(200, gin.H{
			"message":"private",
			"UID": k,
		})
}