import * as mysql from 'mysql'

require('dotenv').config()

export interface Params {
	table: string,
	where: (string | number | boolean | Date)[],
	set?: string,
	select?: string,
	limit?: string,
	order?: string | 'id desc'
}

let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_DB,
	timezone: process.env.DB_TIMEZONE,
})

// reconnect if lost connect database, using on heroku
let connectDatabase = () => {

	connection.on('error', function (err) {
		if (!err.fatal) {
			return
		}
		if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
			throw err
		}
		console.log('Re-connecting db: ' + err.stack)

		connection = mysql.createConnection(connection.config);
		connectDatabase();
	});

}

connectDatabase()

class DB {
	static convertRowDataToArrayCsv = async (rowData: any[]) => {

		let dataArr: any[] = []
		rowData.forEach((row: any, idx) => {
			let rowArr = [], fields = []
			if (idx == 0) {
				fields = Object.keys(row)
				dataArr.push(fields)
			}
			for (let column in row) {
				rowArr.push(row[column])
			}
			dataArr.push(rowArr)
		})

		return dataArr
	}

	static exeQuery = (sql: string, selectPlainObj: boolean = false, returnArrayCsv: boolean = false): Promise<any> => {
		if (process.env.ENV == 'development') {
			console.log(sql)
		}
		return new Promise((resolve, reject) => {
			connection.query(sql, (err: mysql.MysqlError, result, fields) => {
				if (err)
					reject(err);
				else {
					let data: any[] = selectPlainObj ? JSON.parse(JSON.stringify(result)) : result
					// return data with array to export csv
					if (returnArrayCsv) {
						let dataArrCsv: any = DB.convertRowDataToArrayCsv(data)
						data = dataArrCsv
					}
					resolve(data)
				}
			})
		})
	}

	static selectBySql = async (sql: string, selectPlainObj: boolean = false, returnArrayCsv: boolean = false): Promise<any[] | mysql.MysqlError | any> => await DB.exeQuery(sql, selectPlainObj, returnArrayCsv)
	static selectByParams = async (params: Params, selectPlainObj: boolean = false, returnArrayCsv: boolean = false): Promise<any[] | mysql.MysqlError | any> => {
		let limit: string | number = '', order: string = ''
		if (params.limit) {
			limit = `LIMIT ${params.limit}`
		}
		if (params.order) {
			order = `ORDER BY ${params.order}`
		}
		return await DB.exeQuery(mysql.format(`SELECT ${params.select} FROM ${params.table} WHERE ${params.set} ${order} ${limit}`, params.where), selectPlainObj, returnArrayCsv)
	}
	static insertItem = async (params: Params): Promise<any[] | mysql.MysqlError | any> => await DB.exeQuery(mysql.format(`INSERT INTO ${params.table} SET ${params.set}`, params.where))
	static updateItem = async (params: Params): Promise<any[] | mysql.MysqlError | any> => await DB.exeQuery(mysql.format(`UPDATE ${params.table} SET ${params.set} WHERE ?? = ?`, params.where))
	static deleteItem = async (params: Params): Promise<any[] | mysql.MysqlError | any> => await DB.exeQuery(mysql.format(`DELETE FROM ${params.table} WHERE ${params.set}`, params.where))

}

export { DB }