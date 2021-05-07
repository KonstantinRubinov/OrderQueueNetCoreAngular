import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';
import { User } from 'src/app/models/User';
import { Store } from 'src/app/redux/store';
import { UserService } from 'src/app/services/ApiConnections/user.service';

@Component({
  selector: 'app-call-next-user',
  templateUrl: './call-next-user.component.html',
  styleUrls: ['./call-next-user.component.css']
})
export class CallNextUserComponent implements OnInit, OnDestroy {

  private unsubscribe:Unsubscribe;
  public user:User;
  public myHeaders = [
		"מספר תור",
		"שם לקוח",
		"שעת כניסה לתור"
  ];
  public callNextUserError="";
  
  constructor(private userService: UserService,
              private redux:NgRedux<Store>) { }
              
  public ngOnInit() {
    this.unsubscribe = this.redux.subscribe(()=>{
      if (this.redux.getState().user)
      {
        this.user = this.redux.getState().user;
      }
      if (this.redux.getState().callNextUserError!=null && this.redux.getState().callNextUserError!==''){
        this.callNextUserError = this.redux.getState().callNextUserError;
      }
    });
  }

  public CallNextUser(): void {
    this.userService.CallNextUser();
  }
  
  public ngOnDestroy(): void {
    this.unsubscribe();
  }
}