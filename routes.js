const routes = require('next-routes')(); //les parenthèses signifient qu'on fait appel à une fonction, dont on fera appel juste après la déclaration

routes
  .add('/cocoContracts/new', '/cocoContracts/new')
  .add('/cocoContracts/:address', '/cocoContracts/show')
  .add('/cocoContracts/:address/obligations','/cocoContracts/obligations/index')
  .add('/cocoContracts/:address/obligations/new','/cocoContracts/obligations/new')
  .add('/cocoContracts/:address/souscripteurs','/cocoContracts/souscripteurs/index')
  .add('/cocoContracts/:address/souscripteurs/new','/cocoContracts/souscripteurs/new');

module.exports = routes;
