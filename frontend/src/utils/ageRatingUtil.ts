export function ageRatingUtil(age: string) {
  if (!/^(?:1|7|11|15)$/.test(age)) {
    return;
  }
  if (age === "1") { return "Barntillåten" }
  if (age === "7") { return "7+" }
  if (age === "11") { return "11+" }
  if(age === "15"){ return "15+"}
}

export function ageRatingFilterUtil(age: string) {
  if (!/^(?:1|7|11|15)$/.test(age)) {
    return;
  }
  if (age === "1") { return "Barntillåten" }
  if (age === "7") { return "Från 7 år" }
  if (age === "11") { return "Från 11 år" }
  if(age === "15") { return "Från 15 år"}
}