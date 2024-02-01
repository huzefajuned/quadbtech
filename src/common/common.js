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
