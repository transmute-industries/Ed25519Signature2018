const fixtures = require("./__fixtures__");

const { verify } = require("../index");

describe("can-verify-jsonld-signatures", () => {
  it("Ed25519Signature2018", async () => {
    const verified = await verify({
      data: fixtures.signed.Ed25519Signature2018,
      publicKey:
        fixtures.publicKeys.alice.Ed25519VerificationKey2018.publicKeyBase58
    });
    expect(verified).toBe(true);
  });
});
