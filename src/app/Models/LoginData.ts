import { Language } from './Language';
export class LoginData {
    token: string = null;
    expiredOn: Date = null;
    name: string = null;
    language:Language;
}
