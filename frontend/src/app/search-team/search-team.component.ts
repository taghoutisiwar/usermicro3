import { Component } from '@angular/core';
import { Team } from '../../model/team.model';
import { Employees } from 'src/model/employees.model';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.css']
})
export class SearchTeamComponent {
  employees!: Employees[];
  Team: any;
  teams!: Team[];
  idt!: number;
  team: any;

  constructor(private employeeService: EmployeeService, public AuthService: AuthService) {
    this.Team = this.employeeService.listeTeam();
  }

  ngOnInit(): void {
    this.employeeService.listeTeam().subscribe((team: any) => {
      console.log(team);
      this.Team = team;
    });
  }

  deleteEmployee(d: number) {
    let conf = confirm('Are you sure?');
    if (conf) {
      this.employeeService.deleteEmployee(d);
    }
  }

  onChange() {
    this.employeeService.rechercheTeam(this.idt).subscribe((teams) => {
      console.log(teams);
      this.employees = teams;
    });
  }
}

