import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'helpFilter'
})

export class HelpFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      return  pipeData.filter((eachItem)=> {
        return  eachItem['helpQuestion'].toLowerCase().includes(" ");
      });
    }
		
    return  pipeData.filter((eachItem)=> {
      return  eachItem['helpQuestion'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}