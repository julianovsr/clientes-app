import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSelecionado ?: Cliente;

  mensagemSucesso ?: string;
  mensagemErro ?: string;

  constructor(private clientesService : ClientesService, private router : Router) { }

  ngOnInit(): void {

    this.clientesService.getClientes()
    .subscribe(resposta => this.clientes = resposta)

  }

  irParaNovoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente : Cliente){
    this.clienteSelecionado = cliente
  }

  deletarCliente(cliente : Cliente){

    this.clientesService.deletar(cliente)
    .subscribe(
     
      response =>  {
        this.mensagemSucesso = "Cliente deletado com sucesso!",
        this.ngOnInit()
      },
      responseError => this.mensagemErro = "Ocorreu um erro ao deletar o cliente."

    )

  }

}
