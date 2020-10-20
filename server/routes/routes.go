package routes

import (
	"github.com/gin-gonic/gin"
	_aws "github.com/pradeep-selva/Breaddit/server/aws"
	controllers "github.com/pradeep-selva/Breaddit/server/controllers"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

func Init(router *gin.Engine) {
	router.GET("/", controllers.IndexRouteHandler)
	router.GET(utils.GetRouteWithVersion("/"), controllers.HomeHandler)
	router.GET(utils.GetRouteWithVersion("/login"), controllers.LoginHandler)
	
	router.POST(utils.GetRouteWithVersion("/signup"), controllers.SignUpHandler)
	router.POST(utils.GetRouteWithVersion("/upload"), _aws.UploadImageHandler)
}
