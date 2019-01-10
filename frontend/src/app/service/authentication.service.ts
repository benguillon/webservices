import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    uri = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.uri}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                console.log("fonction login pipe");
                console.log(user);
                console.log(user.user.token);
                // login successful if there's a jwt token in the response
                if (user && user.user.token) {
                    console.log("DANS LE IF");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}