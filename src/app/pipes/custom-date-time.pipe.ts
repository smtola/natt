import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({ name: 'customDateTime' })
export class CustomDateTimePipe implements PipeTransform{
  transform(value: any, format: string = 'yyyy-MM-dd h:mm a', ...args: unknown[]): unknown {
    return !value ? '-' : new DatePipe('en-US').transform(value, format);
  }
}
