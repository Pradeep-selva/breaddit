package controllers

import (
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"

	entities "github.com/pradeep-selva/Breaddit/server/entities"
	utils "github.com/pradeep-selva/Breaddit/server/utils"
)

func SignUpHandler(c *gin.Context) {
	var body entities.UserCredentials
	c.ShouldBindBodyWith(&body, binding.JSON)
	log.Println(body.UserName)

	_, err := utils.Client.Collection("auth").Doc(body.UserName).Get(utils.Ctx)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Account with specified username already exists!",
			"statusCode": http.StatusBadRequest,
		})
		return 
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "An error occured!",
			"statusCode": http.StatusInternalServerError,
		})
		return 
	}

	body.Password = string(hashedPassword)

	_, err = utils.Client.Collection("auth").Doc(body.UserName).Set(utils.Ctx, map[string]interface{}{
		"email": body.Email,
		"password": body.Password,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "An error occured!",
			"statusCode": http.StatusBadRequest,
		})
		return 
	}


	c.JSON(http.StatusOK, gin.H{
		"data": body,
		"statusCode": http.StatusOK,
	})
}