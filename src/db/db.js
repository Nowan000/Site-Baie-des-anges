import mysql from "mysql";

class DbConnection{
    constructor(autoclose = true) {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user:'root',
            password:'',
            database: 'baie_des_anges',
            port: 3306
        });
        this.autoclose = autoclose;
    }

    performQuery(request, values=[]) {
        return new Promise((resolve, reject) => {
            console.warn(request);
            this.connection.query(request, values, (err, rows, fields) => {
                if (err) {
                    if (this.autoclose) {
                        this.connection.end();
                    }
                    return reject(err);
                }
                if (this.autoclose) {
                    this.connection.end();
                }
                return resolve({ rows, fields });
            });
        });
    }
    close() {
        this.connection.end();
    }
}
export default DbConnection;