import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from 'src/model/employees.model';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Image } from 'src/model/image.model';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees!: Employees[];
  apiURL = 'http://localhost:8888/employees/api/image';

  constructor(
    public employeeService: EmployeeService,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.listeEmployees().subscribe((employee) => {
      console.log(employee);
      this.employees = employee;

      this.employees.forEach((employee) => {
        this.http.get<Image[]>(this.apiURL + "/getImagesEmp/" + employee.id).subscribe((images) => {
          employee.images = images;
          employee.imageStr = 'data:' + employee.images[0].type + ';base64,' + employee.images[0].image;
        });
      });
    });
  }

  deleteEmployee(e: number) {
    let confirmDelete = confirm('Are you sure?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(e).subscribe(() => {
        console.log('Employee deleted');
        this.loadEmployees();
      });
    }
  }
}
