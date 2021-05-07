import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// ng g m modules/routing --spec false --flat

const routes: Routes = [
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class RoutingModule { }
