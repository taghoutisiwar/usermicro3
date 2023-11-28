import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../model/team.model';
import { Role } from '../../model/role.model';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Employees } from 'src/model/employees.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.css']
})
export class AddRoleUserComponent implements OnInit {
    constructor(
      private employeeService: EmployeeService,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService
    ) {}
  
    User!: User;
    Users!: User[];
    roles!: any;
    Role!: Role;
    idOfRole!: Role;
    NewRole!: Role;
  
    RoleToRemove: Team = new Team();
  
    ngOnInit(): void {
      this.employeeService.listeEmployees().subscribe(
        (data: any) => {
          this.Users = data;
          console.log(data);
        },
        (err: any) => {
          console.log(err);
        }
      );
      this.authService.consulterUser(this.activatedRoute.snapshot.params['id']).subscribe((user) => {
        this.User = user;
        console.log(this.User);
      });
  
      this.employeeService.getAllRoles().subscribe(
        (data: any) => {
          this.roles = data;
          console.log(data);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  
    addRoleToUser() {
      console.log(this.idOfRole);
      console.log(this.activatedRoute.snapshot.params['id']);
      this.authService.AddRoleForUser(this.activatedRoute.snapshot.params['id'], this.idOfRole).subscribe((user) => {
        console.log(user);
        this.User = user;
      });
    }
  
    removeRoleFromUsers(id: number) {
      console.log('id of the role' + id);
      this.employeeService.findRoleById(id).subscribe((role) => {
        this.Role = role;
        console.log('the role' + role.role_id);
        console.log(this.activatedRoute.snapshot.params['id']);
        this.authService.removeRoleFromUser(this.activatedRoute.snapshot.params['id'], this.Role).subscribe((user) => {
          console.log(user);
          this.User = user;
        });
      });
    }
}
