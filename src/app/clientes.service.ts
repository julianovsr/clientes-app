import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http : HttpClient) { 

    

  }


  getClientes() :  Observable<Cliente[]>{

    return this.http.get<Cliente[]>('http://localhost:8081/api/clientes/');
  }

  salvar( cliente : Cliente) : Observable<Cliente>{

    return this.http.post<Cliente>('http://localhost:8081/api/clientes/',cliente)
  

  }

  editar( cliente : Cliente) : Observable<any>{

    return this.http.put<any>(`http://localhost:8081/api/clientes/${cliente.id}`,cliente)
  

  } 


  getClienteById(id : number) : Observable<Cliente> {

    return this.http.get<any>(`http://localhost:8081/api/clientes/${id}`);

  }

  deletar( cliente : Cliente) : Observable<any>{

    return this.http.delete<any>(`http://localhost:8081/api/clientes/${cliente.id}`)
  

  } 

}
