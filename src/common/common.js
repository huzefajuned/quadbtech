/**
 *
 * @returns  randomId
 * generating random id for everey ticketss
 */
export function generateRandomId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < 20; i++) {
    randomId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomId;
}

/**
 * formatDateWithMonthName
 * @param {*} dateString
 * @returns
 */
export function formatDateWithMonthName(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
