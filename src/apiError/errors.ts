export class apiErrors extends Error {
    status:number
    errors:string

    constructor(status:number,message:string,errors:any=[]) {
        super(message);
        this.message=message
        this.status=status;
        this.errors=errors
    }
    static UnauthError(message:string,errors:any=[]){
        return new apiErrors(401,"Unauthorized Error");
    };

    static BadRequest(message:string,errors:any=[]){
        return new apiErrors(400,message,errors);
    }
}