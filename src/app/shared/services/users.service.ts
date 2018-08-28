import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { }
    getUsersByServer(email: string): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users?email=${email}`).pipe(
            map((user: User[]) => user[0] ? user[0] : undefined)
        );
    }
}