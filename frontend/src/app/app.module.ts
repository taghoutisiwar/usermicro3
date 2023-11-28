import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeTeamComponent } from './list-team/list-team.component';
import { LoginComponent } from './login/login.component';
import { SearchNameComponent } from './search-name/search-name.component';
import { SearchTeamComponent } from './search-team/search-team.component';
import { TokenInterceptor } from './services/token.interceptor';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeesComponent,
    UpdateEmployeeComponent,
    LoginComponent,
    ForbiddenComponent,
    SearchNameComponent,
    SearchTeamComponent,
    ListeTeamComponent,
    UpdateTeamComponent,
    AddRoleUserComponent,
    AddUserComponent,
    VerificationcodeComponent,
    ListeUsersComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
    ],

  bootstrap: [AppComponent],
})
export class AppModule { }
