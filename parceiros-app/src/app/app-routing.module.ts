import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const COMPANIES: Routes = [
  {
    path: '',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(COMPANIES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
