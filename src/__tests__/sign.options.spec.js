const fixtures = require("./__fixtures__");

const { sign, verify } = require("../index");

describe("Ed25519Signature2018", () => {
  it("supports legacy creator attribute", async () => {
    expect.assertions(1);
    const signed = await sign({
      data: fixtures.data.authentication.plain,
      signatureOptions: {
        created: "2019-01-16T20:13:10Z",
        challenge: "abc",
        domain: "example.com",
        proofPurpose: "authentication",
        creator: "https://example.com/i/alice/keys/2"
      },
      privateKey:
        fixtures.keypairs.alice.Ed25519VerificationKey2018.privateKeyBase58
    });
    expect(signed.proof.creator).toBe("https://example.com/i/alice/keys/2");
  });

  it("supports automatic created, nonce", async () => {
    expect.assertions(2);
    const signed = await sign({
      data: fixtures.data.authentication.plain,
      signatureOptions: {
        challenge: "abc",
        domain: "example.com",
        proofPurpose: "authentication",
        creator: "https://example.com/i/alice/keys/2"
      },
      privateKey:
        fixtures.keypairs.alice.Ed25519VerificationKey2018.privateKeyBase58
    });
    expect(signed.proof.created).toBeDefined();
    expect(signed.proof.nonce).toBeDefined();
    // console.log(JSON.stringify(signed, null ,2))
  });
});
