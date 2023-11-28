import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from 'src/model/employees.model';
import { Team } from 'src/model/team.model';
import { AuthService } from './auth.service';
import { User } from 'src/model/user.model';
import { Role } from 'src/model/role.model';
import { TeamWrapped } from 'src/model/TeamWrapped';
import { Image } from 'src/model/image.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  apiUrl = 'http://localhost:8888/employees/api';
  apiURLd = 'http://localhost:8888/employees/api/team';
  apiURLUser = 'http://localhost:8081/users';

  Employees!: Employees[];
  Team!: Team[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeEmployees(): Observable<Employees[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Employees[]>(this.apiUrl + "/all", { headers: httpHeaders });
  }

  ajouterEmployee(prod: Employees): Observable<Employees> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Employees>(this.apiUrl + "/addemployee", prod, { headers: httpHeaders });
  }

  deleteEmployee(id: number) {
    const url = `${this.apiUrl}/delemployee/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterEmployee(id: number): Observable<Employees> {
    const url = `${this.apiUrl}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Employees>(url, { headers: httpHeaders });
  }

  updateEmployee(prod: Employees): Observable<Employees> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Employees>(this.apiUrl + "/updateemployee", prod, { headers: httpHeaders });
  }

  trierDrugs() {
    this.Employees = this.Employees.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  listeTeam(): Observable<TeamWrapped> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<TeamWrapped>(this.apiURLd, { headers: httpHeaders });
  }

  consulterTeam(id: number): Team {
    return this.Team.find((d) => d.idt == id)!;
  }

  rechercheTeam(idcla: number): Observable<Employees[]> {
    const url = `${this.apiUrl}/team/${idcla}`;
    return this.http.get<Employees[]>(url);
  }

  rechercherParNomemployees(genericName: string): Observable<Employees[]> {
    const url = `${this.apiUrl}/genericname/${genericName}`;
    return this.http.get<Employees[]>(url);
  }

  ajouterTeam(item: Team): Observable<Team> {
    return this.http.post<Team>(this.apiURLd, item, httpOptions);
  }

  updateTeam(item: Team): Observable<Team> {
    return this.http.put<Team>(this.apiURLd, item, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrl + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
    const url = `${this.apiUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageVid(file: File, filename: string, idDru:number): Observable<any>{
    const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiUrl + '/image/uploadImageDru'}/${idDru}`;
      return this.http.post(url, imageFormData);
    }

  supprimerImage(id : number) {
    const url = `${this.apiUrl}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  listeUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUser+ "/all");
  }

  addUser(user: any) {
      return this.http.post(`${this.apiURLUser}/add`, user);
  }

  getAllRoles() {
      return this.http.get(`${this.apiURLUser}/allRoles`);
  }

  findRoleById(id: number): Observable<Role> {
    const url = `${this.apiURLUser}/findRoleById/${id}`;
    return this.http.get<Role>(url);
  }


}