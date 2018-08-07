const bs58 = require('bs58')

const EthCrypto = require('eth-crypto');
const ecc = require('eosjs-ecc');
const eth = require('ethereumjs-util');



// { address: '0x8619bc7ca937A37aE54346A88545edC083cccb2C',
//   privateKey:
//    '0x95040f2b28c185eb630d61665369b3a70e2c2d2819d84aa58998e4a4de9e5899',
//   publicKey:
//    'f5e903db10253350e05a702a7b4c213e79bb1637b711b74109ee9027d741bc555e7edf74aedf04898899a5e78a79085267b9da31996da54f07aae34ed3d5293e' }

const identity = EthCrypto.createIdentity();
console.log(identity);

console.log("######################################  ETH");

const message = 'EOS can handle ETH signatures';
const messageHash = EthCrypto.hash.keccak256(message);

console.log("messageHash:");
console.log(messageHash);
// 0xf994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15

const signature = EthCrypto.sign(
    '0x95040f2b28c185eb630d61665369b3a70e2c2d2819d84aa58998e4a4de9e5899', // privateKey
    messageHash // hash of message
);

console.log('signature:');
console.log(signature);
// 0x388862e1a8e03c0d5012ca201c65c0eaecbe13f7418444e8788cd2f358bf254214d413e7e033d08629cd3a50ed413e947d289e2bedf34a133048b39fa509d7cc1c

const signer = EthCrypto.recoverPublicKey(
    '0x388862e1a8e03c0d5012ca201c65c0eaecbe13f7418444e8788cd2f358bf254214d413e7e033d08629cd3a50ed413e947d289e2bedf34a133048b39fa509d7cc1c', // signature
    '0xf994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15' // message hash
);
console.log('signer:');
console.log(signer);

console.log("######################################   EOS");

// const messageHash2 = Buffer.from('f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15', 'hex');
const eos_sig2 = ecc.sign(message, "5JwuzTsHk4cN2Pekt8vsBWyGZqSGVAefw6QFLH31pxCzpq9jEdd", 'hex');
const eos_sig = ecc.signHash('f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15', "5JwuzTsHk4cN2Pekt8vsBWyGZqSGVAefw6QFLH31pxCzpq9jEdd", 'hex');
console.log("eos_sig:");
console.log(eos_sig);

const p = Buffer.from('388862e1a8e03c0d5012ca201c65c0eaecbe13f7418444e8788cd2f358bf254214d413e7e033d08629cd3a50ed413e947d289e2bedf34a133048b39fa509d7cc1c', 'hex');
const pp = "SIG_K1_" + bs58.encode(p);
// const pp = p.toString('base58');
console.log(pp);
console.log(p.length);
const ms = Buffer.from('f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15', 'hex');
const e = ecc.recover(eos_sig2, ms);
console.log(e);

// const ecc = require('eosjs-ecc');

// // "EOS8k4wDWyrq9yPUL17YKqThf5F5VVMs5c8diRZQfGKG9698dd6na",
// // "5JPiMk1mJx3VLsBaSbNUxhMrMdxrFjR8VPpFPM8fikp4Mtu6CpE"

// const messageHash2 = Buffer.from('f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15', 'hex');
// console.log(messageHash2.length);
// console.log(messageHash2);

// const eos_sig = ecc.signHash(messageHash2, "5JPiMk1mJx3VLsBaSbNUxhMrMdxrFjR8VPpFPM8fikp4Mtu6CpE");
// console.log("eos_sig:");
// console.log(eos_sig);
// // SIG_K1_KkV5waMZ8LWasWUWRUsB2gnijVGgsT2vfdNNvXuHL9i1xWtof1jXnnGYheDyscZiPxad5triTzF85nZgSnXY4Qw8axPXyP

// const p = Buffer.from('388862e1a8e03c0d5012ca201c65c0eaecbe13f7418444e8788cd2f358bf254214d413e7e033d08629cd3a50ed413e947d289e2bedf34a133048b39fa509d7cc1c', 'hex');
// const pp = "SIG_K1_" + bs58.encode(p);
// // const pp = p.toString('base58');
// console.log(pp);

// const ms = Buffer.from('f994cb4eec41aac621f0618bdd498c0c529dcf7c86e31e66d953f4b6d4299d15', 'hex');
// const e = ecc.recover(pp, ms);
// console.log(e);

// EOS Private Key: 5JwuzTsHk4cN2Pekt8vsBWyGZqSGVAefw6QFLH31pxCzpq9jEdd
// EOS Public Key: EOS6knoMaegPrRuE2b6uNRkkXRkpRGWx2rnaxHcyJkHrfrrv5rQEi


// let ethereumPrivateKey = '95040f2b28c185eb630d61665369b3a70e2c2d2819d84aa58998e4a4de9e5899';

// if(eth.isValidPrivate(Buffer.from(ethereumPrivateKey, 'hex'))) {
// 	let ethereumAddress = '0x' + eth.privateToAddress(Buffer.from(ethereumPrivateKey, 'hex')).toString('hex')
// 	let ethereumPublicKey = eth.privateToPublic(Buffer.from(ethereumPrivateKey, 'hex')).toString('hex')

// 	// Create EOS keys
// 	let eosWIF = ecc.PrivateKey(Buffer.from(ethereumPrivateKey, 'hex')).toWif()
// 	let convertedEOSPrivateKey = eosWIF
// 	let convertedEOSPublicKey = ecc.privateToPublic(eosWIF)

// 	console.log(`EOS Private Key: ${convertedEOSPrivateKey}`)
// 	console.log(`EOS Public Key: ${convertedEOSPublicKey}`)
// } else {
// 	console.log("Invalid Ethereum Private Key")
// }