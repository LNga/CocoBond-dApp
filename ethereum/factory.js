import web3 from './web3';
import cocoContractFactory from './build/cocoContractFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(cocoContractFactory.interface),
  '0x5052291b7e5E77E738BD2Efb14817d2eBC6082B4'
);

export default instance;
