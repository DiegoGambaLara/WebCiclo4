import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncomiendaModel } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      descripcion: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
    });

  ngOnInit(): void {
  }

  store(){
    let encomienda = new EncomiendaModel();
    encomienda.descripcion = this.fgValidacion.controls["descripcion"].value as string;
    encomienda.peso = this.fgValidacion.controls["peso"].value as string;
    encomienda.tipo = this.fgValidacion.controls["tipo"].value as string;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value as string;
 
    this.encomiendaService.store(encomienda).subscribe((data: EncomiendaModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/encomiendas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
