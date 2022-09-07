import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import Users from '../model/users.js'

const database = {}
const credentials = {
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'bdb612ac058745',
    password: '37fd1a45',
    database: 'heroku_6b1c57b64282e63'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password

    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
        dialect: 'mysql',
        host: credentials.host
    })


    database.Users = Users(sequelize)

    await sequelize.sync({ alter: false })
} catch (error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database