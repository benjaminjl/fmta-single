import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordFilter'
})

export class RecordFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
    if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      
      return null;
    }

    return  pipeData.filter((eachItem)=> {
    return  eachItem['recordTypeOfRecord'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}