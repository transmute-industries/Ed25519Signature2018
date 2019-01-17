const fixtures = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("Ed25519Signature2018", () => {
  it("throws when verificationMethod is missing", async () => {
    expect.assertions(1);
    try {
      await sign({
        data: fixtures.data.authentication.plain,
        signatureOptions: {
          type: "Ed25519Signature2018",
          created: "2019-01-16T20:13:10Z",
          challenge: "abc",
          domain: "example.com",
          proofPurpose: "authentication"
        },
        privateKey:
          fixtures.keypairs.alice.Ed25519VerificationKey2018.privateKeyBase58
      });
    } catch (e) {
      expect(e.message).toBe("signatureOptions.verificationMethod is required");
    }
  });
});
