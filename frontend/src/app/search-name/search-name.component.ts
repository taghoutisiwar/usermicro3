import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/team.model';
import { Employees } from 'src/model/employees.model';
import { EmployeeService } from '../services/employee.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html',
  styleUrls: ['./search-name.component.css']
})
export class SearchNameComponent implements OnInit {
  employees!: Employees[];
  genericName!: string;
  searchTerm!: string;
  allEmployees!: Employees[];
  team! :Team[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.listeEmployees().subscribe((data: any) => {
      this.allEmployees = data;
    });
  }

  onChange() {

  }

  onkeyUp(text:String)
  {
    console.log(text);
    this.employees=this.allEmployees.filter(item=>item.Nom.toLowerCase().includes(text.toLowerCase()));

  }

}
