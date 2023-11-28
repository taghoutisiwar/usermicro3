import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../model/team.model';
import { Employees } from 'src/model/employees.model';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css'],
})
export class AddEmployeesComponent implements OnInit {
  newEmployee = new Employees();

  Team: any;
  newidt!: number;
  newTeam!: Team;

  tclass!: Team[];

  uploadedImage!: File;
  imagePath: any;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.Team = this.employeeService.listeTeam();
  }

  ngOnInit(): void {
    this.employeeService.listeTeam().subscribe((team) => {
      console.log(team);
      this.Team = team;
    });
  }

  newEmp = new Employees();
  addEmployee() {
    this.newEmp.team = this.Team.find(
      (item: { idt: number }) => item.idt == this.newidt
    )!;

    this.employeeService.ajouterEmployee(this.newEmp).subscribe((employee) => {
      this.employeeService.uploadImageVid(this.uploadedImage, this.uploadedImage.name, employee.id!)
        .subscribe(() => {
          this.router.navigate(['employees']);
        });
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}

