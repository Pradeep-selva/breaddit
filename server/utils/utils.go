package utils

var Version string = "v1"

func GetRouteWithVersion(route string) string {
	return "/" + Version + route
}
