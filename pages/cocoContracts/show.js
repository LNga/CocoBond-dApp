import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import CocoContract from '../../ethereum/cocoContract';
import web3 from '../../ethereum/web3';
import CreateObligationForm from '../../components/createObligationForm';
import { Link } from '../../routes';

class cocoContractsShow extends Component{
  static async getInitialProps(props) {
    const cocoContract = CocoContract(props.query.address);
    const summary = await cocoContract.methods.getSummary().call();
    return{
      address: props.query.address,
      nomEmetteur:summary[0],
      emetteur:summary[1],
      obligationsCount: summary[2],
      souscripteursCount: summary[3]
    };
  }
  renderCards(){
    const {
      nomEmetteur,
      emetteur,
      obligationsCount,
      souscripteursCount
    } = this.props;

    const items = [
      {
        header: 'Emetteur',
        meta: nomEmetteur,
        description:emetteur,
        style: { overflowWrap: 'break-word' }
      },
      {
        href:`/cocoContracts/${this.props.address}/obligations`,
        header: 'Obligations',
        meta: 'Nombre d\'obligations',
        description:obligationsCount,
        style: { overflowWrap: 'break-word' }
      },
      {
        href:`/cocoContracts/${this.props.address}/souscripteurs`,
        header: 'Souscripteurs',
        meta: 'Nombre de souscripteurs',
        description:souscripteursCount,
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;

  }
  render(){
    return (
      <Layout>
        <h3>Détails du contrat</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              {this.renderCards()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default cocoContractsShow;
