import { Team } from "./team.model";

export class TeamWrapped {
  _embedded!: {
    team: Team[]
};
}