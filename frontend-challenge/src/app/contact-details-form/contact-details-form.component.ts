import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../User';
import { ReCaptchaV3Service} from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
    selector: 'contact-details-form',
    templateUrl: './contact-details-form.component.html',
    styleUrls: ['./contact-details-form.component.sass']
})

export class ContactDetailsFormComponent implements OnInit {
    public tokenSubscription: Subscription;
    public recaptchaToken = ''
    public recaptchaError?: {error: any};
    recaptcha: string;
    user: User;
    contactDetailsForm: FormGroup;

    constructor(private recaptchaV3Service: ReCaptchaV3Service, private fb: FormBuilder){
    }

    createForm() {
        this.contactDetailsForm = this.fb.group({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            phoneNumber: new FormControl(null, Validators.required)
        })
    }

    executeRecaptcha(action: string){
        if (this.tokenSubscription) {
            this.tokenSubscription.unsubscribe();
          }
          this.tokenSubscription = this.recaptchaV3Service
            .execute(action)
            .subscribe(
              (token) => {
                this.recaptchaToken = token;
              },
              (error) => {
                this.recaptchaToken = "";
                this.recaptchaError = { error };
              }
            );
    }

    onSubmit(form: FormGroup) {
        this.user = new User (form.value.firstname, form.value.lastname, form.value.email, form.value.phoneNumber, this.recaptchaToken)
        console.log("User firstname: ", this.user.firstname, "\nUser lastname: ", this.user.lastname, 
                  "\nUser email: ", this.user.email, "\nUser phone number: ", this.user.phoneNumber,
                  "\nReCaptcha TokeN: ", this.recaptchaToken);
        form.reset();
    }

    public ngOnInit(): void {
      this.executeRecaptcha('executeRecaptcha');
      this.createForm();
    }
}