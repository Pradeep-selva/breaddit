package utils

var Version string = "v1"

func GetRouteWithVersion(route string) string {
	return "/" + Version + route
}

func ArrayContains(array []string, item string) bool {
	for _,v := range array {
		if v == item{
			return true
		}
	}
	return false
}

func MapContains(_map map[string]string, item string) string {
	for k,v := range _map {
		if v == item {
			return k
		}
	}
	return ""
}