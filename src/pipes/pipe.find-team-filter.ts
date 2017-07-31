import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findTeamFilter'
})

export class FindTeamFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      
      return null;
    }
		
    return  pipeData.filter((eachItem)=> {
      return  eachItem['teamName'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}