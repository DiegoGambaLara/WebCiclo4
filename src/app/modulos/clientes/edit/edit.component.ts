import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      correo: ['', [Validators.required, Validators.email]],

    });

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id)
  }

  getWithId(id: string){
    this.clienteService.getWithId(id).subscribe((data: ClienteModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["cedula"].setValue(data.cedula as string)
      this.fgValidacion.controls["nombre"].setValue(data.nombre as string)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos as string)
      this.fgValidacion.controls["pais"].setValue(data.pais as string)
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad as string)
      this.fgValidacion.controls["departamento"].setValue(data.departamento as string)
      this.fgValidacion.controls["direccion"].setValue(data.direccion as string)
      this.fgValidacion.controls["telefono"].setValue(data.telefono as string)
      this.fgValidacion.controls["correo"].setValue(data.correo as string)
    })
  }

  edit(){
    let cliente = new ClienteModel();
    cliente.id = this.fgValidacion.controls["id"].value as string;
    cliente.cedula = this.fgValidacion.controls["cedula"].value as string;
    cliente.nombre = this.fgValidacion.controls["nombre"].value as string;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value as string;
    cliente.pais = this.fgValidacion.controls["pais"].value as string;
    cliente.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    cliente.departamento = this.fgValidacion.controls["departamento"].value as string;
    cliente.direccion = this.fgValidacion.controls["direccion"].value as string;
    cliente.telefono = this.fgValidacion.controls["telefono"].value as string;
    cliente.correo = this.fgValidacion.controls["correo"].value as string;
    
    this.clienteService.update(cliente).subscribe((data: ClienteModel)=> {
      Swal.fire('Cliente Editado Correctamente!', '', 'success')
      this.router.navigate(['/clientes/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}