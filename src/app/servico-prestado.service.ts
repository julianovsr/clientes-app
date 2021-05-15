import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment'
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servico-prestado-busca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURL

  constructor( private http : HttpClient) { }


  salvar( servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado>{

    return this.http.post<ServicoPrestado>(`${this.apiURL}/servicos-prestados/`, servicoPrestado)

  }

  buscar (nome : string, mes : number) : Observable<ServicoPrestadoBusca[]>{

     
      const httpParams= new HttpParams()
                          .set("nome",nome ? nome : "")
                          .set("mes",mes ? mes.toString() : "")

    const url = this.apiURL + "/servicos-prestados/?" + httpParams.toString()
    console.log(url)
    return this.http.get<any>(url);
  }

}
