import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordsMatchValidator } from '../../validators/validators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmationPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData);
      this.authService.register(formData.lastName, formData.firstName, formData.patronymic || '', formData.email, formData.password).subscribe(user => {        
        if (user) {
          console.log('Registration successful:', user);
          this.router.navigateByUrl('/products');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
