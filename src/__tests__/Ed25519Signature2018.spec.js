const fixtures = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("Ed25519Signature2018", () => {
  it(
    "can sign and verify",
    async () => {
      const signed = await sign({
        data: fixtures.data.authentication.plain,
        signatureOptions: {
          type: "Ed25519Signature2018",
          created: "2019-01-16T20:13:10Z",
          challenge: "abc",
          domain: "example.com",
          proofPurpose: "authentication",
          verificationMethod: "https://example.com/i/alice/keys/2"
        },
        privateKey:
          fixtures.keypairs.alice.Ed25519VerificationKey2018.privateKeyBase58
      });

      // console.log(JSON.stringify(signed, null ,2))
      const verified = await verify({
        data: signed,
        publicKey:
          fixtures.keypairs.alice.Ed25519VerificationKey2018.publicKeyBase58
      });

      expect(verified).toBe(true);
    },
    10 * 1000
  );
});
