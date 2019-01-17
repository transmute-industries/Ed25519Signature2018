const { encode, decode } = require("../index");
const createJws = ({ encodedHeader, verifyData }) => {
  const buffer = Buffer.concat([
    Buffer.from(encodedHeader + ".", "utf8"),
    Buffer.from(verifyData.buffer, verifyData.byteOffset, verifyData.length)
  ]);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
};

const unint8ArrayData = createJws({
  encodedHeader: "encodedHeader",
  verifyData: Buffer.from("verifyData")
});

const stringData = "hello";

describe("base64url", () => {
  const isReversable = data => {
    const encoded = encode(data);
    const decoded = decode(encoded);
    if (typeof data === "string") {
      expect(String.fromCharCode.apply(null, decoded)).toBe(data);
    } else {
      expect(decoded).toEqual(data);
    }
  };
  describe("string", () => {
    it("encode and decode", () => {
      isReversable(stringData);
    });
  });

  describe("buffer", () => {
    it("encode and decode", () => {
      isReversable(unint8ArrayData);
    });
  });
});
