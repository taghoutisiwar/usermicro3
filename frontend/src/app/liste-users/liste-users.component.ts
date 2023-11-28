import { Component , OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { User } from 'src/model/user.model';
import { Role } from 'src/model/role.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit{

  users? : User[];
  roles?: Role[];

  constructor( private employeeService: EmployeeService ,private a:AuthService) {}

  ngOnInit(): void {
    this.chargerUsers();
    console.log(this.users);
  }

  chargerUsers() {
    this.employeeService.listeUser().
    subscribe((users:any)=>{
    console.log(users);
    this.users=users;
    });
  }


  deleteUser(id: number) {
    const confirmed = confirm("Are you sure you want to delete this user?");
  
    if (confirmed) {
      this.a.deleteUser(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        err => {
          if (err.status !== 200) {
            alert("An error occurred while deleting the user.");
          }
        }
      );
    }
  }

}
