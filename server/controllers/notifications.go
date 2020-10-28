package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

func GetUserNotificationsHandler(c *gin.Context) {
	var notifications entities.Notification
	UID := c.MustGet("UID").(string)

	dsnap, err := utils.Client.Collection("notifications").Doc(UID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"data": map[string]interface{}{},
			"statusCode": http.StatusOK,
		})
		return
	}
	dsnap.DataTo(&notifications)

	c.JSON(http.StatusOK, gin.H{
		"data": notifications,
		"statusCode": http.StatusOK,
	})
}