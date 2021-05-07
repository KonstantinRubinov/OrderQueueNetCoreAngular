import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/action-type';
import { Store } from '../../redux/store';
import { NgRedux } from 'ng2-redux';
import { User } from '../../models/User';
import { LogService } from '.././log.service';
import { usersUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient,
                     private redux: NgRedux<Store>,
                     private logger: LogService) { 
  }
  
  public AddUser(user:User): void {
    let he = new HttpHeaders({'Content-Type':  'application/json'});
    let observable = this.http.post<User>(usersUrl, user, { headers: he });
    observable.subscribe(user=>{
      const action: Action={type:ActionType.AddUser, payload:user};
      this.redux.dispatch(action);
      this.logger.debug("addUser: ", user);
    }, error => {
      this.logger.error("addUserError: ", error.message);
    });
  }

  public CallNextUser(): void {
    let he = new HttpHeaders({'Content-Type':  'application/json'});
    let observable = this.http.get<User>(usersUrl, { headers: he });
    observable.subscribe(user=>{
      const action: Action={type:ActionType.CallNextUser, payload:user};
      this.redux.dispatch(action);
      this.logger.debug("callNextUser: ", user);
    }, error => {
      this.logger.error("callNextUserError: ", error.message);
    });
  }

  public ListOfWaitingUsers(): void {
    let he = new HttpHeaders({'Content-Type':  'application/json'});
    let observable = this.http.get<User[]>(usersUrl+'waiting-list', { headers: he });
    observable.subscribe(users=>{
      const action: Action={type:ActionType.ListOfWaitingUsers, payload:users};
      this.redux.dispatch(action);
      this.logger.debug("listOfWaitingUsers: ", users);
    }, error => {
      this.logger.error("listOfWaitingUsersError: ", error.message);
    });
  }
}