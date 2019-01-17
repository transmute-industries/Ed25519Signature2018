const bs58 = require("bs58");

const fixtures = require("../../__tests__/__fixtures__");

const { sign, verify } = require("../index");

const {
  privateKeyBase58,
  publicKeyBase58
} = fixtures.keypairs.alice.Ed25519VerificationKey2018;

const privateKey = bs58.decode(privateKeyBase58);
const publicKey = bs58.decode(publicKeyBase58);

describe("primitive", () => {
  it("sign", async () => {
    const verifyData = Buffer.from("hello");
    const encodedSignature = await sign({
      verifyData,
      privateKey
    });
    const verified = await verify({
      verifyData,
      signature: encodedSignature,
      publicKey
    });
    expect(verified).toBe(true);
  });
});
