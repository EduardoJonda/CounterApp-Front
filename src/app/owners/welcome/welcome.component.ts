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
import {Reporte} from '../reporte';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  private page:number=0;
  private reportesPages:Array<any>;
  private pages:Array<number>;

  reportes: Reporte[];
  errorMessage: string;

  constructor(private ownerService: OwnerService, private router: Router) {}

  setPage(i, event:any) {
    event.preventDefault();
    this.page=i;
    this.getReports();
  }
  
  ngOnInit() {

    document.getElementById("pieDePagina").style.display='none';

    console.log("Pidiendo los reportes...");
   /* this.ownerService.getReportes().subscribe(
      reportes => this.reportes = reportes,
      error => this.errorMessage = <any> error);
  */
   this.getReports();
  }
     getReports() {
    this.ownerService.getReportesWithPages(this.page).subscribe(
        reportes => {
           this.reportesPages = reportes['content'];
           this.pages = new Array(reportes['totalPages']);
           console.log("imprimiendo", this.reportesPages);
           console.log("imprimiendo 2", reportes);
           console.log("imprimiendo 2", reportes);

        },
        error => this.errorMessage = <any> error);
  }   

  onSelect(reporte: Reporte) {
    this.router.navigate(['/reportes', reporte.id]);
  }





}

