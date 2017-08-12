import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byTeamTypeFilter'
})

export class ByTeamTypeFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return [];
    }

    if (pipeModifier==null || pipeModifier=="") {
      
      return [];
    }
		
    return  pipeData.filter((eachItem)=> {
      return  eachItem['teamType'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}