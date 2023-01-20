import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecaptchaResponse } from '../models/recaptcha-response';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
    private headers: HttpHeaders;

    url = "https://www.google.com/recaptcha/api/siteverify";

    constructor(private http: HttpClient) {
    }

    // For the recaptcha to be relevant, must verify the token provided.
    verifyRecaptcha(token: string) : Observable<RecaptchaResponse> {
        this.headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.post<RecaptchaResponse>(this.url, `secret=${environment.recaptcha.secretKey}&response=${token}`, {headers: this.headers});
    }
}