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
	router.GET("/search", controllers.SearchKeywordHandler)

	//auth
	router.POST("/login", controllers.LoginHandler)
	router.POST("/signup", controllers.SignUpHandler)

	//user
	router.GET("/users/:id", controllers.GetUserById)

	//subs
	router.GET("/sub/:id", controllers.GetSubByIdHandler)

	//posts
	router.GET("/posts/:id", controllers.GetPostByIdhandler)
	router.GET("/users/:id/posts", controllers.GetUserPostsHandler)
	router.GET("/sub/:id/posts", controllers.GetPostsBySubHandler)

	//feed
	router.GET("/feed/public", controllers.GetPublicFeedHandler)
	router.GET("/feed/trending", controllers.GetTrendingPostsHandler)
}

func InitPrivateRoutes(router *gin.RouterGroup) {
	//user
	router.GET("/user", controllers.GetUserHandler)
	router.PUT("/user", controllers.UpdateUserDataHandler)
	router.DELETE("/user", controllers.DeactivateUserHandler)
	router.GET("/user/upvotes", controllers.GetUserUpvotesHandler)
	router.GET("/user/downvotes", controllers.GetUserDownvotesHandler)

	//subs
	router.POST("/sub", controllers.CreateSubHandler)
	router.PUT("/sub/:id", controllers.UpdateSubHandler)
	router.DELETE("/sub/:id", controllers.DeleteSubHandler)
	router.POST("/sub/:id/join", controllers.JoinSubHandler)
	router.POST("/sub/:id/leave", controllers.LeaveSubHandler)

	//posts
	router.POST("/sub/:id/post", controllers.PostToSubHandler)
	router.DELETE("/posts/:id", controllers.DeletePostHandler)
	router.POST("/posts/:id/upvote", controllers.UpvotePostsHandler)
	router.POST("/posts/:id/downvote", controllers.DownvotePostsHandler)
	router.POST("/posts/:id/comment", controllers.CommentOnPostHandler)

	//notifications
	router.GET("/user/notifications", controllers.GetUserNotificationsHandler)
	router.POST("/user/notifications", controllers.SetUserNotificationsSeenHandler)

	//feed
	router.GET("/feed/private", controllers.GetPrivateFeedHandler)
}
