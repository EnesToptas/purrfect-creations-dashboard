const express = require('express')
const airtable = require('airtable')

const util = require('./util')

const app = express()
const port = 3001

var cors = require('cors');
const { all } = require('express/lib/application')
app.use(cors());

require('dotenv').config()

airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});
var base = airtable.base(process.env.AIRTABLE_BASE_ID);

app.get('/last-orders', (req, res) => {
  base('Orders').select({
    maxRecords: 10,
    view: "Grid view"
  }).firstPage(function page(err, records) {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    }
    else {
      let data = records.map(util.getDataFromRecord)
      res.send(data)
    }
  })
})

app.get('/general-info', async (req, res) => {

  try {
    allOrders = await base('Orders').select({
      sort: [{field: "order_placed", direction: "desc"}],
      fields:["order_status", "price", "order_placed"]
    }).all()

    totalOrderCount = allOrders.length

    todaysDate   = new Date(allOrders[0].get("order_placed"))
    oneMonthAgo  = util.getOneMonthPrior(todaysDate)
    twoMonthAgo  = util.getOneMonthPrior(oneMonthAgo)

    lastMonthCount    = util.getOrderCountBetween(allOrders, todaysDate, oneMonthAgo)
    prevMonthCount    = util.getOrderCountBetween(allOrders, oneMonthAgo, twoMonthAgo)

    inProgressCount   = util.getInProgressCount(allOrders)

    totalRev = util.getTotalRevenue(allOrders)

    res.send({
      totalOrderCount,
      lastMonthCount,
      prevMonthCount,
      inProgressCount,
      totalRev,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
