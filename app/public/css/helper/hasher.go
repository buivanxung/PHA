package helper

import (
	"crypto/md5"
	"fmt"
)

type hasher struct{}

var Hasher hasher

func (h hasher) MD5(strToHash string) string {
	hasher := md5.New()
	realStringHashed := []byte(strToHash)
	hasher.Write(realStringHashed)
	return fmt.Sprintf("%x", hasher.Sum(nil))
}
