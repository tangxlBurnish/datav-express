/**
 * Created by tangxl on 16-12-5.
 */
module.exports = (connection) => {
  var index = {};
  var indexSql = require('./../../db/hospital/indexSql');
  index.login = (req,res) => {
    var query = connection.query(indexSql.queryAll, (err, rows, fields) => {
      if (err) console.error(err);
      res.jsonp({
        stat: 'success',
        data: rows
      });
    });
    console.log(query.sql);
  };
  return index;
};