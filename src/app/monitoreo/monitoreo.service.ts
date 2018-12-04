import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Owner} from '../owners/owner';
import {MonitoreoRegionRequest} from './monitoreoRegionRequest';
import {FiltroRequest} from './filtroRequest';

import {Reporte} from '../owners/reporte';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class MonitoreoService {

	private entity_url = environment.REST_API_URL + 'monitoreo';

  constructor(private _http: Http) { }

  getReportesAprobados(): Observable<Reporte[]> {
    return this._http.get(environment.REST_API_URL + '/owners/reportes/estado/aprobado')
      .map((response: Response) => <Reporte[]> response.json())
      .catch(this.handleError);
  }

  getReportesPendiente(): Observable<Reporte[]> {
    return this._http.get(environment.REST_API_URL + '/owners/reportes/estado/pendiente')
      .map((response: Response) => <Reporte[]> response.json())
      .catch(this.handleError);
  }

   monitorRegionRequest(monitorRegion: MonitoreoRegionRequest): Observable<MonitoreoRegionRequest> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Imprimiendo la url validacion" + this.entity_url);
    console.log("Objeto: " + JSON.stringify(monitorRegion));
    return this._http.post(this.entity_url + '/monitoreo-region', JSON.stringify(monitorRegion), {headers})
      .map((response: Response) => response)
      .catch(this.handleError);
  }

   monitorDelitoRequest(monitorRegion: MonitoreoRegionRequest): Observable<MonitoreoRegionRequest> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Imprimiendo la url validacion" + this.entity_url);
    console.log("Objeto: " + JSON.stringify(monitorRegion));
    return this._http.post(this.entity_url + '/monitoreo-delito', JSON.stringify(monitorRegion), {headers})
      .map((response: Response) => response)
      .catch(this.handleError);
  }

    monitorRegionRespons(any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Imprimiendo la url validacion" + this.entity_url);
    console.log("Objeto: " + JSON.stringify(any));
    return this._http.post(this.entity_url + '/monitoreo-region', JSON.stringify(any), {headers})
      .map((response: Response) => <Reporte[]> response.json())
      .catch(this.handleError);
  }

   monitorDelitoRespons(any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Imprimiendo la url validacion" + this.entity_url);
    console.log("Objeto: " + JSON.stringify(any));
    return this._http.post(this.entity_url + '/monitoreo-delito', JSON.stringify(any), {headers})
      .map((response: Response) => <Reporte[]> response.json())
      .catch(this.handleError);
  }

   filtroRequest(filtroRequest: FiltroRequest): Observable<Reporte[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    console.log("Imprimiendo la url validacion" + environment.REST_API_URL);
    console.log("Objeto: " + JSON.stringify(filtroRequest));
    return this._http.post(environment.REST_API_URL + '/filtro/avanzado/back', JSON.stringify(filtroRequest), {headers})
      .map((response: Response) => <Reporte[]> response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.log('handleError log: ');
    let errMsg: string;
    if (error instanceof Response) {
      if (!(error.text() === '' )) {  // if response body not empty
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        console.log('binding errors header not empty');
        errMsg = error.headers.get('errors').toString();
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
