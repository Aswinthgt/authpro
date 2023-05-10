export interface IRegister {
    cpassword: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    phone: string
}

export interface ILogin{
    email: string,
    password:string
}

export interface ILoginResponse {
    token:string
}

export interface IregisterResponse{
    message:string,
    phoneNumber:string | number
}