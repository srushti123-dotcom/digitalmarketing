const express = require('express')
const my_db = require('./my_db')
const utils = require('./util')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = my_db.connect()
    const statement = `select * from  Category`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))

    })
})

router.post('/', (request, response) => {
    const { CID, PID, CName } = request.body

    const connection = my_db.connect()
    const statement = `insert into Category (CID,PID,CName) values ('${CID}','${PID}','${CName}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:id', (request, response) => {
    const { id } = request.params
    const { CName } = request.body
    const connection = my_db.connect()
    const statement = `update Category set CName = '${CName}' where CID = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const { id } = request.params
    const { CID } = request.body
    const connection = my_db.connect()
    const statement = `delete from Category where CID = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


module.exports = router