import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'


@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes : Cliente[] = []
  servico : ServicoPrestado

  sucessoSalvaCliente : boolean = false;
  errors ?: String[];

  constructor(
    private clienteService : ClientesService,
    private servicoPrestadoService : ServicoPrestadoService
  ) { 

    this.servico = new ServicoPrestado()

  }

  ngOnInit(): void {

    this.clienteService.getClientes()
                        .subscribe ( response => this.clientes = response)

  }

  onSubmit(){
    this.servicoPrestadoService.salvar(this.servico)
                                .subscribe(
                                  response => {
                                    this.sucessoSalvaCliente = true;
                                    this.errors = [];
                                    this.servico = new ServicoPrestado()
                                  },
                                  errorReponse => {
                                    this.errors = errorReponse.error.errors;
                                    this.sucessoSalvaCliente = false;
                                  }  
                                )
  }

}
