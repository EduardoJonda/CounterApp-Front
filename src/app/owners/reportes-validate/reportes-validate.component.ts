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
 * @author Honda System
 */

import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reporte} from '../../owners/reporte';
import 'rxjs/Rx';
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-reportes-validate',
  templateUrl: './reportes-validate.component.html',
  styleUrls: ['./reportes-validate.component.css']
})

export class ReportesValidateComponent implements OnInit {
  errorMessage: string;
  reportes: Reporte[];
  report: Reporte;

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) {
  this.report =  <Reporte>{};
  }

  ngOnInit() {
    
    document.getElementById("id01").style.display='block';
    document.getElementById("pieDePagina").style.display='none';

    console.log("Pidiendo los reportes...");
      /// para todos los reportes
    this.ownerService.getReportes().subscribe(
      reportes => this.reportes = reportes,
      error => this.errorMessage = <any> error
      );

      /// para un reporte en especifico
      const reporteId = this.route.snapshot.params['id'];
    this.ownerService.getReporteById(reporteId).subscribe(
      report => this.report = report,
      error => this.errorMessage = <any> error
      );

    
    document.getElementById("id01").click();

    document.getElementById("menu").click();
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

  AprobarReporte() {
    var that = this;
    const rep = this.report;
    const reportId = this.report.id;  
    const idReport = reportId.toString();

      this.ownerService.validateAproReporte(idReport, rep).subscribe(
      get_result,
      get_error
    );
    
    function get_error(error) {
      console.log(error);
      console.log('error catched');
      return this.errorMessage = <any> error;
    }

     function get_result(update_status) {
      console.log(update_status);
      if (update_status) {
        console.log('update success');
        that.aprobadoAlert();
        that.router.navigate(['/welcome']);
      } else {
        return console.log('update failed');
      }
     }
  }

  RechazarReporte() {
    var that = this;
    const reportId = this.report.id;  
    const idReport2 = reportId.toString();

    if (confirm("Esta seguro que desea eliminar?")) {
      console.log("Acabas de Eliminar "+this.report.id ); 
      this.ownerService.validateDeleteReporte(idReport2).subscribe(
      reporteValid => this.report = reporteValid,
      error => this.errorMessage = <any> error);
       that.redireccion();
    } else {
       console.log("Eliminacion cancelado"); 
    }
     
}

  redireccion() {
     this.router.navigate(['/welcome']);
  }

  aprobadoAlert() {
     document.getElementById("btnAprovar").click();
  }

  rechazadoAlert() {
     document.getElementById("btnRechazar").click();
  }

}

