const express = require('express')
const my_db = require('./my_db')
const utils = require('./util')
const multer = require('multer')
const upload = multer({ dest: 'PImage/' })


const router = express.Router()

router.get('/', (request, response) => {
    const connection = my_db.connect()
    const statement = `select * from  Product`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))

    })

})
router.post('/', upload.single('PImage'), (request, response) => {
    console.log("hello")
    const { VID, PName, PDiscription, Address_Discription, Start_Date, End_Date } = request.body
    const PImage = request.file.filename
    const connection = my_db.connect()
    const statement = `insert into Product (VID,PName,PDiscription, Address_Discription,Start_Date, End_Date,PImage )values ('${VID}','${PName}', '${PDiscription}', '${Address_Discription}','${Start_Date}','${End_Date}','${PImage}' )`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:id', (request, response) => {
    const { id } = request.params
    const { PName, PDiscription, Address_Discription } = request.body
    const connection = my_db.connect()
    const statement = `update Product set PName = '${PName}',PDiscription  = '${PDiscription}',
    Address_Discription = '${Address_Discription}'  where PID = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const { id } = request.params
    const connection = my_db.connect()
    const statement = `Delete  from Product where PID = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
module.exports = router