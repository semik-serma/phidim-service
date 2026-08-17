export const formatCount = (num) => {
  if (num >= 1e6) {
    const formatted = (num / 1e6).toFixed(2);
    return formatted.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1") + "M";
  }
  if (num >= 1e3) {
    const formatted = (num / 1e3).toFixed(2);
    return formatted.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1") + "k";
  }
  return num.toString();
};
