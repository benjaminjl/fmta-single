import { Component } from '@angular/core';
import { AlertController, App, NavController, NavParams, ViewController } from 'ionic-angular';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../../providers/google-sheets';
import { GlobalVarsProvider } from '../../providers/global-vars';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-search-team-schedule',
  templateUrl: 'search-team-schedule.html'
})
export class SearchTeamSchedulePage {

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
  teamSchedule: Array<any>;

  spreadsheetId: string = "1-BmtUv9FYV_blwRWMBmszU75-Aw7m0OaNNmLEQEnZQM"
  apiKey: string = "AIzaSyCJP9S1cWSVdi-hqWe-PVeTXeaWTQY9cHg";
  sheetName: string;

  activeTeamName: string = "BEA Varsity Football"
  activeTeamType: string = "Football"
  activeTeamIcon: string;
  activeTeamPrimaryColor: string = "#05072F";
  activeTeamSecondaryColor: string = "#85724d";
  activeTeamComplementColor: string = "#ffffff";

  /* bl - array that is displayed on LandingPage; will be prepared 
  within this page in the ionViewDidLoad function below */
  rosterSearchInput: string = ""; 

// -- When page loads function

ionViewDidLoad(){
  
// -- Get the Team Record
    
    this.googleSheets.load( this.spreadsheetId, 'Schedule', this.apiKey )
      
      .then( ( data ) => {

        this.teamSchedule = data;

      }, (error) => {


// -- If this executes, then an error has occurred

        console.log( error );

      });

}

closeMenu() {
  this.viewCtrl.dismiss();
}

}
