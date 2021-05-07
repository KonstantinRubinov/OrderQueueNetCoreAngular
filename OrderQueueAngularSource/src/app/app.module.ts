import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { Store } from './redux/store';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { Reducer } from './redux/reducer';

import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './modules/routing.module';
import { AddUserComponent } from './components/data-elements/add-user/add-user.component';
import { CallNextUserComponent } from './components/data-elements/call-next-user/call-next-user.component';
import { ListOfWaitingUsersComponent } from './components/data-elements/list-of-waiting-users/list-of-waiting-users.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AddUserComponent,
    CallNextUserComponent,
    ListOfWaitingUsersComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [ ],
  bootstrap: [LayoutComponent]
})
export class AppModule { 
  public constructor(redux:NgRedux<Store>){
    redux.configureStore(Reducer.reduce, new Store());
  }
}