//Liste des obligations pour l'utilisateur
import React,{Component} from 'react';
import {Button,Table, Icon} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import CocoContract from '../../../ethereum/cocoContract';
import ObligationsRow from '../../../components/ObligationsRow';

class ObligationIndex extends Component{
  static async getInitialProps(props) {
    const {address}=props.query;
    const cocoContract= CocoContract(address);
    const obligationsCount = await cocoContract.methods.getObligationssCount().call();

    const obligations = await Promise.all(
      Array(parseInt(obligationsCount))
        .fill()
        .map((element, index) => {
          return cocoContract.methods.obligations(index).call();
        })
    );

    return{address,obligations,obligationsCount};
  }

  renderRows() {
    return this.props.obligations.map((obligation, index) => {
      return (
        <ObligationsRow
          key={index}
          id={index}
          obligation={obligation}
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
        <h3>Liste des obligations</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>PRIX (en ether)</HeaderCell>
              <HeaderCell>SEUIL FIXE</HeaderCell>
              <HeaderCell>SEUIL ACTUEL</HeaderCell>
              <HeaderCell>NOMBRE DE SOUSCRIPTEURS</HeaderCell>
              <HeaderCell>CHANGER SEUIL ACTUEL</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
          <Footer fullWidth>
          <Row>
            <HeaderCell colSpan='8'>
              <Link route={`/cocoContracts/${this.props.address}/obligations/new`}>
                  <Button floated='right' icon labelPosition='left' primary size='small'>
                    <Icon name='plus' /> Ajouter une obligation
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

export default ObligationIndex;
