import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialModule } from '../../shared/modules/material.module';
import { AllowedRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPasswordText: boolean = false;
  showRPasswordText: boolean = false;
  roles: AllowedRole[] = ['super', 'admin', 'buyer'];

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      roles: new FormControl(null),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      passwordRepeat: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  register(): void {
    this.authService.register(this.registerForm.value).subscribe((result) => {
      this.router.navigate(['/auth/login']);
    })
  }

}
