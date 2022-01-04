const mongoose=require('mongoose');
const config=require('../Config/DbConfig');

const log4js=require('log4js');
const logger=log4js.getLogger();
logger.level='info';

/**
 * schema of Supplier System database
 */
const schema=new mongoose.Schema(
    {   
        orderId:{
            type:Number,
            required:true},
    
        userName:{
            type:String,
            required:true},
    
        address:{
            type:String,
            required:true},
    
        orderName:{
            type:String,
            required:true},
    
        orderQuantity:{   
            type:Number,
            required:true,
            minimum:1 },   
    
        orderCost:{
            type:Number,
            required:true },
    
        purchaserApproval:String,
            
        dateOfPurchaserApproval:{
            type:Date,
            default:Date.now,
            required:true},
        
        supplierName:{
            type:String,
            required:true},
        
        vendorApproval:String,

        dateOfVendorApproval:{
            type:Date,
            default:Date.now,
            required:true}

      
    }
);

/**
 * Database Connection
 */
const url=config.getDbConnection();

mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
});

/**
 * connection object
 */
const con=mongoose.connection;

logger.info('CONNECTED to the Supplier database !!');




module.exports=mongoose.model('SupplierModel',schema);