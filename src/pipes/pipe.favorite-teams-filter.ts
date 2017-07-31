import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoriteTeamsFilter',

  /* bl - declaring pure as false made took this pipe 
  from stateless to statefull; this pipe is constantly
  listening for changes to the array; we need this in 
  order for our favorite changes to be recognized;
  Reference:  */
  pure: false
})

export class FavoriteTeamsFilterPipe implements PipeTransform {
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
      not have the isFavoriteTeam property;
      works nicely by filtering out non-favorite
      teams */

      if(eachItem['isFavoriteTeam']==null){

        return null;

      }

      else{

        return  eachItem['isFavoriteTeam'].toLowerCase().includes(pipeModifier.toLowerCase());
      }
    });
  }
}