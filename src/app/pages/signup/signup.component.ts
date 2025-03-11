import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  cpf: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.email]),
        cpf: new FormControl('',[Validators.required, Validators.minLength(11)]),
        password: new FormControl('',[Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(6)]),
      })
  }

  submit(){
    this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toastService.success("Login feito com Sucesso ! "),
      error: () => this.toastService.error("Erro ! ")
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }


}

