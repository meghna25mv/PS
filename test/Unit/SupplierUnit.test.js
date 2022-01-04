const app= require('../../app');
const service=require('../../src/Service/SupplierService');
const model=require('../../src/Model/SupplierModel');
const httpMocks=require("node-mocks-http");
const mockSupplier=require("../MockData/SupplierData.json");
const mockData=require("../MockData/MockData.json");


/**
 * Mock Functions
 */
 model.create=jest.fn();
 model.find=jest.fn();
 model.findById=jest.fn();
 model.findByIdAndUpdate=jest.fn();
 model.findByIdAndDelete=jest.fn();
 
let req,res,next;

/**
 * Executes before each function
 */
 beforeEach(()=>{

    req=httpMocks.createRequest();
    res=httpMocks.createResponse();
    next =jest.fn();
});



/**
 * Unit test for getSupplierDetails :
 */
describe("service.getSupplierDetails",()=>{

it("Should have a getSupplierDetails function",()=>{
  expect(typeof service.getSupplierDetails).toBe("function");
  });

it("sould call model.find{}",async()=>{
    await service.getSupplierDetails(req,res,next);
    expect(model.find).toHaveBeenCalledWith();

 });

it("Should return response with status 200 ",async()=>{
    model.find.mockReturnValue(mockData);
    await service.getSupplierDetails(req,res,next);
    expect(res.statusCode).toBe(200);
   
    });

 it("Should return 404 as response when data not found",async()=>
 {
    model.find.mockReturnValue(null);
    await service.getSupplierDetails(req,res,next);
    expect(res.statusCode).toBe(404);

 });


 it("Should do error handling",async()=>{
       const errorMessage={message:"error in getting data"};
       const rejectedPromise=Promise.reject(errorMessage);
       model.find.mockReturnValue(rejectedPromise);
        await service.getSupplierDetails(req,res,next);
       expect(next).toHaveBeenCalledWith(errorMessage);
   });
});


/**
 * Unit test for addSupplierDetails :
 */
 describe("service.addSupplierDetails",()=>{

it("Should have a addSupplierDetails function",()=>{
        expect(typeof service.addSupplierDetails).toBe("function");
        });

it("Should call model.create",async ()=>{
        service.addSupplierDetails(req,res,next);
         expect(model.create).toBeCalledTimes(1);
        });

it("Should return 200 as response status",async()=>{
        req.body=mockData;
        model.create.mockReturnValue(mockData);
        await service.addSupplierDetails(req,res,next);
        expect(res.statusCode).toBe(200);
        });

it("Should do error handling",async()=>{
        const errorMessage={message:"error in getting data"};
        const rejectedPromise=Promise.reject(errorMessage);
        model.create.mockReturnValue(rejectedPromise);
         await service.addSupplierDetails(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});


/**
 * Unit test for getDetailsById :
 * 
 */
describe("service.getDetailsById",()=>{

it("Should have a getDetailsById function",()=>{
        expect(typeof service.getDetailsById).toBe("function");
        });
    
it("Should call service.findById({} with model parameters)",async()=>{
        req.params.id="60d2ea87d1fe2827f40baad5"; 
        await service.getDetailsById(req,res);
        expect(model.findById).toBeCalledWith("60d2ea87d1fe2827f40baad5");
     
        });

it("Should return json body and response code 200",async()=>{
            model.findById.mockReturnValue(mockData);
            await service.getDetailsById(req,res,next);
            expect(res.statusCode).toBe(200);
            
         });
    
it("Should return 404 as response when no data found for the id",async()=>
        {
            model.findById.mockReturnValue(null);
            await service.getDetailsById(req,res,next);
            expect(res.statusCode).toBe(404);
          
          
        });
        
it("Should do error handling",async()=>{
            const errorMessage={message:"error in getting data"};
            const rejectedPromise=Promise.reject(errorMessage);
            model.findById.mockReturnValue(rejectedPromise);
             await service.getDetailsById(req,res,next);
            expect(next).toHaveBeenCalledWith(errorMessage);
        });
});



/**
 * Unit test for getApprovedDetails :
 */
describe("service.getApprovedDetails",()=>{

it("Should have a getApprovedDetails function",()=>{
    expect(typeof service.getApprovedDetails).toBe("function");
    });
  
it("Should call model.find({})",async()=>{
    await service.getApprovedDetails(req,res,next);
    expect(model.find).toBeCalledWith({vendorApproval:{$eq:"Approved"}});
    });
  
it("Should return response code 200",async()=>{
        model.find.mockReturnValue(mockData);
        await service.getApprovedDetails(req,res,next);
        expect(res.statusCode).toBe(200);
         expect(res._getJSONData()).toStrictEqual(mockData);
     });
  
it("Should return 404 when data not found",async()=>
    {
    model.find.mockReturnValue(null);
    await service.getApprovedDetails(req,res,next);
    expect(res.statusCode).toBe(404);
    });
    
it("Should do error handling",async()=>{
        const errorMessage={message:"error in getting data"};
        const rejectedPromise=Promise.reject(errorMessage);
        model.find.mockReturnValue(rejectedPromise);
         await service.getSupplierDetails(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

/**
 * Unit test for getRejectedDetails :
 */
 describe("service.getRejectedDetails",()=>{

it("Should have a getRejectedDetails function",()=>{
       expect(typeof service.getRejectedDetails).toBe("function");
     
       });
      
it("Should call model.find({})",async()=>{
       await service.getRejectedDetails(req,res,next);
       expect(model.find).toBeCalledWith({vendorApproval:{$eq:"Rejected"}});
       
       });
       
it("Should return response code 200",async()=>{
          model.find.mockReturnValue(mockData);
          await service.getRejectedDetails(req,res,next);
          expect(res.statusCode).toBe(200);
           expect(res._getJSONData()).toStrictEqual(mockData);
       });
    
it("Should return 404 as response when data not found",async()=>
       {
       model.find.mockReturnValue(null);
       await service.getRejectedDetails(req,res,next);
       expect(res.statusCode).toBe(404);
       });

it("Should do error handling",async()=>{
          const errorMessage={message:"error in getting data"};
          const rejectedPromise=Promise.reject(errorMessage);
          model.find.mockReturnValue(rejectedPromise);
           await service.getSupplierDetails(req,res,next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
    });
 

/**
 * Unit test for getDetailsToDiscuss :
 */
 describe("service.getDetailsToDiscuss",()=>{

it("Should have a getDetailsToDiscuss function",()=>{
       expect(typeof service.getDetailsToDiscuss).toBe("function");
     
       });
      
it("Should call model.find({})",async()=>{
       await service.getDetailsToDiscuss(req,res,next);
       expect(model.find).toBeCalledWith({vendorApproval:{$eq:"Submitted For Discussion"}});
       
       });
    
it("Should return response code 200",async()=>{
          model.find.mockReturnValue(mockData);
          await service.getDetailsToDiscuss(req,res,next);
          expect(res.statusCode).toBe(200);
           expect(res._getJSONData()).toStrictEqual(mockData);
       });
    
it("Should return 404 as response when data not found",async()=>
       {
       model.find.mockReturnValue(null);
       await service.getDetailsToDiscuss(req,res,next);
       expect(res.statusCode).toBe(404);
       });
       
it("Should do error handling",async()=>{
          const errorMessage={message:"error in getting data"};
          const rejectedPromise=Promise.reject(errorMessage);
          model.find.mockReturnValue(rejectedPromise);
           await service.getSupplierDetails(req,res,next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
    });

     
/**
 * Unit test for updateApprovalById :
 */
 describe("service.updateApprovalById",()=>{

    it("Should have a updateApprovalById function",()=>{
          expect(typeof service.updateApprovalById).toBe("function");
          });
         
        
    it("Should update model.updateApprovalById",async()=>{
          req.params.id="60d47d5d4e100908ccd09dc4";
          req.body=mockData;
          await service.updateApprovalById(req,res,next);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith("60d47d5d4e100908ccd09dc4",req.body,{new:true});
     
            });
        
         
    it("Should return json body and response code 200",async()=>{
                req.params.id="60d2fd2cd0b7441a7c783c3e";
               req.params.body=mockSupplier;
               model.findByIdAndUpdate.mockReturnValue(req.params.id,req.body,{new:true});
               await service.updateApprovalById(req,res,next);
               expect(res.statusCode).toBe(200);
           
            });

    it("Should return 400 when item does not exist",async()=>
          {
          model.findByIdAndUpdate.mockReturnValue(null);
          await service.updateApprovalById(req,res,next);
          expect(res.statusCode).toBe(400);
          });
    
    
    it("Should do error handling",async()=>{
             const errorMessage={message:"error in getting data"};
             const rejectedPromise=Promise.reject(errorMessage);
             model.findByIdAndUpdate.mockReturnValue(rejectedPromise);
              await service.updateApprovalById(req,res,next);
             expect(next).toHaveBeenCalledWith(errorMessage);
         });
       });
       


/**
 * Unit test for delete:
 */
describe("service.delete",()=>{

it("Should have delete function",()=>{
    expect(typeof service.delete).toBe("function");
    });
       
       
it("Should call model.findOneAndDelete()",async()=>{
    await service.delete(req,res,next);
    expect(model.findByIdAndDelete).toBeCalledWith(req.id)
    });
   
 
 
it("Should return 200 and delete the body)",async()=>{
    req.body=mockData;
    model.findByIdAndDelete.mockReturnValue(req.body);
    await service.delete(req,res,next);
    expect(res.statusCode).toBe(200);
 });
   
 
it("Should return 400 when item does not exist",async()=>
 {
    req.body=mockData;
    model.findByIdAndDelete.mockReturnValue(null);
    await service.delete(req,res,next);
    expect(res.statusCode).toBe(400);
 });
 
 
it("Should do error handling",async()=>{
    const errorMessage={message:"error in getting data"};
    const rejectedPromise=Promise.reject(errorMessage);
    model.findByIdAndDelete.mockReturnValue(rejectedPromise);
     await service.delete(req,res,next);
    expect(next).toHaveBeenCalledWith(errorMessage);
 });
 
 });
 
 