import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';


class cocoContractIndex extends Component{
  static async getInitialProps() {
   const cocoContracts = await factory.methods.getdeployedcocoContracts().call();

   return { cocoContracts };
 }

  rendercocoContracts(){
    const items=this.props.cocoContracts.map(address =>{
      return{
        header:address,
        description:(
          <Link route={`/cocoContracts/${address}`}>
            <a>Détails du contrat</a>
          </Link>
        ),
        fluid:true,
        style: { overflowWrap: 'break-word' }
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
     <Layout>
      <div>
        <h3>Liste des contrats</h3>

        <Link route="/cocoContracts/new">
          <a>
            <Button floated="right" content="Créer un nouveau contrat" icon="add" primary/>
          </a>
        </Link>

        {this.rendercocoContracts()}
      </div>
    </Layout>
  );
  }

}

export default cocoContractIndex;
