package helper

import (
	"reflect"

	"github.com/Sirupsen/logrus"
)

func HasElem(e interface{}, arr interface{}) bool {
	arrVal := reflect.ValueOf(arr)
	if arrVal.Kind() != reflect.Slice {
		logrus.Error("Params must contains an array.")
		return false
	}

	for i := 0; i < arrVal.Len(); i++ {
		if arrVal.Index(i).Interface() == e {
			return true
		}
	}

	return false
}
