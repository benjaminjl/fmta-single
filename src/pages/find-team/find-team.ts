import { Component } from '@angular/core';
import { ItemSliding, AlertController, App, NavController, NavParams, ViewController } from 'ionic-angular';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../../providers/google-sheets';
import { GlobalVarsProvider } from '../../providers/global-vars';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';

import { LandingPage } from '../landing/landing'; // Page that goes to the Landing Page when the user clicks on the link within the Menu

@Component({
  selector: 'page-find-team',
  templateUrl: 'find-team.html'
})
export class FindTeamPage {

  /* bl - from what I have seen and watched thus far, not
  much seems to go into the constructor curly braces */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    /* bl - new declarations created by bl */
    public googleSheets: GoogleSheetsProvider,
    public globalVars: GlobalVarsProvider,
    public app: App,
    public viewCtrl: ViewController,
    public storage: Storage,
    public alertCtrl: AlertController,

    ) {}

 // -- Variables

availableTeams: Array<any>;

/* bl - array that is displayed on LandingPage; will be prepared 
within this page in the ionViewDidLoad function below */
teamSearchInput: string = ""; 

selectedTeamIds: Array<any>;



// -- When page loads function

ionViewDidLoad(){
// -- Get Available Teams from GlobalVarsProvider
// -- Available Teams is controlled on the Landing Page
  this.availableTeams = this.globalVars.getAvailableTeams();
}

/* bl - this function is triggered by the user
  pressing the star button on the items that show
  up by the search; this function adds the teamId
  to local storage and then also tags the
  respective object within the avaibleTeams array
  with the isFavoriteTeam property of true; this
  property is what filters the favorites on the
  landing page */

  addFavoriteTeam(teamId: string){

    this.storage.get( teamId ).then( ( result ) => { /* bl - PC: Go get the teamId from local storage */

      if (result === null){ /* bl - PC: Does the teamId exsist in local storage? */

        this.storage.set(teamId, 'favoriteTeam'); /* bl - PC: If NO then add it */

        for (var i = 0; i < this.availableTeams.length; i++){ /* bl - PC: for each available team */

          /* bl - test all stored favorites for this teamId */

          if (teamId === this.availableTeams[i].teamId){ /* bl - PC: Does the selected teamId = id of team? */

            this.availableTeams[i].isFavoriteTeam = 'true'; /* bl - PC: IF YES, then add it as a favorite <- */

            this.globalVars.setHasFavorites(true);
            
          }
        }
      }

      else{

        this.storage.remove(teamId);

        this.globalVars.setHasFavorites(false);

        for (var i = 0; i < this.availableTeams.length; i++){
          
          if (teamId === this.availableTeams[i].teamId){
            
            delete this.availableTeams[i].isFavoriteTeam;
            
          }
        
          if (this.availableTeams[i].isFavoriteTeam == 'true'){
            
            this.globalVars.setHasFavorites(true);
            
          }
        
        }

        //-- Remove My Team if it is the same team

        this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {  
          
          if (gotten_teamId === teamId) {     

            this.storage.remove('myTeam');

            for (var i = 0; i < this.availableTeams.length; i++){ 

              if (teamId === this.availableTeams[i].teamId){
            
                delete this.availableTeams[i].isMyTeam;
                
                this.globalVars.setMyTeamIsSet(false);

              }
            }

            this.storage.remove('loadMyTeamByDefault');

            this.globalVars.setMyTeamIsSet(false);

          }

        });

      }

    })

  }

  closeMenu() {
  
    this.viewCtrl.dismiss();

    this.app.getRootNav().setRoot(LandingPage);

  }

  addTeams(){

    
  }

  cancelAddTeams(){
    
    

  }

}
