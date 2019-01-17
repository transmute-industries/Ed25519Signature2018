const createJws = ({ encodedHeader, verifyData }) => {
  const buffer = Buffer.concat([
    Buffer.from(encodedHeader + ".", "utf8"),
    Buffer.from(verifyData.buffer, verifyData.byteOffset, verifyData.length)
  ]);
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
};

module.exports = {
  createJws
};
