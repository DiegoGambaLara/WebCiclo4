import { Component, OnInit } from '@angular/core';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private servicioService: ServicioService) { }

  listado: ServicioModel[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.servicioService.getAll().subscribe((data: ServicioModel[]) => {
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
        this.servicioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Servicio Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}

