import { Component, OnInit } from '@angular/core';
import { FiltroRequest } from '../filtroRequest';
import {MonitoreoService} from '../monitoreo.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reporte} from '../../owners/reporte';

@Component({
  selector: 'app-filtro-avanzado',
  templateUrl: './filtro-avanzado.component.html',
  styleUrls: ['./filtro-avanzado.component.css']
})
export class FiltroAvanzadoComponent implements OnInit {
   errorMessage: string;
   reportes2: Reporte[];
   reportes: Reporte[];
   report: Reporte;
   mensaje: "";
   mensaje2: "";
   mensaje3: "";
   filtroRequest: FiltroRequest;

  constructor(private route: ActivatedRoute, private monitoreoService: MonitoreoService, private router: Router) {
   this.filtroRequest = <FiltroRequest>{};
   }

  ngOnInit() {

  	document.getElementById("pieDePagina").style.display='none';

  	  this.monitoreoService.getReportesPendiente().subscribe(
      reportes2 => this.reportes2 = reportes2,
      error => this.errorMessage = <any> error
      );

    /// para un reporte en especifico
    const region = this.route.snapshot.params['region'];
    const delito = this.route.snapshot.params['delito'];
    const fecha = this.route.snapshot.params['fecha'];
    /*
    this.mensaje = res;  
    this.mensaje2 = res2;  
    this.mensaje3 = fecha;  
*/
    if (region && delito && fecha) {
        var res = region.replace("%20", " ");
    	 var res2 = delito.replace("%20", " ");
    	 // var res3 = fecha.replace("/", "-");
    	  console.log("Remplazado res 3: "+res+" , " +res2+ " y "+fecha);
    	  // triple filtro
          var hey3 = { "region": res, "delito": res2, "fecha": fecha};
          this.monitoreoService.filtroRequest(hey3).subscribe(
	      reportes => this.reportes = reportes,
	      error => this.errorMessage = <any> error
	      );

    } else if (region && delito){
         var res = region.replace("%20", " ");
    	 var res2 = delito.replace("%20", " ");
    	 console.log("Remplazado res 2: "+res+" y " +res2);
    	 // doble filtro
    	    var hey2 = { "region": res, "delito": res2, "fecha": "ninguno"};
    	  this.monitoreoService.filtroRequest(hey2).subscribe(
	      reportes => this.reportes = reportes,
	      error => this.errorMessage = <any> error
	      );

    } else if (region) {
    	 var res = region.replace("%20", " ");
    	  console.log("Remplazado res 1: "+res);
    	  var na = "ninguno";
          var hey1 = { "region": res, "delito": "ninguno", "fecha": "ninguno"};
    	  // filtro region
    	  this.monitoreoService.filtroRequest(hey1).subscribe(
	      reportes => this.reportes = reportes,
	      error => this.errorMessage = <any> error
	      );
    } else {

    }

    const region_def = {"departamento": "region", "distrito": res};
   /* console.log("Convertiendo a json..."+ JSON.stringify(region_def));
    this.monitoreoService.monitorRegionRespons(region_def).subscribe(
      reportes => this.reportes = reportes2
      error => this.errorMessage = <any> error
      );*/
  }


    onSubmit(filtroRequest: FiltroRequest) {
    var that = this;
    console.log("Filtrado region..."+filtroRequest.region);
    console.log("Filtrado delito..."+filtroRequest.delito);
    console.log("Filtrado fecha..."+filtroRequest.fecha);

    var re = filtroRequest.region;
    var del = filtroRequest.delito;
    var fec = filtroRequest.fecha;

    if ( re == undefined && del == undefined && fec == undefined) {
    	alert("Seleccion almenos una alternativa para realizar el filtro");
    } else if ( del == undefined && fec == undefined ) {
    	var r = "region";
       this.router.navigate(['/filtro/avanzado/'+ re]);

    } else if ( fec == undefined ) {
    	this.router.navigate(['/filtro/avanzado/'+ re + '/' + del]);
    } else if (re && del && fec) {
    	var f = fec.replace("/", "-");
    	this.router.navigate(['/filtro/avanzado/'+ re + '/' + del + '/' + f ]);
    } else {

    }

  };

  gotoReportFiltrado(filtroRequest: FiltroRequest) {
    this.router.navigate(['/filtrado/avanzado/'+ filtroRequest.region]);
    console.log("Filtrado region pasando..."+filtroRequest.region);
    console.log("Filtrado delito pasando..."+filtroRequest.delito);
    console.log("Filtrado fecha pasando..."+filtroRequest.fecha);
  }

  gotoReportFiltradoDoble(filtroRequest: FiltroRequest) {
    this.router.navigate(['/filtrado/avanzado/'+ filtroRequest.region + '/'+filtroRequest.delito]);
    console.log("Filtrado region pasando..."+filtroRequest.region);
    console.log("Filtrado delito pasando..."+filtroRequest.delito);
    console.log("Filtrado fecha pasando..."+filtroRequest.fecha);
    // location.reload(); 
  }

  gotoReportFiltradoTriple(filtroRequest: FiltroRequest) {
    this.router.navigate(['/filtrado/avanzado/'+ filtroRequest.region + '/'+filtroRequest.delito+'/'+'/'+filtroRequest.fecha]);
    console.log("Filtrado region pasando..."+filtroRequest.region);
    console.log("Filtrado delito pasando..."+filtroRequest.delito);
    console.log("Filtrado fecha pasando..."+filtroRequest.fecha);
    // location.reload(); 
  }

}
