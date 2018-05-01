import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router,Link } from '../../routes';

class cocoContractsNew extends Component {
  state = {
    nomEmetteur: '',
    errorMessage: '',
    loading: false
  };

  onSubmit=async(event )=>{ //meilleure façon de l'écrire

    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createcocoContract(this.state.nomEmetteur)
        .send({ //quand on utilise une fonction à partir d'un browser, metamask calcule automatiquement le gas nécessaire pour l'exécuter
          from: accounts[0]
        })
      Router.pushRoute('/'); //redirection à l'index.js page
    } catch (err) {
        this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false});
  }
  render(){
    return(
      <Layout>
        <Link route={`/`}>
          <a>Back</a>
        </Link>
        <h3>Créer un contrat</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Nom émetteur</label>
            <Input
              placeholder="i.e. BNP"
              value={this.state.nomEmetteur}
              onChange={event => this.setState({ nomEmetteur: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage.split("\n")[0]} />
          <Button loading={this.state.loading} primary>Créer</Button>
        </Form>
      </Layout>
    )
  }
}

export default cocoContractsNew;
