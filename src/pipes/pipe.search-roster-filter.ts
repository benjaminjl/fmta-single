import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rosterFilter'
})

export class SearchRosterFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      return  pipeData.filter((eachItem)=> {
        return  eachItem['rosterName'].toLowerCase().includes(" ");
      });
    }
		
    return  pipeData.filter((eachItem)=> {
      return  eachItem['rosterName'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['rosterNumber'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['rosterGrade'].toLowerCase().includes(pipeModifier.toLowerCase()) || 
              eachItem['rosterPosition'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}