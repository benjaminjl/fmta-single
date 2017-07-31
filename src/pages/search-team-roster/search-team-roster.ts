import { Component } from '@angular/core';
import { AlertController, App, NavController, NavParams, ViewController } from 'ionic-angular';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../../providers/google-sheets';
import { GlobalVarsProvider } from '../../providers/global-vars';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-search-team--roster',
  templateUrl: 'search-team-roster.html'
})
export class SearchTeamRosterPage {

//-- Variables

  teamRoster: Array<any>;

  spreadsheetId: string;
  apiKey: string;
  sheetName: string;

  activeTeam: any;
  activeTeamName: string;
  activeTeamType: string;
  activeTeamIcon: string;
  activeTeamPrimaryColor: string;
  activeTeamSecondaryColor: string;
  activeTeamComplementColor: string;

  /* bl - array that is displayed on LandingPage; will be prepared 
  within this page in the ionViewDidLoad function below */
  rosterSearchInput: string = ""; 

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




ionViewDidLoad(){
  
  this.activeTeam = this.globalVars.getActiveTeam();

  this.activeTeamName = this.activeTeam.teamName;

  this.activeTeamPrimaryColor = this.activeTeam.teamPrimaryColor;
  this.activeTeamSecondaryColor = this.activeTeam.teamSecondaryColor;
  this.activeTeamComplementColor = this.activeTeam.teamComplementColor;

// -- Get Active Team info

  this.spreadsheetId = this.activeTeam.teamSpreadsheetId;
  this.apiKey = "AIzaSyCJP9S1cWSVdi-hqWe-PVeTXeaWTQY9cHg";


// -- Get the Team Record
    
  this.googleSheets.load( this.spreadsheetId, 'Roster', this.apiKey )
    
    .then( ( data ) => {

      this.teamRoster = data;

    }, (error) => {


// -- If this executes, then an error has occurred

    console.log( error );

  });
}

closeMenu() {
  this.viewCtrl.dismiss();
}

}
