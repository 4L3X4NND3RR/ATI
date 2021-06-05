import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  formRegistrar!: FormGroup;
  submited = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _serviceUser: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formRegistrar = this._formBuilder.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.formRegistrar.valid) {
      const user = new User();
      user.primer_nombre = this.formRegistrar.get('primer_nombre')?.value;
      user.segundo_nombre = this.formRegistrar.get('segundo_nombre')?.value;
      user.primer_apellido = this.formRegistrar.get('primer_apellido')?.value;
      user.segundo_apellido = this.formRegistrar.get('segundo_apellido')?.value;
      user.email = this.formRegistrar.get('email')?.value;
      user.password = this.formRegistrar.get('password')?.value;
      this._serviceUser.CreateUser(user).subscribe(
        () =>
          Swal.fire({
            icon: 'success',
            title: 'Registro Creado',
            text: 'Rgistro creado exitosamente',
          }).then((result: any) => {
            if (result) {
              this.route.navigate(['login']);
            }
          }),
        () =>
          Swal.fire({
            icon: 'error',
            title: 'oopps...',
            text: 'parece que no subio nada',
          })
      );
    }
  }
}
