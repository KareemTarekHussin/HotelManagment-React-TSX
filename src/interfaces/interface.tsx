

export default interface AuthInterface {
  loginData?:{}|null,
  baseUrl?:string,
  requestHeaders:{
    Authorization: string,
  },
  getUserData : ()=>void,
}