package helper

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/Sirupsen/logrus"
	"github.com/micrypt/go-plivo/plivo"
	sendgrid "github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type email struct{}

var Email email

func ParseTemplate(templateFileName string, passcode, barcode, userType string) string {
	b, err := ioutil.ReadFile(templateFileName) // just pass the file name
	if err != nil {
		fmt.Print(err)
	}
	str := strings.Replace(string(b), "{{.passcode}}", passcode, 1)
	str = strings.Replace(str, "{{.userType}}", userType, 1)
	return strings.Replace(str, "{{.barcode}}", barcode, 1)
}

func SendSMSToCustomer(receivernumberPhone string, barcode, passcode string) {
	logrus.Info("Sending SMS to: ", receivernumberPhone)
	authID := "MAZWM3ZDFMNWE3MZUYNZ"
	authToken := "NTJkOGFhNzdmMDczZDJmZTYyZTJiYWViYjAyNDAw"
	client := plivo.NewClient(nil, authID, authToken)
	acc, _, err := client.Account.Get()
	_, _, err = client.Message.Send(&plivo.MessageSendParams{
		Src:  "14154847489",
		Dst:  receivernumberPhone,
		Text: "Ma don hang tu Giao Hang Nhanh: #" + barcode + ". Ma so mo tu cua ban la: " + passcode + ". Dia chi: 147 Ton Dat Tien, P. Tan Phong, Q.7, HCM",
	})
	if err != nil {
		logrus.Info("AccountGet failed: %v", err)
	} else {
		logrus.Info("Account: %v\n", acc)
	}
}

func (e email) SendPasscodeToCustomer(receivernumberPhone, receiverEmail string, barcode, passcode string) error {
	logrus.Info("Sending email to: ", receiverEmail)
	from := mail.NewEmail("Smart Locker", "locker@locker.com")
	subject := "Đơn đặt hàng của bạn với Giao Hang Nhanh " + barcode
	to := mail.NewEmail("", receiverEmail)
	plainTextContent := fmt.Sprintf("Locker - GHN")
	htmlContent := fmt.Sprintf(ParseTemplate("html/template.html", barcode, passcode, "khách hàng"))
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient("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")
	// client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		logrus.Error(err)
		return err
	}
	//SendSMSToCustomer(receivernumberPhone, passcode, barcode)
	logrus.Info(response.StatusCode)
	logrus.Info(response.Body)
	logrus.Info(response.Headers)

	return nil
}

func (e email) SendPasscodeToCourier(receiverEmail string, barcode, passcode string) error {
	logrus.Info("Sending email to: ", receiverEmail)
	from := mail.NewEmail("Smart Locker", "locker@locker.com")
	subject := "Smart Locker thông báo đơn đặt tủ " + barcode
	to := mail.NewEmail("", receiverEmail)
	plainTextContent := fmt.Sprintf("Locker - GHN")
	htmlContent := fmt.Sprintf(ParseTemplate("html/template.html", barcode, passcode, "người giao hàng"))
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	// client := sendgrid.NewSendClient("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")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		logrus.Error(err)
		return err
	}
	logrus.Info(response.StatusCode)
	logrus.Info(response.Body)
	logrus.Info(response.Headers)

	return nil
}

func (e email) SendPasscodeToUrgent(receiverEmail string, barcode, passcode string) error {
	logrus.Info("Sending email to: ", receiverEmail)
	from := mail.NewEmail("Smart Locker", "locker@locker.com")
	subject := "Smart Locker thông báo mã số mở tủ khẩn cấp cho đơn đặt tủ " + barcode
	to := mail.NewEmail("", receiverEmail)
	plainTextContent := fmt.Sprintf("Locker - GHN")
	htmlContent := fmt.Sprintf(ParseTemplate("html/template.html", barcode, passcode, "quản trị viên"))
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	// client := sendgrid.NewSendClient("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")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		logrus.Error(err)
		return err
	}
	logrus.Info(response.StatusCode)
	logrus.Info(response.Body)
	logrus.Info(response.Headers)

	return nil
}
