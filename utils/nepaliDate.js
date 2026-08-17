export function toNepaliDigits(num) {
  const nepaliMap = {
    "0": "\u0966",
    "1": "\u0967",
    "2": "\u0968",
    "3": "\u0969",
    "4": "\u096A",
    "5": "\u096B",
    "6": "\u096C",
    "7": "\u096D",
    "8": "\u096E",
    "9": "\u096F"
  };
  return String(num).split("").map((char) => nepaliMap[char] || char).join("");
}
export function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}
export function getFormattedNepaliTime(date) {
  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  let period = "\u092C\u093F\u0939\u093E\u0928";
  if (hours >= 12 && hours < 16) {
    period = "\u0926\u093F\u0909\u0901\u0938\u094B";
  } else if (hours >= 16 && hours < 20) {
    period = "\u0938\u093E\u0901\u091D";
  } else if (hours >= 20 || hours < 4) {
    period = "\u0930\u093E\u0924\u093F";
  }
  const hours12 = hours % 12 || 12;
  const formattedHours = padZero(hours12);
  const nepHours = toNepaliDigits(formattedHours);
  const nepMinutes = toNepaliDigits(minutes);
  const nepSeconds = toNepaliDigits(seconds);
  return `${nepHours} : ${nepMinutes} : ${nepSeconds} ${period}`;
}
export function getFormattedBikramSambatDate() {
  const nepaliDays = ["\u0906\u0907\u0924\u092C\u093E\u0930", "\u0938\u094B\u092E\u092C\u093E\u0930", "\u092E\u0919\u094D\u0917\u0932\u092C\u093E\u0930", "\u092C\u0941\u0927\u092C\u093E\u0930", "\u092C\u093F\u0939\u0940\u092C\u093E\u0930", "\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930", "\u0936\u0928\u093F\u092C\u093E\u0930"];
  const nepaliMonths = [
    "\u0935\u0948\u0936\u093E\u0916",
    "\u091C\u0947\u0920",
    "\u0905\u0938\u093E\u0930",
    "\u0936\u094D\u0930\u093E\u0935\u0923",
    "\u092D\u0926\u094C",
    "\u0905\u0938\u094B\u091C",
    "\u0915\u093E\u0930\u094D\u0924\u093F\u0915",
    "\u092E\u0902\u0938\u093F\u0930",
    "\u092A\u0941\u0937",
    "\u092E\u093E\u0918",
    "\u092B\u093E\u0917\u0941\u0928",
    "\u091A\u0948\u0924"
  ];
  const now = /* @__PURE__ */ new Date();
  const dayName = nepaliDays[now.getDay()];
  const bsYear = now.getFullYear() + 57;
  const monthIndex = (now.getMonth() + 3) % 12;
  const monthName = nepaliMonths[monthIndex];
  const dayNum = (now.getDate() + 15) % 30 || 1;
  return `\u0935\u093F \u0938\u0902 ${toNepaliDigits(bsYear)} ${monthName} ${toNepaliDigits(dayNum)} ${dayName}`;
}
