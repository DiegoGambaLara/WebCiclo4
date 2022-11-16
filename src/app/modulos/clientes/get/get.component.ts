import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  listado: ClienteModel[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.clienteService.getAll().subscribe((data: ClienteModel[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Cliente Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}
