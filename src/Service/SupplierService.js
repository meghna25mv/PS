const details=require('../Model/SupplierModel');
const log4js=require('log4js');
const logger=log4js.getLogger();
logger.level='info';

/**
 * Method to get all the supplier system details by get method
 * @method getSupplierDetails
 * @param  input req,res,next 
 * @returns Supplier System details as  response
 *    
 */
exports.getSupplierDetails=async function (req,res,next){
    try{
        const data=await details.find();
        if(data==null){
            res.status(404).json('No data found ');
            logger.info('No data found ');
         }
        else{
        res.json(data);
        logger.info('Supplier System details retrieved successsfully ');
        }
     }
    catch(err)
    {   
      next(err);
    }

}

/**
 * Method to add all the Supplier system details by post method
 * @method addSupplierDetails
 * @param  input req,res,next 
 * @returns Supplier System details as response
 *    
 */
exports.addSupplierDetails=async function (req,res,next){
   /**
    * creating obj which will accept all values
    */ 
    const orderDetails=new details({
        
        orderId:req.body.orderId,
        userName:req.body.userName,
        address:req.body.address,
        orderName:req.body.orderName,
        orderQuantity:req.body.orderQuantity,
        orderCost:req.body.orderCost,
        purchaserApproval:req.body.purchaserApproval,
        dateOfPurchaserApproval:req.body.dateOfPurchaserApproval,
        supplierName:req.body.supplierName,
        vendorApproval:req.body.vendorApproval,
        dateOfVendorApproval:req.body.dateOfVendorApproval
    });
    try{
        
        const orderDetails1=await details.create(orderDetails);
        res.status(res.statusCode).send({
            status:res.statusCode,
            message:"DATA ADDED SUCCESSFULLY FOR OrderId : "+req.body.orderId});
        logger.info("DATA ADDED SUCCESSFULLY FOR OrderId : "+req.body.orderId);
    }

    catch(err)
    { 
        logger.info('Error Occurred in addDetails of Supplier Service !!');
        next(err);
        res.status(400).send({
        status:res.statusCode,
        message:"EXCEPTION OCCURED WHILE ADDING DATA"});
    }
}


/**
 * Method to get the supplier system details by Id using get method
 * @method getDetailsById
 * @param  input req,res,next 
 * @returns Supplier details response according to Id 
 *    
 */
exports.getDetailsById=async function (req,res,next){
    try{
        const data=await details.findById(req.params.id); 
  
  if(data==null){
      res.status(404).json('No data found for the id '+req.params.id);
      logger.info('No data found for the id '+req.params.id); 
      }  
   else{
      res.json(data);
      logger.info('Supplier System details retrieved for the id ');
     }
    }
    catch(err)
    {   
    next(err);
    }
}


/**
 * Method to get the approved details of supplier system using get method
 * @method getApprovedDetails
 * @param  input req,res,next 
 * @returns Approved supplier system details as response
 *    
 */
exports.getApprovedDetails=async function (req,res,next){
    try{
        const data=await details.find({vendorApproval:{$eq:"Approved"}});

        if(data==null){
            res.status(404).json('No approved details found');
            logger.info('No approved details found'); 
         }   
        else
        {
        res.json(data);
        logger.info('Approved details retrieved from the Supplier System');
        }
    }
    catch(err)
    {
          next(err);
     }
}


/**
 * Method to get the rejected details of supplier system using get method
 * @method getRejectedDetails
 * @param  input req,res,next 
 * @returns Rejected supplier system details as response
 *    
 */
 exports.getRejectedDetails= async function (req,res,next){
    try{
        const data=await details.find({vendorApproval:{$eq:"Rejected"}});

        if(data==null){
            res.status(404).json('No rejected details found');
            logger.info('No rejected details found'); 
          }  
          else 
          {    
        res.json(data);
        logger.info('Rejected details retrieved from the Supplier System');
          }
    }
    catch(err)
    {
        next(err);
    }
}


/**
 * Method to get the details to discuss of supplier system using get method
 * @method getDetailsToDiscuss
 * @param  input req,res,next 
 * @returns supplier system details for discussion as response
 *    
 */
 exports.getDetailsToDiscuss= async function (req,res,next){
    try{
        const data=await details.find({vendorApproval:{$eq:"Submitted For Discussion"}});

        if(data==null){
            res.status(404).json('No details found for discussion');
            logger.info('No details found for discussion'); 
        }
         else  
        {   
        res.json(data);
        logger.info('Details submitted for discussion retrieved from the Supplier System ');
        }
    }
    catch(err)
    {
        next(err);
    }
}


/**
 * Method to update the approval details of supplier system by Id using put method
 * @method updateApprovalById
 * @param  input req,res,next 
 * @returns Approval attribute as response
 *    
 */
 exports.updateApprovalById= async function (req,res,next){

    try{
        const data= await details.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(data==null){
            res.status(400).json('Not able to update the approval for id '+req.params.id);
            logger.info('Not able to update the approval for id '+req.params.id); 
        }       
        else
        {
        res.json(data);
        logger.info('Approval updated successfully for Id '+req.params.id);
        }
}
    catch(err)
     {  
       next(err);}
};


/**
* Method to delete the details of Supplier system by any attribute in body using findOneAndDelete method
* @method delete
* @param  input req,res,next 
* @returns deletes the body as response
*    
*/
exports.delete=async function(req,res,next){

    try{
       
        const data= await details.findByIdAndDelete(req.params.id);
        if(data==null){
         res.status(400).json('No data to delete');
         logger.info('No data to delete');
        }

        else{
            res.status(res.statusCode).send({
                status:res.statusCode,
                message:"DATA DELETED SUCCESSFULLY FOR id : "+req.params.id});
            logger.info('Data deleted successfully for id '+req.params.id);
        }
    }
    catch(err)
     {  
         next(err);
    }
}
