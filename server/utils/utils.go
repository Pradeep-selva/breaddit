package utils

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

var Version string = "v1"

func GetRouteWithVersion(route string) string {
	return "/" + Version + route
}

func ArrayContains(array []string, item string) bool {
	for _, v := range array {
		if v == item {
			return true
		}
	}
	return false
}

func MapContains(_map map[string]string, item string) string {
	for k, v := range _map {
		if v == item {
			return k
		}
	}
	return ""
}

func FindInArray(array []string, item string) int {
	for i, v := range array {
		if v == item {
			return i
		}
	}
	return -1
}

func RemoveArrayElement(array []string, index int) []string {
	return append(array[:index], array[index+1:]...)
}

func GetLimitAndOffset(c *gin.Context) (int, int) {
	limit, _ := strconv.Atoi(c.Request.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(c.Request.URL.Query().Get("offset"))

	if limit == 0 {
		limit = 10
	}

	return limit, offset
}