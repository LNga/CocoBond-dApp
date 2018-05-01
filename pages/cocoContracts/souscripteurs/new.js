import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import CreateSouscripteurForm from '../../../components/createSouscripteurForm';

class SouscripteurNew extends Component {
  static async getInitialProps(props) {
    const {address}=props.query;

    return{address};
  }
  render(){
    return (
      <Layout>
        <Link route={`/cocoContracts/${this.props.address}/souscripteurs`}>
          <a>Back</a>
        </Link>
        <Link route={`/cocoContracts/${this.props.address}`}>
          <a>Retour Détails contrat</a>
        </Link>
        <h3>Créer un souscripteur</h3>
        <CreateSouscripteurForm address={this.props.address}/>
      </Layout>
    )
  }
}

export default SouscripteurNew;
