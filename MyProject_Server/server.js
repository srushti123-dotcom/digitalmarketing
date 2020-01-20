const express = require('express')
const bodyParser = require('body-parser')
    //import routers

const routerCategory = require('./Category')
const routerProduct = require('./Product')
const routerUser = require('./User')
const routerVendors_Information = require('./Vendors_Information')
const routerCity = require('./City')
const routerAdmin = require('./Admin')

const app = express()
    //add middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use(express.static('PImage'))
app.use('/User', routerUser)
app.use('/Category', routerCategory)
app.use('/Product', routerProduct)
app.use('/Vendors_Information', routerVendors_Information)
app.use('/City', routerCity)
app.use('/Admin', routerAdmin)

app.listen(4000, '0.0.0.0', () => {
    console.log('server started on port 4000')
})