const jsigs = require("jsonld-signatures");
const jsonld = require("jsonld");

const fixtures = require("./__fixtures__");

const { Ed25519Signature2018, RsaSignature2018 } = jsigs.suites;
const { AuthenticationProofPurpose, AssertionProofPurpose } = jsigs.purposes;

const { RSAKeyPair, Ed25519KeyPair } = jsigs;

// create the JSON-LD document that should be signed
const doc = {
  "@context": {
    schema: "http://schema.org/",
    action: "schema:action"
  },
  action: "AuthenticateMe"
};

describe("jsonld-signatures", () => {
  it("RsaSignature2018", async () => {
    const toBeSigned = { ...doc };
    const signed = await jsigs.sign(toBeSigned, {
      suite: new RsaSignature2018({
        key: new RSAKeyPair({
          publicKeyPem:
            fixtures.publicKeys.alice.RsaVerificationKey2018.publicKeyPem,
          id: fixtures.publicKeys.alice.RsaVerificationKey2018.id,
          privateKeyPem:
            fixtures.keypairs.alice.RsaVerificationKey2018.privateKeyPem
        })
      }),
      purpose: new AssertionProofPurpose()
    });

    const compacted = await jsonld.compact(
      signed,
      "https://w3id.org/security/v2",
      "http://schema.org/action"
    );

    expect(compacted.proof.type).toBe("RsaSignature2018");

    const result = await jsigs.verify(compacted, {
      documentLoader: fixtures.testLoader,
      suite: new RsaSignature2018({
        publicKeyPem:
          fixtures.publicKeys.alice.RsaVerificationKey2018.publicKeyPem
      }),
      purpose: new AssertionProofPurpose({
        controller: fixtures.controllers.alice.RsaVerificationKey2018
      })
    });
    expect(result.verified).toBe(true);
  });

  it("Ed25519Signature2018", async () => {
    const toBeSigned = { ...doc };
    const signed = await jsigs.sign(toBeSigned, {
      suite: new Ed25519Signature2018({
        documentLoader: fixtures.testLoader,
        verificationMethod:
          fixtures.publicKeys.alice.Ed25519VerificationKey2018.id,
        key: new Ed25519KeyPair({
          privateKeyBase58:
            fixtures.keypairs.alice.Ed25519VerificationKey2018.privateKeyBase58
        })
      }),
      purpose: new AuthenticationProofPurpose({
        challenge: "abc",
        domain: "example.com"
      })
    });

    const compacted = await jsonld.compact(
      signed,
      "https://w3id.org/security/v2",
      "http://schema.org/action"
    );

    expect(compacted.proof.type).toBe("Ed25519Signature2018");

    const result = await jsigs.verify(compacted, {
      documentLoader: fixtures.testLoader,
      suite: new Ed25519Signature2018({
        key: new Ed25519KeyPair(
          fixtures.publicKeys.alice.Ed25519VerificationKey2018
        )
      }),
      purpose: new AuthenticationProofPurpose({
        controller: fixtures.controllers.alice.Ed25519VerificationKey2018,
        challenge: "abc",
        domain: "example.com"
      })
    });
    expect(result.verified).toBe(true);
    // console.log(JSON.stringify(compacted, null, 2));
  });
});
