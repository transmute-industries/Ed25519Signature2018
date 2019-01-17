const chloride = require("chloride");
const bs58 = require("bs58");
const fixtures = require("../../__tests__/__fixtures__");

describe("chloride", () => {
  it("sign and verify", () => {
    const {
      privateKeyBase58,
      publicKeyBase58
    } = fixtures.keypairs.alice.Ed25519VerificationKey2018;
    const privateKey = bs58.decode(privateKeyBase58);
    const publicKey = bs58.decode(publicKeyBase58);
    const data = Buffer.from("hello");
    const signature = chloride.crypto_sign_detached(
      Buffer.from(data.buffer, data.byteOffset, data.length),
      privateKey
    );
    const verified = chloride.crypto_sign_verify_detached(
      Buffer.from(signature.buffer, signature.byteOffset, signature.length),
      Buffer.from(data.buffer, data.byteOffset, data.length),
      publicKey
    );
    expect(verified).toBe(true);
  });
});
