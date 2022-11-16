import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      encomienda: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });

  ngOnInit(): void {
  }

  store(){
    let servicio = new ServicioModel();
    servicio.origen = this.fgValidacion.controls["origen"].value as string;
    servicio.destino = this.fgValidacion.controls["destino"].value as string;
    servicio.fecha = this.fgValidacion.controls["fecha"].value as string;
    servicio.hora = this.fgValidacion.controls["hora"].value as string;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value as string;
    servicio.valor = this.fgValidacion.controls["valor"].value as string;

    this.servicioService.store(servicio).subscribe((data: ServicioModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}