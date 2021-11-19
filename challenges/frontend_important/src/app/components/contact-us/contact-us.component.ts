import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RecaptchaComponent, ReCaptchaV3Service } from 'ng-recaptcha';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { RecaptchaResponse } from 'src/app/models/recaptcha-response';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userMessage: string;
  userRecaptchaResponse: Object;
  userRecaptchaResponse$: Observable<RecaptchaResponse>

  constructor(private dialogRef: MatDialogRef<ContactUsComponent>,
              private recaptchaV3Service: ReCaptchaV3Service,
              private contactService: ContactFormService
    ) {
  }

  // Send Contact Us form information to the console.
  public submitContact(first: string, last: string, email: string, message: string){
    console.log("User First Name: ",first);
    console.log("User Last Name: ",last);
    console.log("User Email: ",email);
    console.log("User Message: ",message);
  }

  subscribeToRecaptchaResponse() {
    this.userRecaptchaResponse = this.userRecaptchaResponse$.subscribe(recaptchaResponse => 
      {
        // Make sure there is a Recaptcha verification response
        if (recaptchaResponse != null) {
          // Recaptcha verification succeeded
          if (recaptchaResponse.success && recaptchaResponse.score > 0.5) {
            this.submitContact(this.userFirstName,this.userLastName,this.userEmail,this.userMessage);
            this.dialogRef.close();
          }
          // Recaptcha verification failed
          else {
            this.dialogRef.close();
          }
        }
      },
      (error) =>
      {
        console.log(error);
      },
      () =>{}
    )
  }

  public onClickSubmit(form: NgForm): void {
    // Get a Recaptcha token to send for verification
    this.recaptchaV3Service.execute('submit_form')
    .subscribe((token: string) => {
      this.userRecaptchaResponse$ = this.contactService.verifyRecaptcha(token);
      // Decide whether or not to submit contact-us form based on the results of the Recaptcha verification.
      this.subscribeToRecaptchaResponse();
    });
  }
}

