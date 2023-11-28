import { Team } from "./team.model";
import { Image } from "./image.model";

export class Employees {
    id! : number;
    Nom! : string;
    Prenom! : string;
    Salaire! : number ;
    DateRec! : Date ; 

    team! : Team;
    image! : Image;
    imageStr!:string
    images!: Image[];
}