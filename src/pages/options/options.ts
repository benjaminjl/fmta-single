import { Component } from '@angular/core';
import { AlertController, App, NavController, NavParams, ViewController } from 'ionic-angular';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../../providers/google-sheets';
import { GlobalVarsProvider } from '../../providers/global-vars';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';

import { LandingPage } from '../landing/landing'; // Page that goes to the Landing Page when the user clicks on the link within the Menu

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {

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
    public alertCtrl: AlertController

    ) {}

 // -- Variables

availableTeams: Array<any>;

loadMyTeamByDefault: boolean;

  /* bl - array that is displayed on LandingPage; will be prepared 
  within this page in the ionViewDidLoad function below */
  teamSearchInput: string = "";
  
loadMyTeamByDefaultToggleIsDisabled: boolean;

// -- When page loads function

ionViewDidLoad(){
  
// -- Get Available Teams from GlobalVarsProvider
// -- Available Teams is controlled on the Landing Page
  this.availableTeams = this.globalVars.getAvailableTeams();

  if (this.globalVars.getMyTeamIsSet() !== true){

    this.loadMyTeamByDefault = false;
    this.loadMyTeamByDefaultToggleIsDisabled = true;

  }

  else{
    
    this.storage.get( 'loadMyTeamByDefault' ).then( ( result ) => {
        
      this.loadMyTeamByDefault = result;

    });

    this.loadMyTeamByDefaultToggleIsDisabled = false;

  }
  
  

}

closeMenu() {

  this.viewCtrl.dismiss();

  this.app.getRootNav().setRoot(LandingPage);

}

clearAppData(){

  let alert = this.alertCtrl.create({
      title: 'Clear App Data',
      message: "Clear data including Favorites?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
            

          }
        },
        {
          text: 'Yes',
          handler: () => {
            
            this.storage.clear();

            // -- Reset Load My Team By Default boolean
            this.loadMyTeamByDefault = false;
            this.globalVars.setMyTeamIsSet(false);
            this.loadMyTeamByDefaultToggleIsDisabled = true;
            this.globalVars.setHasFavorites(false);

            // -- Clear All Custom Attributes from the Team Objects

              for(var i = 0; i < this.availableTeams.length; i++){
                
                if(this.availableTeams[i].isFavoriteTeam){

                  delete this.availableTeams[i].isFavoriteTeam;

                }
                
                if(this.availableTeams[i].isMyTeam){

                  delete this.availableTeams[i].isMyTeam;

                }
                
              }

                let alert = this.alertCtrl.create({

                  title: 'Clear App Data',

                  message: "App data cleared.",

                  buttons: [

                    {

                      text: 'OK',

                      handler: () => {

                      }

                    }

                  ]

                });

                alert.present();

          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();

}

setLoadMyTeamByDefault(passed_ToggleBool){
  this.storage.set("loadMyTeamByDefault", passed_ToggleBool);
}

}
