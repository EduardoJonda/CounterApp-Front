import { Component, OnInit } from '@angular/core';
import {MonitoreoService} from '../monitoreo.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reporte} from '../../owners/reporte';

@Component({
  selector: 'app-monitore-delito',
  templateUrl: './monitore-delito.component.html',
  styleUrls: ['./monitore-delito.component.css']
})
export class MonitoreDelitoComponent implements OnInit {
   errorMessage: string;
   reportes: Reporte[];
   reportes2: Reporte[];
   mensaje = '';

  constructor(private route: ActivatedRoute, private monitoreoService: MonitoreoService, private router: Router) { }

  ngOnInit() {
    
    document.getElementById("pieDePagina").style.display='none';

    console.log("Pidiendo los reportes...");
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
	    const region = this.route.snapshot.params['delito'];
	    var res = region.replace("%20", " ");
	    console.log("Remplazado: "+res);
	    this.mensaje = res;  
	    const region_def = {"departamento": "delito", "distrito": res};
	    console.log("Convertiendo a json..."+ JSON.stringify(region_def));
	    this.monitoreoService.monitorDelitoRespons(region_def).subscribe(
	      reportes2 => this.reportes2 = reportes2,
	      error => this.errorMessage = <any> error
	     );


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

   console.log("Cantidad total Vandalismo :" + contador);
  }



  // chartsjs
   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '2018'},
    {data: [28, 48, 40, 19, 86, 27, 21, 44, 12, 23, 24, 20], label: '2017'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
}
}