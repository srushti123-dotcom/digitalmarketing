const express = require('express')
const my_db = require('./my_db')
const utils = require('./util')



const router = express.Router()

router.get('/', (request, response) => {
    const connection = my_db.connect()
    const statement = `select * from  City`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))

    })

})

router.post('/', (request, response) => {

    const { CityID, City_Area, City_Name } = request.body
    const connection = my_db.connect()
    const statement = `insert into City (CityID, City_Area, City_Name) values (${CityID},'${City_Area}','${City_Name}' )`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))

    })

})
router.delete('/:id', (request, response) => {
    const { id } = request.params
    const connection = my_db.connect()
    const statement = `Delete  from City where CityID = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
module.exports = router