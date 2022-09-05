export default function genId() {
  let strings =
    "abcdefghijklmnpoqrstuvwxyzABCDEFGGHIJKLMNOPQRSTUVWXYZ1234567890_".split(
      ""
    );
  let length = 16;
  let res = "";
  for (let x = 0; x < length; x++) {
    res += strings[Math.floor(Math.random() * strings.length)];
  }
  return res;
}
