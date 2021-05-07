import { User } from '../models/User';

export class Store{
    public user:User;
    public users:User[]=[];
    
    public addUserError:string;
    public callNextUserError:string;
    public listOfWaitingUsersError:string;
}