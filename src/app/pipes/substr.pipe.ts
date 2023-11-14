import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'substr'})

export class SubstrPipe implements PipeTransform{
  transform(value: any): string {
    let substr = value.substring(0,3);
    return  substr;
  }

}
