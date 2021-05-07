import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';
import { User } from 'src/app/models/User';
import { Store } from 'src/app/redux/store';
import { UserService } from 'src/app/services/ApiConnections/user.service';

@Component({
  selector: 'app-list-of-waiting-users',
  templateUrl: './list-of-waiting-users.component.html',
  styleUrls: ['./list-of-waiting-users.component.css']
})
export class ListOfWaitingUsersComponent implements OnInit, OnDestroy {

  private unsubscribe:Unsubscribe;
  public users:User[]=[];
  public myHeaders = [
		"מספר תור",
		"שם לקוח",
		"שעת כניסה לתור"
  ];
  public listOfWaitingUsersError="";
  
  constructor(private userService: UserService,
              private redux:NgRedux<Store>) { }
              
  public ngOnInit() {
    this.userService.ListOfWaitingUsers();
    this.unsubscribe = this.redux.subscribe(()=>{
      if (this.redux.getState().users)
      {
        this.users = this.redux.getState().users;
      }
      if (this.redux.getState().listOfWaitingUsersError!=null && this.redux.getState().listOfWaitingUsersError!==''){
        this.listOfWaitingUsersError = this.redux.getState().listOfWaitingUsersError;
      }
    });
  }
  
  public ngOnDestroy(): void {
    this.unsubscribe();
  }

}
