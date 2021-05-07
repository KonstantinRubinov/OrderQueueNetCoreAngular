import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';
import { User } from 'src/app/models/User';
import { Store } from 'src/app/redux/store';
import { UserService } from 'src/app/services/ApiConnections/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  private unsubscribe:Unsubscribe;
  public userToAdd:User = new User();
  public addUserError="";
  
  constructor(private userService: UserService,
              private redux:NgRedux<Store>) { }
  

  public ngOnInit() {
    this.unsubscribe = this.redux.subscribe(()=>{
      if (this.redux.getState().addUserError!=null && this.redux.getState().addUserError!==''){
        this.addUserError = this.redux.getState().addUserError;
      }
    });
  }
  
  public AddToOrder(): void {
    this.userToAdd.userTime=new Date().getTime();
    this.userService.AddUser(this.userToAdd) ;
  }
  
  public ngOnDestroy(): void {
    this.unsubscribe();
  }
}