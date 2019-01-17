const bs58 = require("bs58");

const createVerifyData = require("./createVerifyData");
const suite = require("./suite");

const verify = async ({ data, publicKey }) => {
  const { framed, verifyDataHexString } = await createVerifyData(
    data,
    data.proof
  );
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
  const { framed, verifyDataHexString } = await createVerifyData(
    data,
    signatureOptions
  );
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
