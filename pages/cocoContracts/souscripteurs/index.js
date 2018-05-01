//Liste des souscripteurs que l'utilisateur peut consulter
import React,{Component} from 'react';
import {Button,Table, Icon} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import CocoContract from '../../../ethereum/cocoContract';
import SouscripteursRow from '../../../components/SouscripteursRow';

class SouscripteurIndex extends Component{
  static async getInitialProps(props) {
    const {address}=props.query;
    const cocoContract= CocoContract(address);
    const souscripteursCount = await cocoContract.methods.getSouscripteursCount().call();

    const souscripteurs = await Promise.all(
      Array(parseInt(souscripteursCount))
        .fill()
        .map((element, index) => {
          return cocoContract.methods.souscripteurs(index).call();
        })
    );

    return{address,souscripteurs,souscripteursCount};
  }

  renderRows() {
    return this.props.souscripteurs.map((souscripteur, index) => {
      return (
        <SouscripteursRow
          key={index}
          souscripteur={souscripteur}
          address={this.props.address}
        />
      );
    });
  }

  render(){

    const { Header, Row, HeaderCell, Body, Footer } = Table;

    return(
      <Layout>
        <Link route={`/cocoContracts/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h3>Liste des souscripteurs</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>NOM</HeaderCell>
              <HeaderCell>ADRESSE</HeaderCell>
              <HeaderCell>SOLDE DU COMPTE (ether)</HeaderCell>
              <HeaderCell>ID OBLIGATION</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
            <Footer fullWidth>
            <Row>
              <HeaderCell colSpan='8'>
                <Link route={`/cocoContracts/${this.props.address}/souscripteurs/new`}>
                    <Button floated='right' icon labelPosition='left' primary size='small'>
                      <Icon name='user plus' /> Ajouter un souscripteur
                    </Button>
                </Link>
              </HeaderCell>
            </Row>
          </Footer>
        </Table>
      </Layout>
    );
  }
}

export default SouscripteurIndex;
