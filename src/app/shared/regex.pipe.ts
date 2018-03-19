import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regex'
})
export class RegexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args){
      let regex = new RegExp(args);
      let m = regex.exec(value);
      if(m!==null){
         return m.entries().next().value[1];
      }
      
    }
    return value;

  }

}
