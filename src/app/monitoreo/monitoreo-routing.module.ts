
/**
 * @author Honda System
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MonitorComponent} from './monitor/monitor.component';
import {MonitoreRegionComponent} from './monitore-region/monitore-region.component';
import {MonitoreDelitoComponent} from './monitore-delito/monitore-delito.component';
import {FiltroAvanzadoComponent} from './filtro-avanzado/filtro-avanzado.component';
const ownerRoutes: Routes = [
  {path: 'monitoreo', component: MonitorComponent},
  {path: 'monitoreo/region/:region', component: MonitoreRegionComponent},
  {path: 'monitoreo/delito/:delito', component: MonitoreDelitoComponent},
  {path: 'filtro/avanzado', component: FiltroAvanzadoComponent},
    {path: 'filtro/avanzado/:region', component: FiltroAvanzadoComponent},
    {path: 'filtro/avanzado/:region/:delito', component: FiltroAvanzadoComponent},
    {path: 'filtro/avanzado/:region/:delito/:fecha', component: FiltroAvanzadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ownerRoutes)],
  exports: [RouterModule]
})

export class MonitoreoRoutingModule {
}
