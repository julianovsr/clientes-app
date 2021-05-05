import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente'
import { ClientesService } from '../../clientes.service'

import { ActivatedRoute, Router } from '@angular/router'

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente!: Cliente;

  sucessoSalvaCliente : boolean = false;



  errors ?: String[];

  id ?: number;

  constructor(  private clientesService : ClientesService, 
                private router : Router,
                private activatedRoute : ActivatedRoute
              
              ) {this.cliente = new Cliente()}

  ngOnInit(): void {
    let params = this.activatedRoute.params
    params.subscribe( urlParams => {
      this.id = urlParams['id']
      if(this.id){
        this.clientesService.getClienteById(this.id)
        .subscribe(

          response => this.cliente = response,
          responseError => this.cliente = new Cliente ()

        )
      }
      

    })



  }

  onSubmit(){

    this.clientesService.salvar(this.cliente)
    .subscribe( response => {
      this.cliente = response
      this.sucessoSalvaCliente = true;
      this.errors = [];
    },
       errorReponse => {
         this.errors = errorReponse.error.errors;
         this.sucessoSalvaCliente = false;
       }     
      )

  }
  
  irParaListaClientes(){

    this.router.navigate(['/clientes-lista'])

  }
  
  salvarCliente(){

    this.clientesService.editar(this.cliente)
    .subscribe(

      response => {
        this.sucessoSalvaCliente = true;
        this.errors = [];
      },
      errorReponse => {
        this.errors = errorReponse.error.errors;
        this.sucessoSalvaCliente = false;
      }  

    )

  }

  

}
