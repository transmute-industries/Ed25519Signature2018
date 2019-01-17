const keypairs = require("./keypairs");

module.exports = {
  alice: {
    RsaVerificationKey2018: {
      "@context": "https://w3id.org/security/v2",
      type: "RsaVerificationKey2018",
      id: "https://example.com/i/alice/keys/1",
      controller: "https://example.com/i/alice",
      publicKeyPem: keypairs.alice.RsaVerificationKey2018.publicKeyPem
    },
    Ed25519VerificationKey2018: {
      "@context": "https://w3id.org/security/v2",
      type: "Ed25519VerificationKey2018",
      id: "https://example.com/i/alice/keys/2",
      controller: "https://example.com/i/alice",
      publicKeyBase58: keypairs.alice.Ed25519VerificationKey2018.publicKeyBase58
    }
  }
};
