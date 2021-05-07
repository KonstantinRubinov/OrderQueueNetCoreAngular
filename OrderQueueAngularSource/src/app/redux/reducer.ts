import { Store } from "./store";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { User } from "../models/User";

export class Reducer{
    public static reduce(oldStore: Store, action:Action):Store{
        let newStore:Store = {...oldStore};
        
        switch(action.type){
            case ActionType.AddUser:
                newStore.users.push(new User(action.payload.userOrderNumber, action.payload.userName, action.payload.userTime, action.payload.userStatus));
                break;
            case ActionType.AddUserError:
                newStore.addUserError=action.payload;
                break;
                
            case ActionType.ListOfWaitingUsers:
                newStore.users=action.payload.map(x => new User(x.userOrderNumber, x.userName, x.userTime, x.userStatus));
                break;
            case ActionType.ListOfWaitingUsersError:
                newStore.listOfWaitingUsersError=action.payload;
                break;
                
            case ActionType.CallNextUser:
                newStore.user=new User(action.payload.userOrderNumber, action.payload.userName, action.payload.userTime, action.payload.userStatus);
                newStore.users.forEach( (item, index) => {
                    if(item.userOrderNumber === action.payload.userOrderNumber)
                        newStore.users.splice(index,1);
                    });
                break;
            case ActionType.CallNextUserError:
                newStore.callNextUserError=action.payload;
                break;
                
            default:
                break;
        }
        return newStore;
    }
}