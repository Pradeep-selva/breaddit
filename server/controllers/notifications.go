package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	entities "github.com/pradeep-selva/Breaddit/server/entities"
	"github.com/pradeep-selva/Breaddit/server/utils"
)

//GET /api/v/user/notifications
func GetUserNotificationsHandler(c *gin.Context) {
	var notifications struct {
		Notifications []entities.Notification
	}
	UID := c.MustGet("UID").(string)

	dsnap, err := utils.Client.Collection("notifications").Doc(UID).Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"data":       map[string]interface{}{},
			"statusCode": http.StatusOK,
		})
		return
	}
	dsnap.DataTo(&notifications)

	c.JSON(http.StatusOK, gin.H{
		"data":       notifications.Notifications,
		"statusCode": http.StatusOK,
	})
}

//POST /api/v/user/notifications
func SetUserNotificationsSeenHandler(c *gin.Context) {
	var notifications struct {
		Notifications []entities.Notification
	}
	UID := c.MustGet("UID").(string)
	notifRef := utils.Client.Collection("notifications").Doc(UID)

	dsnap, err := notifRef.Get(utils.Ctx)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	dsnap.DataTo(&notifications)
	for i := range notifications.Notifications {
		if notifications.Notifications[i].Seen == true {
			continue
		}
		notifications.Notifications[i].Seen = true
	}

	_, err = notifRef.Set(utils.Ctx, notifications)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":      "An error occured.",
			"statusCode": http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       notifications,
		"statusCode": http.StatusOK,
	})
}
