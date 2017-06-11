import SwaggerExpress from 'swagger-express-mw';
import express from 'express';

let app = express();

module.exports = app; // for testing

var config = {
    appRoot: __dirname, // required config
    swaggerFile: 'swagger/swagger.yaml'
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  let port = process.env.PORT || 3001;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
