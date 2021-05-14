import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  apiURL: string = environment.apiURL

  constructor( private http : HttpClient) { 

    

  }


  getClientes() :  Observable<Cliente[]>{

    return this.http.get<Cliente[]>(`${this.apiURL}/clientes/`);
  }

  salvar( cliente : Cliente) : Observable<Cliente>{

    return this.http.post<Cliente>(`${this.apiURL}/clientes/`,cliente)
  

  }

  editar( cliente : Cliente) : Observable<any>{

    return this.http.put<any>(`${this.apiURL}/clientes/${cliente.id}`,cliente)
  

  } 


  getClienteById(id : number) : Observable<Cliente> {

    return this.http.get<any>(`${this.apiURL}/clientes/${id}`);

  }

  deletar( cliente : Cliente) : Observable<any>{

    return this.http.delete<any>(`${this.apiURL}/clientes/${cliente.id}`)
  

  } 

}
