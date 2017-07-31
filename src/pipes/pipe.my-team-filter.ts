import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTeamFilter',

  /* bl - declaring pure as false made took this pipe 
  from stateless to statefull; this pipe is constantly
  listening for changes to the array; we need this in 
  order for our myTeam changes to be recognized;
  Reference:  */
  pure: false
})

export class MyTeamFilterPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
		
		if (pipeData==null) {
      return null;
    }

    if (pipeModifier==null || pipeModifier=="") {
      
      return null;
    }
		
    return  pipeData.filter((eachItem) => {

      /* bl - added this if statement so that
      no error is thrown when a team object does
      not have the isMyTeam property;
      works nicely by filtering out teams that
      are not the user's default team */

      if(eachItem['isMyTeam']==null){

        return null;

      }

      else{

        return  eachItem['isMyTeam'].toLowerCase().includes(pipeModifier.toLowerCase());
      }
    });
  }
}