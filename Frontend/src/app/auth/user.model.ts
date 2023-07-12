export class User{
    constructor(
        private _username: string,
      private  email:string,
      private _roles:[],
      private  _accessToken:string,
      private tokenType: number,
    ){}

    get accessToken(){
        return this._accessToken;
    }
    get username(){
        return this._username;
    }

    get roles(){
        return this._roles;
    }

    // get tokenExpirationTime(){
    //     return this.accessToken;
    // }
}