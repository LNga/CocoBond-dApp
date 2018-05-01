import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';


export default()  => {
 return(
  <Menu style={{ marginTop: '10px' ,color:'blue'}}>
    <Link route="/">
      <a className="item">Accueil</a>
    </Link>

    <Menu.Menu position="right">

    <Link route="/cocoContracts/new">
      <a className="item">Créer contrat +</a>
    </Link>

        </Menu.Menu>
    </Menu>
  );
};
