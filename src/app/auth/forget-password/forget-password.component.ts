import { Component } from '@angular/core';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
    standalone: false
})
export class ForgetPasswordComponent {

    email!: string;

    resetPassword() {}

}
