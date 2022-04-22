import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type TLog = 'text' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public text(...value: any) {
    if(environment.production) return;
    console.log(value);
  }
  public warn(...value: any) {
    if(environment.production) return;
    console.warn(value);
  }
  public error(...value: any) {
    if(environment.production) return;
    console.error(value);
  }
}
