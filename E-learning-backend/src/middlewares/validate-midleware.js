// validate-middleware.js
const validate = (schema) => async (req, res, next) => {
 
    try {
      
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    } catch (err) {
      const status = 422; // Unprocessable Entity
      const message = err.errors[0].message;
  
      console.error("Validation Error:", err);
  
      // Send error response
      return res.status(status).json({
        error: {
          status,
          message,
        },
      });
    }
  };
  
  export default validate;
  