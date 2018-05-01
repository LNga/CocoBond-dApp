import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import CreateObligationForm from '../../../components/createObligationForm';

class ObligationNew extends Component {
  static async getInitialProps(props) {
    const {address}=props.query;

    return{address};
  }
  render(){
    return (
      <Layout>
        <Grid>
            <Grid.Column width={1}>
              <Link route={`/cocoContracts/${this.props.address}/obligations`}>
                <a>Back</a>
              </Link>
            </Grid.Column>
            <Grid.Column width={4}>
              <Link route={`/cocoContracts/${this.props.address}`}>
                <a>Retour Détails contrat</a>
              </Link>
            </Grid.Column>
        </Grid>
        <h3>Créer une obligation</h3>
        <CreateObligationForm address={this.props.address}/>
      </Layout>
    )
  }
}

export default ObligationNew;
