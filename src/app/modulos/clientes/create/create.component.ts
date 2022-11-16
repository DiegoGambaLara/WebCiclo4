import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(6)]],
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
  }

  store(){
    let cliente = new ClienteModel();
    cliente.cedula = this.fgValidacion.controls["cedula"].value as string;
    cliente.nombre = this.fgValidacion.controls["nombre"].value as string;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value as string;
    cliente.pais = this.fgValidacion.controls["pais"].value as string;
    cliente.ciudad = this.fgValidacion.controls["ciudad"].value as string;
    cliente.departamento = this.fgValidacion.controls["departamento"].value as string;
    cliente.telefono = this.fgValidacion.controls["telefono"].value as string;
    cliente.correo = this.fgValidacion.controls["correo"].value as string;
    
 
    this.clienteService.store(cliente).subscribe((data: ClienteModel)=> {
      Swal.fire('Cliente Creado correctamente!', '', 'success')
      this.router.navigate(['/cliente/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
