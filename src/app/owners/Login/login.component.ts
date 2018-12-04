/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Login} from '../login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login: Login;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private router: Router) {
    this.login = <Login>{};
}
  ngOnInit() {

    // error tolerable (seleccion del menu opcion Detalle)
     

    document.getElementById("id01").style.display='block';
    document.getElementById("id01").click();

    document.getElementById("menu").click();

  }

  onSubmit(login: Login) {
    var that = this;
    this.ownerService.validacitionCredential(login).subscribe(
         get_result,
         get_error
    );

   function get_error(error) {
      console.log(error);
      console.log('error catched');
      that.mostrarText2();
      return this.errorMessage = <any> error;
    }

   function get_result(update_status) {
      console.log(update_status);
      if (update_status.status === 201) {
        console.log('update success');
        that.gotoOwnerDetail(login);
        that.mostrarText();
      } else {
        that.mostrarText2();
        return console.log('update failed');
      }
    }

  };

  gotoOwnerDetail(login: Login) {
     this.router.navigate(['/welcome']);
     console.log("impresss :" + login);
  }

   mostrarText() {
     document.getElementById("btnLoginSucces").click();
  }

   mostrarText2() {
     document.getElementById("btnLoginFailded").click();
  }

}

