/**
 * Created by tangxl on 16-12-4.
 */
var UserSQL = {
  insert:'INSERT INTO User(uid,userName) VALUES(?,?)',
  queryAll:'SELECT * FROM origin_brands_xuye',
  getUserById:'SELECT * FROM User WHERE uid = ? ',
};
module.exports = UserSQL;