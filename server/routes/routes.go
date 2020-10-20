package routes

import (
	"github.com/gin-gonic/gin"
	controllers "github.com/pradeep-selva/Breaddit/server/controllers"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

func Init(router *gin.Engine) {
	router.GET("/", controllers.IndexRouteHandler)
	router.GET(utils.GetRouteWithVersion("/"), controllers.HomeHandler)
	
	router.POST(utils.GetRouteWithVersion("/signup"), controllers.SignUpHandler)
}
