const express=require('express');
const mongoose=require('mongoose');
const log4js=require('log4js');
const logger=log4js.getLogger();
logger.level='info';

/**
 * starting express framework by initialising
 */
const app=express();

const port = 5000;

/**
 * handler
 */

var supplierHandler=require('../SupplierSystem/src/Handler/SupplierHandler');

/**
 * listening to the port 5000
 */
app.listen(port);
logger.info('Listening to port no. '+port);


app.use(express.json());



app.use("/supplierAPI",supplierHandler);




module.exports=app;