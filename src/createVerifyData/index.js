const jsonld = require("jsonld");
const crypto = require("crypto");

const canonize = async data => {
  return jsonld.canonize(data);
};

const sha256 = data => {
  const h = crypto.createHash("sha256");
  h.update(data);
  return h.digest("hex");
};

const cannonizeSignatureOptions = signatureOptions => {
  let _signatureOptions = {
    ...signatureOptions,
    "@context": "https://w3id.org/security/v2"
  };
  delete _signatureOptions.jws;
  delete _signatureOptions.signatureValue;
  delete _signatureOptions.proofValue;
  return canonize(_signatureOptions);
};

const cannonizeDocument = doc => {
  let _doc = { ...doc };
  delete _doc["proof"];
  return canonize(_doc);
};

const createVerifyData = async (data, signatureOptions) => {
  const cannonizedSignatureOptions = await cannonizeSignatureOptions(
    signatureOptions
  );
  const hashOfCannonizedSignatureOptions = sha256(cannonizedSignatureOptions);
  const cannonizedDocument = await cannonizeDocument(data);
  const hashOfCannonizedDocument = sha256(cannonizedDocument);
  return hashOfCannonizedSignatureOptions + hashOfCannonizedDocument;
};

module.exports = createVerifyData;
