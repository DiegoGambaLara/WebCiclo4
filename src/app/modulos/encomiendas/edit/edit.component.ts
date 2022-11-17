import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncomiendaModel } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
    });

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id)
  }

  getWithId(id: string){
    this.encomiendaService.getWithId(id).subscribe((data: EncomiendaModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["descripcion"].setValue(data.descripcion as string)
      this.fgValidacion.controls["peso"].setValue(data.peso as string)
      this.fgValidacion.controls["tipo"].setValue(data.tipo as string)
      this.fgValidacion.controls["presentacion"].setValue(data.presentacion as string)
    })
  }

  edit(){
    let encomienda = new EncomiendaModel();
    encomienda.id = this.fgValidacion.controls["id"].value as string;
    encomienda.descripcion = this.fgValidacion.controls["descripcion"].value as string;
    encomienda.peso = this.fgValidacion.controls["peso"].value as string;
    encomienda.tipo = this.fgValidacion.controls["tipo"].value as string;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value as string;
 
    this.encomiendaService.update(encomienda).subscribe((data: EncomiendaModel)=> {
      Swal.fire('Encomienda Editada Correctamente!', '', 'success')
      this.router.navigate(['/encomiendas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
