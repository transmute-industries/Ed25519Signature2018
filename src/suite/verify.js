const chloride = require("chloride");

const { decode } = require("../encoding");

const { createJws } = require("./utils");

const verifyJWSHeader = header => {
  if (
    !(
      header.alg === "EdDSA" &&
      header.b64 === false &&
      Array.isArray(header.crit) &&
      header.crit.length === 1 &&
      header.crit[0] === "b64"
    ) &&
    Object.keys(header).length === 3
  ) {
    throw new Error(`Invalid JWS header parameters for Ed25519Signature2018.`);
  }
};

module.exports = async ({ verifyData, signature, publicKey }) => {
  const [encodedHeader, encodedSignature] = signature.split("..");
  const decodedHeader = JSON.parse(
    String.fromCharCode.apply(null, decode(encodedHeader))
  );
  verifyJWSHeader(decodedHeader);
  const decodedSignature = Buffer.from(decode(encodedSignature));
  const uint8ArrayJws = createJws({
    encodedHeader,
    verifyData
  });
  return chloride.crypto_sign_verify_detached(
    Buffer.from(
      decodedSignature.buffer,
      decodedSignature.byteOffset,
      decodedSignature.length
    ),
    Buffer.from(
      uint8ArrayJws.buffer,
      uint8ArrayJws.byteOffset,
      uint8ArrayJws.length
    ),
    publicKey
  );
};
