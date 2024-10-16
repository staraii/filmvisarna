export default function generateBookingNumber(): string {
  let newBookingNumber = "";
  const charsAndNumbers = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789"];
  for (const cn of charsAndNumbers) {
    for (let i = 0; i < 3; i++){
      newBookingNumber += (cn.charAt(Math.floor(Math.random() * cn.length)))
    }
  }
  return newBookingNumber;
}