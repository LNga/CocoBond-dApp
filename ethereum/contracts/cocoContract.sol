pragma solidity ^0.4.17;

// -------------------Factory Contract ----------------------------------------//

contract cocoContractFactory {
    address[] public deployedcocoContracts;

    function createcocoContract(string nomEmetteur) public {
        address newcocoContract = new cocoContract(msg.sender,nomEmetteur);
        deployedcocoContracts.push(newcocoContract);
    }

    function getdeployedcocoContracts() public view returns (address[]) {
        return deployedcocoContracts;
    }
}

// ----------------------Contrat principal-------------------------------------//

contract cocoContract{

// -----------------------Déclaration des variables----------------------------//
  struct Obligation{
      uint id;
      uint256 prix;
      uint seuil;
      uint seuilActuel;
      uint souscripteursCount;
  }
    struct Souscripteurs{
      string nomSouscripteur;
      address adresse;
      uint256 accountBalance;
      uint idObligation;
  }
  address public emetteur;
  string public nomEmetteur;
  uint public IDobligation;
  Obligation[]public obligations;
  Souscripteurs[]public souscripteurs;

// -------------------------Déclaration des fonctions--------------------------//
  modifier restricted(){
    require(msg.sender==emetteur);
    _;//place de la fonction qui fait appel au modifier
  }

  function cocoContract(address creator,string nom)public{
    emetteur=creator;
    nomEmetteur=nom;
    IDobligation=0;
  }

  function createObligation(uint seuilFixe, uint seuilActuel) public payable restricted {
    require(msg.value>0.0001 ether);
    require(seuilActuel>seuilFixe);
    IDobligation++;
    Obligation memory newObligation=Obligation({
      id:IDobligation,
      prix:msg.value,
      seuil:seuilFixe,
      seuilActuel:seuilActuel,
      souscripteursCount:0
    });
    obligations.push(newObligation);
  }

  function createSouscripteur(string nom, uint IDselected) public {
    Souscripteurs memory newSouscripteur=Souscripteurs({
        nomSouscripteur:nom,
        adresse:msg.sender,
        accountBalance:msg.sender.balance,
        idObligation:IDselected
    });
    souscripteurs.push(newSouscripteur);
    Obligation storage obligation = obligations[IDselected-1];
    obligation.souscripteursCount++;
  }

  function Seuil(uint IDselected,uint newSeuil) public restricted {
    Obligation storage obligation = obligations[IDselected-1];
    obligation.seuilActuel=newSeuil;
  }

  function paiementCoupon(uint IDselected) public payable restricted {
    require(msg.value>0.0001 ether);
    Obligation storage obligation = obligations[IDselected-1];
    uint coupon=obligation.prix/obligation.souscripteursCount;
    for (uint i=0; i<souscripteurs.length;i++){
        Souscripteurs storage souscripteur=souscripteurs[i];
        if(souscripteur.idObligation==IDselected && obligation.seuilActuel>obligation.seuil){
            souscripteur.adresse.transfer(coupon);
            souscripteur.accountBalance=souscripteur.adresse.balance;
        }
    }
    obligation.prix=msg.value;
  }

  function getSummary() public view returns (
    string, address, uint, uint
      ) {
        return (
          nomEmetteur,
          emetteur,
          obligations.length,
          souscripteurs.length
        );
    }

    function getObligationssCount() public view returns (uint) {
      return obligations.length;
    }

    function getSouscripteursCount() public view returns (uint) {
      return souscripteurs.length;
    }

}
