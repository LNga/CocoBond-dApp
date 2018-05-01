import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class SouscripteursRow extends Component {
  render(){
    const { Row, Cell } = Table;

    return (
      <Row>
        <Cell>{this.props.souscripteur.nomSouscripteur}</Cell>
        <Cell>{this.props.souscripteur.adresse}</Cell>
        <Cell>{web3.utils.fromWei(this.props.souscripteur.accountBalance,'ether')}</Cell>
        <Cell>{this.props.souscripteur.idObligation}</Cell>
      </Row>
    );

  }
}

export default SouscripteursRow;
