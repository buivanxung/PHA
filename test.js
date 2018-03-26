var data = 'e0120000'.match(/../g);

// Create a buffer
var buf = new ArrayBuffer(4);
// Create a data view of it
var view = new DataView(buf);

// set bytes
data.forEach(function (b, i) {
    view.setUint8(i, parseInt(b, 16));
});

// get an int32 with little endian
var num = view.getInt32(0, 1);
 console.log(parseInt("60", 16) | 0);
//console.log(Buffer.from('3c0000', 'hex').readInt32LE());
var phyPayload = "e0120000000000000";
var str = "";
for (i  = 0; i < 8; i ++) {
  str +=phyPayload[i];
}
console.log(hextoLSB("3c000000"));

function hextoLSB (str) {
  return Buffer.from(str, 'hex').readInt32LE();
}
