const assert = require('node:assert/strict');
const { imageSize } = require('image-size');

function expectFastFailure(name, buffer) {
  const startedAt = Date.now();
  assert.throws(() => imageSize(buffer), undefined, `${name} should be rejected`);
  assert.ok(Date.now() - startedAt < 250, `${name} took too long to reject`);
}

const malformedIcns = Buffer.alloc(16);
malformedIcns.write('icns', 0, 'ascii');
malformedIcns.writeUInt32BE(16, 4);
malformedIcns.write('ic07', 8, 'ascii');
malformedIcns.writeUInt32BE(0, 12);

const malformedHeif = Buffer.alloc(24);
malformedHeif.writeUInt32BE(16, 0);
malformedHeif.write('ftyp', 4, 'ascii');
malformedHeif.write('heic', 8, 'ascii');
malformedHeif.writeUInt32BE(0, 16);
malformedHeif.write('meta', 20, 'ascii');

const malformedJxl = Buffer.alloc(24);
malformedJxl.writeUInt32BE(12, 0);
malformedJxl.write('JXL ', 4, 'ascii');
malformedJxl.writeUInt32BE(0, 12);
malformedJxl.write('jxlc', 16, 'ascii');

expectFastFailure('malformed ICNS', malformedIcns);
expectFastFailure('malformed HEIF', malformedHeif);
expectFastFailure('malformed JXL', malformedJxl);

console.log('image-size malformed-image loop guards verified');
