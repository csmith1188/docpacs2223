const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.urlencoded( {extended: true} ))

app.set('view wngine', 'ejs');

var customerData = JSON.parse(fs.readFileSync('customers.json'))

app.get('/', (req, res) => {
    res.render("index", {ejsData: customerData})
})

app.get('/neworder', (req, res) => {
    res.render('neworder')
})

app.post('/createorder',  (req, res) => {
    let newOrder = {
        id: customerData.lastOrder++,
        name: req.body.customerName,
        items: []
    }
    customerData.orders.push(newOrder)
    fs.writeFileSync('customers.json', JSON.stringify(customerData))
    res.send('Hi')
})

app.listen(3000,
    () => {console.log('server started')}
)