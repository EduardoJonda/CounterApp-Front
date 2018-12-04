import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitoreRegionComponent } from './monitore-region/monitore-region.component';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoService } from './monitoreo.service';
import { OwnersModule } from '../owners/owners.module';
// grafico 
import { ChartsModule } from 'ng2-charts';
import { MonitoreDelitoComponent } from './monitore-delito/monitore-delito.component';
import { FiltroAvanzadoComponent } from './filtro-avanzado/filtro-avanzado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MonitoreoRoutingModule,
    OwnersModule,
    ChartsModule
  ],
  declarations: [
   MonitorComponent,
   MonitoreRegionComponent,
   MonitoreDelitoComponent,
   FiltroAvanzadoComponent
  ],
  providers: [MonitoreoService] 
})
export class MonitoreoModule { }
