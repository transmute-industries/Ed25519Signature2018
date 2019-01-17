const jsigs = require("jsonld-signatures");

const { Ed25519Signature2018 } = jsigs.suites;
const { AuthenticationProofPurpose } = jsigs.purposes;

const { Ed25519KeyPair } = jsigs;

const fixtures = require("./__fixtures__");

describe("can-sign-jsonld-signatures", () => {
  it("Ed25519Signature2018", async () => {
    const result = await jsigs.verify(fixtures.data.authentication.signed, {
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
  });
});
