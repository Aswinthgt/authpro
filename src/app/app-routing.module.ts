import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, 
    children: [
      {path: "", redirectTo: "login", pathMatch: "full"},
      {path: "login", component: LoginComponent},
      {path: "signup", component: SignupComponent},
      {path: "profile", component: ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
