/**
 * Created by tangxl on 16-12-5.
 */
var IndexSQL = {
  insert:'INSERT INTO User(uid,userName) VALUES(?,?)',
  queryAll:'SELECT * FROM origin_brands_xuye',
  getUserById:'SELECT * FROM User WHERE uid = ? ',
};
module.exports = IndexSQL;