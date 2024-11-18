import nodemailer from "nodemailer";
import screeningsService from "./screeningsService.js";
import QRCode from "qrcode";

export default class MailService {
  public transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    //https://ethereal.email/ för att få user och pass,
    auth: {
      user: "dejuan.watsica63@ethereal.email",
      pass: "yyswt43ywu57ScYYHy",
    },
  });

  public async sendMail(bookingNumber: string) {
    const data = await screeningsService.getBookingsByBookingNumber(
      bookingNumber
    );
    console.log(data);
    const bookingData = data[0];

    const date = new Date(bookingData.screeningTime);
    const qrCodeDataURL = await QRCode.toDataURL(bookingNumber);
    

    const info = await this.transporter.sendMail({
      from: '"Filmvisarna" <Filmvisarna@hotmail.com>', // sender addresss
      to: "dejuan.watsica63@ethereal.email", // list of receivers
      subject: "Filmvisarna bokning", // Subject line
      text: `Bokningsid:${bookingNumber} `, // plain text body
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeDataURL.split("base64,")[1],
          encoding: "base64",
          cid: "qrcode",
        },
      ],
      html: `<b><h2>Tack för din bokning!</h2> <p>Bokningsnummer: ${bookingNumber}</p><p>Film: ${bookingData.movieTitle}</p><p>Datum: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}</p><p>Tid: ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}</p><p>Platsnummer: ${bookingData.seats}</p> </b><img src='cid:qrcode'/>`, // html body
    });
    return "Message sent:%s" + info.messageId;
  }
}
