/**
 * @author Honda System
 */

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {MonitoreoService} from '../monitoreo.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reporte} from '../../owners/reporte';
import {MonitoreoRegionRequest} from '../monitoreoRegionRequest';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-monitore-region',
  templateUrl: './monitore-region.component.html',
  styleUrls: ['./monitore-region.component.css']
})
export class MonitoreRegionComponent implements OnInit {
   errorMessage: string;
   reportes: Reporte[];
   reportes2: Reporte[];
   report: Reporte;
   nombss: any[];
   mensaje = '';
   vel = '';
   valeria;
   
   va:string = "";

  // lineChart NUMERO= Cantidad de reportes 
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Asalto a transeuntes'},
    {data: [14, 12, 4, 1, 5, 6, 71], label: 'Robo a casas'},
    {data: [  , 32,   ,   ,  1,   ,   ], label: 'Vandalismo'},
    {data: [21, 13, 22, 1, 3, 12, 31], label: 'Agresores'},
    {data: [28, 48, 40, 19, 86, 27, 23], label: 'Delincuencia juvenil'},
    {data: [  ,   ,   ,   ,  3,   ,   ], label: 'Consumo de drogas'},
    {data: [55, 5, 40, 4, 23, 1, 11], label: 'Otros'}
  ];
  public lineChartLabels:Array<any> = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // Radar
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
 
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private route: ActivatedRoute, private monitoreoService: MonitoreoService, private router: Router) { 
  this.report =  <Reporte>{};
  }

  ngOnInit() {

    document.getElementById("pieDePagina").style.display='none';

    console.log("Calculando reportes aprobados...");
    this.monitoreoService.getReportesAprobados().subscribe(
      reportes => {
        this.reportes = reportes;
         this.reportesPendientes(reportes);
      },
    
      error => this.errorMessage = <any> error
      );

      this.monitoreoService.getReportesPendiente().subscribe(
      reportes => this.reportes = reportes,
      error => this.errorMessage = <any> error
      );

    /// para un reporte en especifico
    const region = this.route.snapshot.params['region'];
    var res = region.replace("%20", " ");
    console.log("Remplazado: "+res);
    this.mensaje = res;  
    const region_def = {"departamento": "region", "distrito": res};
    console.log("Convertiendo a json..."+ JSON.stringify(region_def));
    this.monitoreoService.monitorRegionRespons(region_def).subscribe(
      reportes2 => this.reportes2 = reportes2,
      error => this.errorMessage = <any> error
      );

  }

   salvador (aa:number) {
   	    console.log("Cantidad total Delincuencia juvenil h :" + aa);

        return aa;
   }

   reportesPendientes(reportes) {
  	 console.log(reportes);
  	     var contador = 0;
  	 
		for (let i in reportes) {

		      if ( reportes[i].tipo_delito == "Delincuencia juvenil") {
		        contador++
		      }
	}
       var valeriae = reportes[0].tipo_delito;

       nombss => this.nombss = [1,1,1,1,1,1,1];

   console.log("Cantidad total Delincuencia juvenil :" + contador);
         this.salvador(contador)
  } 


   doughnutChartLabels:string[] = ['Asalto a transeuntes', 'Robo a casas','Vandalismo', 'Agresores', 'Delincuencia juvenil', 'Consumo de drogas', 'Otros'];
   doughnutChartData:number[] = this.nombss;
   doughnutChartType = 'doughnut';

  /*@ViewChild('content') content: ElementRef;
  public downloadPDF() {
   
   let doc = new jsPDF();
   let specialElementHandlers = {
   	'#editor': function(element, renderer) {
   		return true;
   	}
   };
   
   let content = this.content.nativeElement;

   doc.fromHTML(content.innerHTML, 15, 15, {
   	'width': 190,
   	'elementHandlers': specialElementHandlers
   });

   doc.save('reportes.pdf');
  }*/

}

