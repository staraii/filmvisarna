import nodemailer from "nodemailer";
import ScreeningsController from "../controller/screeningsController.js";

const screeningsController = new ScreeningsController();

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
    const data = await screeningsController.getBookingsByBookingNumber(
      bookingNumber
    );
    const bookingData = data[0][0];
    const info = await this.transporter.sendMail({
      from: '"Filmvisarna" <Filmvisarna@hotmail.com>', // sender addresss
      to: "dejuan.watsica63@ethereal.email", // list of receivers
      subject: "Filmvisarna bokning", // Subject line
      text: `Bokningsid:${bookingNumber} `, // plain text body
      html: `<b><h2>Tack för din bokning!</h2> <p>Bokningsnummer: ${bookingNumber}</p><p>Film: ${bookingData.movieTitle}</p><p>Datum: ${bookingData.screeningTime}</p><p>Seats: ${bookingData.seats}</p> </b>`, // html body
    });
    return "Message sent:%s" + info.messageId;
  }
}
