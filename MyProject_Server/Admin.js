const express = require('express')
const my_db = require('./my_db')
const utils = require('./util')
    //const cryptoJs = require('crypto-js')


const router = express.Router()

router.get('/', (request, response) => {
    const connection = my_db.connect()
    const statement = `select * from Admin`
    connection.query(statement, (error, data) => {
        connection.end()
        const admins = []
        for (let index = 0; index < data.length; index++) {
            const Admin = data[index]
            admins.push({
                AID: Admin['AID '],
                AName: Admin['AName'],
                APassword: Admin['APassword']
            })
        }
        response.send(utils.createResult(error, admins))
    })
})

router.post('/LOGIN', (request, response) => {
    const { AID, AName, APassword } = request.body

    const connection = my_db.connect()
    const statement1 = `select * from Admin  where APassword = '${APassword}'
     and AName = '${AName}'`

    connection.query(statement1, (error, admins) => {
        connection.end()
        if (admins.length == 0) {
            //users with the required amin does not exit
            response.send(utils.createResult('You are not A Admin'))

        } else {
            //user already exist deatails are faitched from database directly
            const admin = admins[0]
            const info = {
                AID: admin['AID'],
                AName: admin['AName'],
                APassword: admin['APassword']

            }
            response.send(utils.createResult(null, info))
        }

    })
})
module.exports = router