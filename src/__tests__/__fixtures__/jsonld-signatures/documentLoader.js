const identityv1 = require("../contexts/identity-v1.json");
const didv1 = require("../contexts/did-v1.json");
const didv1_1 = require("../contexts/did-v1_1.json");
const securityv1 = require("../contexts/security-v1.json");
const securityv2 = require("../contexts/security-v2.json");

const publicKeys = require("./publicKeys");

const getDoc = url => {
  // console.log(url);
  switch (url) {
    case "https://w3id.org/identity/v1":
      return identityv1;
    case "https://w3id.org/did/v1":
      return didv1;
    case "https://w3id.org/did/v0.11":
      return didv1_1;
    case "https://w3id.org/security/v1":
      return securityv1;
    case "https://w3id.org/security/v2":
      return securityv2;
    case "https://example.com/i/alice/keys/1":
      return publicKeys.alice.RsaVerificationKey2018;
    case "https://example.com/i/alice/keys/2":
      return publicKeys.alice.Ed25519VerificationKey2018;
  }
};

module.exports = url => {
  return {
    contextUrl: null,
    document: getDoc(url),
    documentUrl: url
  };
};
