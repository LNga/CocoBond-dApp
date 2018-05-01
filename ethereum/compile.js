const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build'); //Setup du chemin du dossier build

//1.Suppression du contenu du build Folder
fs.removeSync(buildPath);

//2. Lecture des contrats présents dans le contract folder
const cocoPath = path.resolve(__dirname, 'contracts', 'cocoContract.sol');
const source = fs.readFileSync(cocoPath, 'utf8');

//3.Compilation des contrats avec solc
const output = solc.compile(source, 1).contracts;

//4.Ecriture des outputs obtenus dans le build folder
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}

/* Old compile script Version
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const cocoPath = path.resolve(__dirname, 'contracts', 'cocoContract.sol');
const source = fs.readFileSync(cocoPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':cocoContract'];
console.log(solc.compile(source,1)); //en mode test
*/
