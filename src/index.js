const bs58 = require("bs58");
const jsonld = require("jsonld");

const createVerifyData = require("./createVerifyData");
const suite = require("./suite");

const verify = async ({ data, publicKey }) => {
  const [expanded] = await jsonld.expand(data);
  const framed = await jsonld.compact(
    expanded,
    "https://w3id.org/security/v2",
    { skipExpansion: true }
  );
  const verifyDataHexString = await createVerifyData(framed, data.proof);
  const verifyDataBuffer = Buffer.from(verifyDataHexString, "hex");
  const verifyDataUint8Array = new Uint8Array(
    verifyDataBuffer.buffer,
    verifyDataBuffer.offset,
    verifyDataBuffer.length
  );
  return suite.verify({
    verifyData: verifyDataUint8Array,
    signature: framed.proof.jws,
    publicKey: bs58.decode(publicKey)
  });
};

const sign = async ({ data, privateKey, signatureOptions }) => {
  if (signatureOptions.creator) {
    signatureOptions.verificationMethod = signatureOptions.creator;
  }
  if (!signatureOptions.verificationMethod) {
    throw new Error("signatureOptions.verificationMethod is required");
  }

  if (!signatureOptions.created) {
    signatureOptions.created = new Date().toISOString();
  }

  signatureOptions.type = "Ed25519Signature2018";

  const [expanded] = await jsonld.expand(data);
  const framed = await jsonld.compact(
    expanded,
    "https://w3id.org/security/v2",
    { skipExpansion: true }
  );
  const verifyDataHexString = await createVerifyData(framed, signatureOptions);
  const verifyDataBuffer = Buffer.from(verifyDataHexString, "hex");
  const verifyDataUint8Array = new Uint8Array(
    verifyDataBuffer.buffer,
    verifyDataBuffer.offset,
    verifyDataBuffer.length
  );
  const jws = await suite.sign({
    verifyData: verifyDataUint8Array,
    privateKey: bs58.decode(privateKey)
  });
  const documentWithProof = {
    ...framed,
    proof: {
      ...signatureOptions,
      jws
    }
  };
  return documentWithProof;
};

module.exports = {
  sign,
  verify
};
