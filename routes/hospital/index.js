/**
 * Created by tangxl on 16-12-5.
 */
module.exports = (express, connection) => {
  var router = express.Router();
  var indexModel = require('./../../model/hospital/index')(connection);
  router.use((req, res, next) => {
    // log each request to the console
    console.log("You have hit the /api", req.method, req.url);

    // CORS
    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });
  router.get('/', (req, res) => {
    res.render('hospital/index', { });
  });
  router.route('/panoramas')
    .get(indexModel.login);
  return router;
};