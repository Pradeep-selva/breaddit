package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	jwt "github.com/dgrijalva/jwt-go"
	_aws "github.com/pradeep-selva/Breaddit/server/aws"
)

func IsAuthorized(c *gin.Context) {
	authHeader := strings.Split(c.GetHeader("authorization"), " ")
	if len(authHeader) < 2 {
		sendError(c)
		c.Abort()
		return
	}

	authToken := authHeader[1]
	if authToken != "" {
		token, err := jwt.Parse(authToken, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				sendError(c)
				c.Abort()
				return "", fmt.Errorf("There was an error")
			}
			return []byte(_aws.GetEnvVar("SIGNING_KEY")), nil
		})

		if err != nil {
			sendError(c)
			c.Abort()
			return
		}

		if token.Valid {
			claims, _ := token.Claims.(jwt.MapClaims)
			c.Set("UID", claims["user"].(string))
		} else {
			sendError(c)
			c.Abort()
			return
		}

	} else {
		sendError(c)
		c.Abort()
		return
	}
}

func sendError(c *gin.Context) {
	c.JSON(http.StatusUnauthorized, gin.H{
		"error":      "You are not authorized to be here",
		"statusCode": http.StatusUnauthorized,
	})
}
