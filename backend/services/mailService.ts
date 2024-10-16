import nodemailer from "nodemailer";

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

  public async sendMail(data: any) {
    //skapa ny gmail, aktivera 2fa, "@nånting" passphrase, erik o kim vet mer.
    //send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: '"Filmvisarna" <Filmvisarna@hotmail.com>', // sender address
      to: "dejuan.watsica63@ethereal.email", // list of receivers
      subject: "Filmvisarna bokning", // Subject line
      text: `Bokningsid:${data[0].bookingNumber} `, // plain text body
      html: `<b><h2>Tack för din bokning!</h2> <p>Bokningsnummer: ${data[0].bookingNumber}</p><p>Film: ${data[0].movieTitle}</p><p>Datum: ${data[0].screeningTime}</p> </b>`, // html body
    });
    return "Message sent:%s" + info.messageId;
  }
}
