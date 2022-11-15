import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }
    //Crear un cliente
    store(cliente: ClienteModel): Observable<ClienteModel> {
      return this.http.post<ClienteModel>(`${this.url}/clientes`, {
        cedula: cliente.cedula,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        pais: cliente.pais,
        ciudad: cliente.ciudad,
        departamento: cliente.departamento,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo
      });
    }

    //Obtiene todos los clientes
    getAll(): Observable<ClienteModel[]>{
      return this.http.get<ClienteModel[]>(`${this.url}/clientes`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    
    //Actualiza un cliente
    update(cliente: ClienteModel): Observable<ClienteModel> {
      return this.http.patch<ClienteModel>(`${this.url}/clientes/${cliente.id}`, {
        cedula: cliente.cedula,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        pais: cliente.pais,
        ciudad: cliente.ciudad,
        departamento: cliente.departamento,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
    //Elimina un cliente
    delete(id: string): Observable<ClienteModel[]>{
      return this.http.delete<ClienteModel[]>(`${this.url}/clientes/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    //Obtiene la informacion de un cliente
    getWithId(id: string): Observable<ClienteModel>{
      return this.http.get<ClienteModel>(`${this.url}/clientes/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    //Obtiene la cantidad de clientes
    getCount(): Observable<ClienteModel[]>{
      return this.http.get<ClienteModel[]>(`${this.url}/clientes/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
