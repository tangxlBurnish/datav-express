/**
 * Created by tangxl on 16-12-4.
 */
module.exports = (express, connection) => {
  var router = express.Router();
  router.use((req, res, next) => {
    // log each request to the console
    console.log("You have hit the /api", req.method, req.url);

    // CORS
    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });

  router.get('/', (req, res) => {
    res.jsonp({
      name: 'Panorama API',
      version: '1.0'
    });
  });
  router.route('/panoramas')
    .get((req, res) => {
      var query = connection.query('SELECT * FROM origin_brands_xuye', (err, rows, fields) => {
        if (err) console.error(err);
        res.jsonp({
          stat: 'success',
          data: rows
        });
      });
      console.log(query.sql);
    });
  return router;
};