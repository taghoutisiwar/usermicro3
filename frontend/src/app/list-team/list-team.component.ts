import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/team.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListeTeamComponent implements OnInit  {
  teams!: Team[];
  tclass!: any;
  team!: Team;
  updatedteam!: Team ;
  ajout: boolean = true;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.listeTeam().subscribe((tclass) => {
      console.log(tclass);
      this.tclass = tclass;
    });
  }

  ajoutTeam() {
    this.employeeService.ajouterTeam(this.updatedteam).subscribe((employee) => {
        console.log(employee);
        this.router.navigate(['employees']);
    });
  }

  update(teams: Team) {
    this.updatedteam = teams;
    this.ajout = false;
  }

  updatedTeam() {
    this.employeeService.updateTeam(this.updatedteam).subscribe((employee) => {
        console.log(employee);
        this.router.navigate(['liste-employees-class']);
      });
  }
}

