import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleFilter'
})

export class SearchScheduleFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      return  pipeData.filter((eachItem)=> {
        return  eachItem;
      });
    }
		
    return  pipeData.filter((eachItem)=> {
      return  eachItem['scheduleOpponent'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['scheduleDate'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['scheduleTime'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['scheduleLocation'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
              eachItem['scheduleHomeOrAway'].toLowerCase().includes(pipeModifier.toLowerCase());
      ;
    });
  }
}