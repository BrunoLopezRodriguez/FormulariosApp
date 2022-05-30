import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup= this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern) ], ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern) ], [this.emailValidator, ] ],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider ],  ],
    password: ['', [Validators.required, Validators.minLength(6), ],  ],
    password2: ['', [Validators.required, ],  ],
  },{
   validators: [ this.vs.camposIguales('password', 'password2') ]
  });

  //emailErrorMsg: string = '';

  get emailErrorMsg():string {
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']){
      return 'El email es obligatorio';
    }else if(errors?.['pattern']){
      return 'El email no tiene formato correcto';
    }else if(errors?.['emailTomado']){
      return 'Ese email ya esta en uso';
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Bruno Lopez',
      email: 'test1@test.com',
      username: 'froskito',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido(campo : string){
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched;
  }



  submitFormulario(){

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();

  }

}
