const express=require('express');

/**
 * calling router from express
 */
const router=express.Router();

const service=require('../Service/SupplierService');

/**
 *  End points
 */

/**
  * get() to get all the supplier details
  */
router.get('/getDetails',service.getSupplierDetails);


/**
 * post() to add the supplier details
 */
router.post('/addDetails',service.addSupplierDetails);

/**
 * get() to get the supplier details according to object id
 */
router.get('/getDetailsById/:id',service.getDetailsById);

/**
 * get() approved details 
 */
router.get('/getApprovedDetails',service.getApprovedDetails);

/**
 * get() rejected details 
 */
 router.get('/getRejectedDetails',service.getRejectedDetails);


/**
 * get() details submitted to discuss 
 */
 router.get('/getDetailsToDiscuss',service.getDetailsToDiscuss);
 

/**
 * put() to update the vendor approval according to object id
 */
router.put('/updateApprovalById/:id',service.updateApprovalById);

/**
 * delete() to delete the Supplier details using any attribute in the body
 */
 router.delete('/delete/:id',service.delete);

/**
 * router response for function call
 */
module.exports=router;
