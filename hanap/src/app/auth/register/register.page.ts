import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  credentials: FormGroup;
  vPassword: boolean = false;
  isSubmitted = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private ldCtrl: LoadingController,
    private router: Router) {
    this.credentials = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ],
      ],
      // password: ['', [Validators.required]],
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      m_name: ['', [Validators.required]],
      p_number: ['', [Validators.required]],

    });
  }

  ngOnInit() {
  }

  onSubmit() {
    alert('o')
    this.isSubmitted = true;
    if (this.credentials.invalid) {
      return this.credentials.markAllAsTouched();
    } else {
      this.login();
    }
  }

  async login() {
    const loading = await this.ldCtrl.create({
      message: 'Please wait...',
      mode: 'ios'
    });
    await loading.present();
    let json = {
      email: this.credentials.value.email,
      // password: this.credentials.value.password,
      // token_name: 'stall_mobile_token',
      f_name: this.credentials.value.f_name,
      l_name: this.credentials.value.l_name,
      m_name: this.credentials.value.m_name,
      p_number: this.credentials.value.p_number,
    };
    localStorage.setItem('cred', JSON.stringify(json));
    await loading.dismiss();
    // this.authService.login(json).subscribe(
    //   async (response) => {
    //     if (response) {
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //     } else {
    //       this.helper.normalToast('Failed to login');
    //     }
    //     await loading.dismiss();
    //   },
    //   async (error) => {
    //     await loading.dismiss(); 
    //     if (error?.error?.errors) {
    //       if (error?.error?.errors?.email) {
    //         this.invalidEmail = true;
    //       } else
    //         if (error?.error?.errors?.password) {
    //           this.invalidPassword = true;
    //         } else
    //           this.helper.show_validation_errors(error);
    //     }
    //   }
    // );
  }
  forgotPassword() {
    this.navCtrl.navigateForward('/login');
  }

  get errorControl() {
    return this.credentials.controls;
  }

  changeEmail() {
    this.invalidEmail = false;
    this.invalidPassword = false;
  }
}
