export const generateRandomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
  const charsLength = chars.length;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  console.log("password: ", randomString);
  return randomString;
};
