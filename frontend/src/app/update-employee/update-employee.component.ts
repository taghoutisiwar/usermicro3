import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../model/team.model';
import { Employees } from 'src/model/employees.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent  implements OnInit {
  currentEmployee = new Employees();
  emptyTeam = new Team();
  Team!: any;
  updateidt!: number;
  employeeclasses! : Team[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
  ) {
    this.Team = this.employeeService.listeTeam();
  }

  ngOnInit(): void {
    this.emptyTeam.nomTeam = "";
    this.emptyTeam.descriptionTeam = "";
    this.emptyTeam.idt = 0;
    this.employeeService.listeTeam().subscribe((data: any) => {
      this.Team = data;
    });
    this.employeeService
      .consulterEmployee(this.activatedRoute.snapshot.params['id'])
      .subscribe((data: any) => {
        this.currentEmployee = data;
        this.updateidt = this.currentEmployee.team.idt;
      });
  }

  updateEmployee() {
    this.currentEmployee.team = this.Team.find((tclass: { idt: Number; }) => tclass.idt == this.updateidt);

    this.employeeService.updateEmployee(this.currentEmployee).subscribe((prod: any) => {
      this.router.navigate(['/employees']);
    });
  }

}