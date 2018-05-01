const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
//const web3 = new Web3(provider);
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/cocoContractFactory.json');
const compiledcocoContract = require('../ethereum/build/cocoContract.json');

let accounts;
let factory;
let cocoContractAddress;
let cocoContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ from: accounts[0], gas: '3000000' });

  await factory.methods.createcocoContract("BNP").send({
    from: accounts[0],
    gas: '1000000'
  });

  [cocoContractAddress] = await factory.methods.getdeployedcocoContracts().call();
  cocoContract = await new web3.eth.Contract(
  JSON.parse(compiledcocoContract.interface),
  cocoContractAddress
  );

});

describe('cocoContract',() =>{
  it('deploys a factory and a cocoContract', () =>{
    assert.ok(factory.options.address);
    assert.ok(cocoContract.options.address);
  });

  it('marks caller as the emetteur', async () => {
  const emetteur = await cocoContract.methods.emetteur().call();
  assert.equal(accounts[0], emetteur);
  });

  it('allows one account to create bonds and another to create subscribers', async () => {
    await cocoContract.methods.createObligation(5,7).send({
      from: accounts[0],
      gas: '1000000',
      value: web3.utils.toWei('0.00011', 'ether')
    });

    const tab=await cocoContract.methods.obligations(0).call();
    assert.equal(1, tab.id);

    await cocoContract.methods.createSouscripteur("Axa",1).send({
      from: accounts[1], gas:'1000000'
    });

    await cocoContract.methods.createSouscripteur("SMA",1).send({
      from: accounts[2], gas:'1000000'
    });

    await cocoContract.methods.paiementCoupon(1).send({
      from: accounts[0], gas:'1000000',value:web3.utils.toWei('0.00011', 'ether')
    });
    sous1Balance = await web3.eth.getBalance(accounts[1]);
    sous2Balance = await web3.eth.getBalance(accounts[2]);
    sous1Balance=web3.utils.fromWei(sous1Balance,'ether');
    sous2Balance=web3.utils.fromWei(sous2Balance,'ether');
    console.log(sous1Balance);
    console.log(sous2Balance);
  });
/*
  it('allows multiple accounts to create subscribers', async () => {
    await cocoContract.methods.createSouscripteur("Axa",1).send({    //ça ne marche pas car l'IDobligation revient à 0 en dehors du test précédent
      from: accounts[1], gas:'1000000'
    });
  });*/

  it('allows one account to set a new threshold', async () => {
    try {
      await cocoContract.methods.Seuil(1,8).send({
        from: accounts[0],
        value: 0
      });

      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows one account to pay', async () => {
    try {
      await cocoContract.methods.paiementCoupon(1).send({
        from: accounts[0], gas:'1000000',value:web3.utils.toWei('0.00011', 'ether')
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
    });

});

/* Old test version
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let cocoContract;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  cocoContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
    cocoContract.setProvider(provider);
});

describe('cocoContract',()=>{
  it('deploys a contract', ()=>{
    assert.ok(cocoContract.options.address);
    console.log(cocoContract);
  });
});

it('allows one account to create bonds', async () => {
  await cocoContract.methods.createObligation(0,5).send({
    from: accounts[0],
    value: web3.utils.toWei('0.0002', 'ether')
  });
});

it('allows multiple accounts to create subscribers', async () => {
  await cocoContract.methods.createSouscripteur("Axa",0).send({
    from: accounts[1], gas:'1000000'
  });
  await cocoContract.methods.createSouscripteur("SMA",0).send({
    from: accounts[2], gas:'1000000'
  });
});

it('allows one account to set a new threshold', async () => {
  try {
    await cocoContract.methods.nvoSeuil(7,0).send({
      from: accounts[0],
      value: 0
    });
    assert(false);
  } catch (err) {
    assert(err);
  }

  const sous1Balance = await web3.eth.getBalance(accounts[1]);
  const sous2Balance = await web3.eth.getBalance(accounts[2]);
});
*/
