package helper

import (
	"math/rand"
	"time"
)

type generator struct{}

var Generator generator

func (g generator) BookingCode(length int) string {
	var letterRunes = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
	return g.generateString(letterRunes, length)
}

func (g generator) Passcode(length int) string {
	var letterRunes = []rune("0123456789")
	return g.generateString(letterRunes, length)
}

func (g generator) GenerateToken(length int) string {
	var letterRunes = []rune("!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
	return g.generateString(letterRunes, length)
}

func (g generator) generateString(allowedChars []rune, length int) string {
	randomStr := make([]rune, length)
	rand.Seed(time.Now().UnixNano())
	for i := range randomStr {
		randomStr[i] = allowedChars[rand.Intn(len(allowedChars))]
	}
	return string(randomStr)

}
