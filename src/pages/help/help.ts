import { Component } from '@angular/core';
import { AlertController, App, NavController, NavParams, ViewController } from 'ionic-angular';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../../providers/google-sheets';
import { GlobalVarsProvider } from '../../providers/global-vars';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

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
  
  helpQuestions: Array<any>;

  /* bl - for this page, the spreadsheetId will be static; other 
  pages will have dynamic spreadsheetId's provided by the master
  spreadsheet */
  spreadsheetId: string = '12Eod_cSjp-vQ383kNg6kYiUTI3x6rlq59DMs4yc3LJw';

  /* bl - for this page, the apiKey will be static other 
  pages will have dynamic apiKey's provided by the master
  spreadsheet */
  apiKey: string = 'AIzaSyCJP9S1cWSVdi-hqWe-PVeTXeaWTQY9cHg';

  /* bl - array that is displayed on LandingPage; will be prepared 
  within this page in the ionViewDidLoad function below */
  helpSearchInput: string = ""; 

// -- When page loads function

ionViewDidLoad(){
  
// -- Get the Team Record
    
    this.googleSheets.load( this.spreadsheetId, 'Help', this.apiKey )
      
      .then( ( data ) => {

        this.helpQuestions = data;

      }, (error) => {


// -- If this executes, then an error has occurred

        console.log( error );

      });

}

closeMenu() {
  this.viewCtrl.dismiss();
}

}
