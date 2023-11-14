import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'convertHour'})

export class ConvertHourPipe implements PipeTransform{
  transform(value: any): string {
    let hours = (value / 60).toFixed(2);
    return  hours + ' h';
  }

}
