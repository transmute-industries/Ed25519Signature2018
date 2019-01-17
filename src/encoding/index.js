const base64url = require("base64url");

const encode = data => {
  if (typeof data === "string") {
    return base64url.encode(data);
  }
  return base64url.encode(
    Buffer.from(data.buffer, data.byteOffset, data.length)
  );
};

const decode = data => {
  const buffer = base64url.toBuffer(data);
  return new Uint8Array(buffer.buffer, buffer.offset, buffer.length);
};

module.exports = {
  encode,
  decode
};
