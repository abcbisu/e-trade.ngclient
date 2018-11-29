export class LoginData {
    token: string = null;
    expiredOn: Date = null;
    name:string=null;
}
export class OtpResponse {
    ExpiredOn: Date = null;
    NextOtpSendOn: Date = null;
}
export class UserToken {
    Token: string = null;
    ExpiredOn: Date = null;
}

export class RspLogin{
        public  Exec: boolean; 
        public  HasPendingCommand: boolean; 
        public  PendingCommnad: string; 
        public  CommanDescription: string; 
        public  Result :any;
}