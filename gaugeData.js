`use strict`

class getGaugeData {
    constructor(dbconn) {
        this.mysqlConn = dbconn;
    }
    getAllData() {
        return new Promise((resolve, reject) => {
            this.mysqlConn.query('select * from gauge', (err, result, field) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    getDataById(id) {
        return new Promise((resolve, reject) => {
            this.mysqlConn.query('select * from gauge where id_gauge='+id+'', (err, result, field) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = getGaugeData;