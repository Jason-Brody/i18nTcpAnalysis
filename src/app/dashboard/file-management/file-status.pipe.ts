import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../services/models/FileInfo';

@Pipe({
  name: 'fileStatus'
})
export class FileStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if(args){
      switch(value){
        case 0:
          return "info";
        case 1:
          return "primary";
        case 2:
          return "warning";
        case 3:
          return "success";
        case -1:
          return "danger"
      }
    }



    return Status[value];
  }

}
