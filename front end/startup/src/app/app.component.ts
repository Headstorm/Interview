import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private reCaptchaV3Service: ReCaptchaV3Service, private http: HttpClient
  ) { }
  title = 'startup';
  model = {
    name: '',
    email: '',
    city: '',
    state: ''
  };
  async reCaptcha(f: NgForm) {
    const me = this;
    try  {
      this.reCaptchaV3Service.execute('6Lfxj6MUAAAAAGkYKzwNdtnX8Q1x7cktwy2dOOxb', 'homepage', async (token) => {
        if (token) {
          alert('Name: ' + me.model.name + '\n' + 'Email: ' + me.model.email + '\n' + 'City: '
          + me.model.city + '\n' + 'State: ' + me.model.state);
        }
      }, {
          useGlobalDomain: false
      });
    } catch (e) {
      alert(e);

    }
  }
}
