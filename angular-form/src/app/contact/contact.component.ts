import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact = new Contact();
  validForm: boolean = true;

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  
  ngOnInit() {
    grecaptcha.render('recaptcha', {
      'sitekey' : '6Lc-MNUUAAAAAMSwKp7owogHj6I0J8SgKZTMvtfE',
      'theme' : 'light',
      'callback' : this.recaptchaOnload
    });
  }
  
  recaptchaOnload = ()=> this.validForm = false;
  

  createContact(){
    console.log(this.contact);
    this.contact = new Contact();
    grecaptcha.reset();
    this.validForm = true;
  }
}


export class Contact{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}