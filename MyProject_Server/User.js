const express = require('express')
const my_db = require('./my_db')
const utils = require('./util')
    //const cryptoJs = require('crypto-js')


const router = express.Router()

router.get('/', (request, response) => {
    const connection = my_db.connect()
    const statement = `select * from User`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const User = data[index]
            users.push({
                UID: User['UID'],
                First_Name: User['First_Name'],
                Last_Name: User['Last_Name'],
                Email: User['Email'],
                Mobile_No: User['Mobile_No'],
                Password: User['Password']
            })
        }
        response.send(utils.createResult(error, users))
    })
})
router.post('/LOGIN', (request, response) => {
    const { Email, Password } = request.body

    const connection = my_db.connect()
    const statement1 = `select * from User where Email = '${Email}'
     and Password = '${Password}'`

    connection.query(statement1, (error, users) => {
        connection.end()
        if (users.length == 0) {
            //users with the required email does not exit
            response.send(utils.createResult('user does not exist'))

        } else {
            //user already exist deatails are faitched from database directly
            const user = users[0]
            const info = {
                UID: user['UID'],
                First_Name: user['First_Name'],
                Last_Name: user['Last_Name'],
                Email: user['Email'],
                Mobile_No: user['Mobile_No'],
                Password: user['Password']

            }
            response.send(utils.createResult(null, info))
        }

    })
})
router.post('/register', (request, response) => {
    const {
        First_Name,
        Last_Name,
        Email,
        Mobile_No,
        Password
    } = request.body
    const connection = my_db.connect()

    const statement1 = `select * from User where Email = '${Email}'`
    connection.query(statement1, (error, users) => {
        if (users.length == 0) {
            //users with the required email does not exit
            //insert new record

            const statement = `insert into User (First_Name,Last_Name,Email,Mobile_No,Password) 
    values ('${ First_Name}','${Last_Name}','${Email}',${Mobile_No},'${Password}')`

            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            //user already exist
            connection.end()
            response.send(utils.createResult('email exists. please use another email.'))
        }

    })
})


module.exports = router