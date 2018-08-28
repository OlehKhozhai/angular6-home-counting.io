import { Message } from './../../shared/models/message.model';
import { User } from './../../shared/models/user.model';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.message = new Message('', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }

  private errorPassword(type: string, text: string) {
    this.message = new Message(type, text);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUsersByServer(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            console.log('password ok');
          } else {
            this.errorPassword('', 'Password wrong');
          }

        } else {
          this.errorPassword('', 'This Email in not exist');
        }
      });
  }
}
