import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../../model/team.model';
import { Router } from '@angular/router';
import{ListeTeamComponent} from '../list-team/list-team.component'

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  @Input()
  team!: Team;
  @Output()
  updatedteam = new EventEmitter<Team>();

  @Input()
  ajout!: boolean;

  constructor(
    private ListeTeamComponent: ListeTeamComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.team);
    console.log(this.ajout);
  }

  saveTeam() {
    this.updatedteam.emit(this.team);
    if (this.ajout) this.ListeTeamComponent.ajoutTeam();
    else this.ListeTeamComponent.updatedTeam();
    this.router.navigate(['liste-team']);
  }
}