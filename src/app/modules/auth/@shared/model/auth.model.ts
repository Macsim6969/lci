export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationData: Date,
    private localId: string
  ) {
  }

  get token() {
    if(!this._tokenExpirationData || new Date() > this._tokenExpirationData){
      return null
    }
    return this._token;
  }

}

