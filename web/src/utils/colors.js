export const hashHsl = (str) => {
  let h = 0; for (let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i))>>>0;
  return `hsl(${h%360},70%,50%)`;
};