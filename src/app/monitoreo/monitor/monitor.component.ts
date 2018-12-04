/**
 * @author Honda System
 */


import {Component, OnInit} from '@angular/core';
import {MonitoreoService} from '../monitoreo.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reporte} from '../../owners/reporte';
import {MonitoreoRegionRequest} from '../monitoreoRegionRequest';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
   errorMessage: string;
   reportes: Reporte[];
   monitorRegion: MonitoreoRegionRequest;


  constructor(private route: ActivatedRoute, private monitoreoService: MonitoreoService, private router: Router) { 
   this.monitorRegion = <MonitoreoRegionRequest>{};
  }
 
  ngOnInit() {

    document.getElementById("pieDePagina").style.display='none';

    console.log("Pidiendo los reportes...");
    this.monitoreoService.getReportesPendiente().subscribe(
      reportes => this.reportes = reportes,
      error => this.errorMessage = <any> error);
  }

    onSubmit(monitorRegion: MonitoreoRegionRequest) {
    var that = this;
    console.log("Monitoreo distrito..."+monitorRegion.distrito);
    console.log("Monitoreo departamento..."+monitorRegion.departamento);
    this.monitoreoService.monitorRegionRequest(monitorRegion).subscribe(
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
      if (update_status.status === 200) {
        console.log('update success');
         that.gotoMonitoreoReportDetailRegion(monitorRegion);
      } else {
        return console.log('update failed');
      }
    }

  };

    onSubmit2(monitorRegion: MonitoreoRegionRequest) {
    var that = this;
     monitorRegion.distrito = "ninguno";
    console.log("Monitoreo delito extra..."+monitorRegion.distrito);
    console.log("Monitoreo delito tipo..."+monitorRegion.departamento);
    this.monitoreoService.monitorDelitoRequest(monitorRegion).subscribe(
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
      if (update_status.status === 200) {
        console.log('update success');
         that.gotoMonitoreoReportDetailDelito(monitorRegion);
      } else {
        return console.log('update failed');
      }
    }

  };

    gotoMonitoreoReportDetailRegion(monitorRegion: MonitoreoRegionRequest) {
     this.router.navigate(['/monitoreo/region/'+ monitorRegion.distrito]);
     console.log("impresss :" + monitorRegion.distrito);
     location.reload(); 
  }


    gotoMonitoreoReportDetailDelito(monitorRegion: MonitoreoRegionRequest) {
     this.router.navigate(['/monitoreo/delito/'+ monitorRegion.departamento]);
     console.log("impresss :" + monitorRegion.departamento);
     location.reload(); 
  }


}