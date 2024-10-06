class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack = ""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message = message
        this.success = false
        this.errors= errors

        if(stack){
            this.stack = stack
        }else Error.captureStackTrace(this, this.constructor)
    }
}
export {ApiError}

// if there are any error then it will be of this format