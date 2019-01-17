const publicKeys = require("./publicKeys");

module.exports = {
  alice: {
    RsaVerificationKey2018: {
      "@context": "https://w3id.org/security/v2",
      id: "https://example.com/i/alice",
      publicKey: [publicKeys.alice.RsaVerificationKey2018],
      assertionMethod: [publicKeys.alice.RsaVerificationKey2018.id]
    },
    Ed25519VerificationKey2018: {
      "@context": "https://w3id.org/security/v2",
      id: "https://example.com/i/alice",
      publicKey: [publicKeys.alice.Ed25519VerificationKey2018],
      assertionMethod: [publicKeys.alice.Ed25519VerificationKey2018.id],
      authentication: [publicKeys.alice.Ed25519VerificationKey2018.id]
    }
  }
};
