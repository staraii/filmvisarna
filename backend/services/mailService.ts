import nodemailer from "nodemailer";
import screeningsService from "./screeningsService.js";
import QRCode from "qrcode";
import { google } from "googleapis";

export default class MailService {
  public oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, // Your client ID
    process.env.CLIENT_SECRET, // Your client secret
    "https://developers.google.com/oauthplayground" // Your redirect URI
  );

  public async createTransporter() {
    this.oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken = await this.oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail SMTP service shorthand
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL, // Your Gmail address
        clientId: process.env.CLIENT_ID, // Your Gmail API Client ID
        clientSecret: process.env.CLIENT_SECRET, // Your Gmail API Client Secret
        refreshToken: process.env.REFRESH_TOKEN, // Your Gmail API Refresh Token
        accessToken: accessToken.token, // Use the fetched access token
      },
      secure: true, // Use SSL (secure) connection
    } as nodemailer.TransportOptions);
    return transporter;
  }
  public async sendMail(bookingNumber: string) {
    const data = await screeningsService.getBookingsByBookingNumber(
      bookingNumber
    );
    console.log(data);
    const bookingData = data[0];

    const date = new Date(bookingData.screeningTime);
    const qrCodeDataURL = await QRCode.toDataURL(bookingNumber);

    const transporter = await this.createTransporter();

    const info = await transporter.sendMail({
      from: '"Filmvisarna" <Filmvisarna@hotmail.com>', // sender addresss
      to: bookingData.email, // lägg in bokningsmailen här
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
      html: `<b><h2>Tack för din bokning!</h2> <p>Bokningsnummer: ${bookingNumber}</p><p>Film: ${
        bookingData.movieTitle
      }</p><p>Datum: ${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}</p><p>Tid: ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}</p><p>Platsnummer: ${
        bookingData.seats
      }</p> </b><img src='cid:qrcode'/>`, // html body
    });
    return "Message sent:%s" + info.messageId;
  }
}
