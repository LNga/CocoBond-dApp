import React, {Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import CocoContract from '../ethereum/cocoContract';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class createSouscripteurForm extends Component {
  state={
    nomSouscripteur: '',
    idObligation:'',
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
      .createSouscripteur(this.state.nomSouscripteur,this.state.idObligation)
      .send({
        from: accounts[0]
      });

      Router.replaceRoute(`/cocoContracts/${this.props.address}/souscripteurs`); //Rafraîchit la page

    } catch(err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });

  };


  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Nom nouveau souscripteur</label>
          <Form.Input
            value={this.state.nomSouscripteur}
            onChange={event => this.setState({ nomSouscripteur: event.target.value })}
            placeholder="i.e. LLyod Funds"
            width={4}
          />
          <label>ID obligation choisie</label>
          <Form.Input
            value={this.state.idObligation}
            onChange={event => this.setState({ idObligation: event.target.value })}
            placeholder="i.e. 1"
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

export default createSouscripteurForm;
