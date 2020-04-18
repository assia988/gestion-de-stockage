import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = []
;
@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
