import React, {Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import CocoContract from '../ethereum/cocoContract';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class createObligationForm extends Component {
  state={
    value:'',
    seuilFixe: '',
    seuilActuel:'',
    errorMessage: '',
    loading: false
  };

  onSubmit=async(event)=>{
    event.preventDefault();

    const cocoContract=CocoContract(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try{
      const accounts = await web3.eth.getAccounts();
      await cocoContract.methods
      .createObligation(this.state.seuilFixe,this.state.seuilActuel)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/cocoContracts/${this.props.address}`); //Rafraîchit la page

    } catch(err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });

  };


  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contribution</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
          <label>Seuil Fixe</label>
          <Form.Input
            value={this.state.seuilFixe}
            onChange={event => this.setState({ seuilFixe: event.target.value })}
            placeholder="i.e. 5"
            width={4}
          />
          <label>Seuil Actuel</label>
          <Form.Input
            value={this.state.seuilActuel}
            onChange={event => this.setState({ seuilActuel: event.target.value })}
            placeholder="i.e. 7"
            width={4}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage.split("\n")[0]} />
        <Button primary loading={this.state.loading}>
          Create
        </Button>
      </Form>
    );
  }
}

export default createObligationForm;
