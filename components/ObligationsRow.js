import React, { Component } from 'react';
import { Table, Button, Input } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CocoContract from '../ethereum/cocoContract';
import { Router } from '../routes';

class ObligationsRow extends Component {

  state={
    seuilActuel:''
  };

  onSeuil = async () => {
    event.preventDefault();
    const cocoContract = CocoContract(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await cocoContract.methods.Seuil(this.props.obligation.id,this.state.seuilActuel).send({
      from: accounts[0]
    });

    await cocoContract.methods.paiementCoupon(this.props.obligation.id).send({
      from: accounts[0],
      value:this.props.obligation.prix
    });

    Router.replaceRoute(`/cocoContracts/${this.props.address}/obligations`);

  };

  render(){
    const { Row, Cell } = Table;
    //pour eviter de répeter this.props on peut écrire: const obligation=this.props;

    return (
      <Row>
        <Cell>{this.props.obligation.id}</Cell>
        <Cell>{web3.utils.fromWei(this.props.obligation.prix,'ether')}</Cell>
        <Cell>{this.props.obligation.seuil}</Cell>
        <Cell>{this.props.obligation.seuilActuel}</Cell>
        <Cell>{this.props.obligation.souscripteursCount}</Cell>
        <Cell>
          <Input
            value={this.state.seuilActuel}
            onChange={event => this.setState({ seuilActuel: event.target.value })}
            placeholder="i.e. 7"
          />
          <Button color="teal" basic onClick={this.onSeuil}>Change</Button>
        </Cell>
      </Row>
    );

  }
}

export default ObligationsRow;
