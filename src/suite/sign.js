const chloride = require("chloride");
const { encode } = require("../encoding");

const { createJws } = require("./utils");

module.exports = async ({ verifyData, privateKey }) => {
  const header = {
    alg: "EdDSA",
    b64: false,
    crit: ["b64"]
  };
  const encodedHeader = encode(JSON.stringify(header));
  const uint8ArrayJws = createJws({ encodedHeader, verifyData });
  const signature = chloride.crypto_sign_detached(
    Buffer.from(
      uint8ArrayJws.buffer,
      uint8ArrayJws.byteOffset,
      uint8ArrayJws.length
    ),
    privateKey
  );
  const encodedSignature = encode(signature);
  return encodedHeader + ".." + encodedSignature;
};
