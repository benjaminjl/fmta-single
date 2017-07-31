/*********************************************************************
FILE INFO
**********************************************************************
Name: team-schedule.ts
Purpose: Communicates with team-schedule.html
Parameters: None
Description: The variables and functions used for the Team Schedule Page
Note: The Team Schedule Page is one of the potential pages that the user will 
  see when they first open the app.
Last Update: 07/16/17
*********************************************************************/





/*********************************************************************
Name: import
Purpose: Imports different controllers for certain functionalities
Parameters:
Description: 
Note: 
Last Update: 07/16/17
*********************************************************************/

  import { Component } from '@angular/core';  // Exact functionality unknown

  import {    
    
    NavController,    // Controller used to create navCtrl which is used for changing pages/views
    ViewController, // Controller used to create viewCtrl which is used for closing the Menu modal
    ModalController,  // Controller used to create the modalCtrl which is used for showing the menus
    App               // Controller used to create app which is used for setting the page/view roots
    
  } from 'ionic-angular';
  
  import { GoogleSheetsProvider } from '../../providers/google-sheets';   // Custom provider that creates googleSheets which is used for calling functions from the GoogleSheetsProvider
  import { GlobalVarsProvider } from '../../providers/global-vars';       // Custom provider that creates GlobalVarsProvider which is use for calling functions from the GlobalVarsProvider provider

  import { InAppBrowser } from '@ionic-native/in-app-browser';  // Controller that creates inAppBrowser which is used to open the Team Links in the user's default browswer

  import { LandingPage } from '../landing/landing'; // Page that goes to the Landing Page when the user clicks on the link within the Menu
  import { SearchTeamSchedulePage } from '../search-team-schedule/search-team-schedule'; // Page that goes to the Landing Page when the user clicks on the link within the Menu







/*********************************************************************
Name: @Component
Purpose: Exact functionality unknown
Parameters: selector, templateUrl
Description: This is where the selector and templateUrl are declared.
Note: Ionic provides this by default
Last Update: 07/20/2017
*********************************************************************/

@Component({
  
  selector: 'page-team-schedule',   // Exact functionality unknown
  templateUrl: 'team-schedule.html' // Refers to the html page that this TypeScript file communicates with
  
})





/*********************************************************************
Name: export class TeamSchedulePage
Purpose: Exact functionality unknown
Parameters:
Description: This is where the constructor, functions, and variables
  are placed for this particular page.
Note: Ionic provides this by default and it is needed for any page
  that is accessed within the app.
Last Update: 07/20/2017
*********************************************************************/

export class TeamSchedulePage {

// -- Dynamic variables

  availableTeams: Array<any>;
  
  teamSchedule: Array<any>;

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


/*********************************************************************
Name: constructor
Purpose: Exact functionality unknown
Parameters: navCtrl, modalCtrl, app, googleSheets, globalVars
Description: This is where the controllers and providers are declared
  that are used within this TypeScript file
Note: Nothing ever seems to go into the curly braces of the constructor
  function, except with app.component.ts
Last Update: 07/20/2017
*********************************************************************/

  constructor(
    
    public navCtrl: NavController,              // Used for changing pages
    public googleSheets: GoogleSheetsProvider,  // Used for calling functions from GoogleSheetsProvider
    public globalVars: GlobalVarsProvider,      // Used for calling functions from GlobalVarsProvider
    public viewCtrl: ViewController,            // Used for closing the Menu modal
    public inAppBrowser: InAppBrowser,          // Used for opening the Team Links in the user's default browser
    public modalCtrl: ModalController,          // Used for opening pages that act as menus
    public app: App                             // Used for setting page/view roots


  ) {}





/*********************************************************************
Name: ionViewDidLoad
Purpose: Executes the code within it after the page is loaded
Parameters: None
Description: When the page loads, the activeTeam variable will be set 
  through a call to the GlobalVarsProvider. The active team is set 
  when the landing.html page is loaded.
Note: None
References: https://ionicframework.com/docs/api/navigation/NavController/
Last Update: 07/20/2017
*********************************************************************/

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
    
    this.googleSheets.load( this.spreadsheetId, 'Schedule', this.apiKey )
      
      .then( ( data ) => {

        this.teamSchedule = data;

      }, (error) => {


// -- If this executes, then an error has occurred

        console.log( error );

      });
}





/*********************************************************************
Name: openFindTeamPage
Purpose: Opens the Find Team Page
Parameters: None
Description: This function will open the Find Team page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  openSearchTeamSchedulePage(){

    let findTeamPageModal = this.modalCtrl.create(SearchTeamSchedulePage);  // Declare the Modal
    
    findTeamPageModal.present();                                  // Present the Modal

  }




/*********************************************************************
Name: goToLandingPage
Purpose: Takes the user back to the Landing Page
Parameters: None
Description: When the user presses the home button within the Menu:

  (1) The app controller will set the root nav to the Landing Page

  (2) The viewCtrl will close the Menu modal
  
Note: None
References: None
Last Update: 04/07/2017
*********************************************************************/

  goToLandingPage(){

    this.app.getRootNav().setRoot(LandingPage); // Set the root nav

  }





/*********************************************************************
Name: doRefresh
Purpose: Run function after refresh is initiated
Parameters: refresher
Description: When the user drags down on the screen, the the page will
  be refreshed.
Note: None
References:
Last Update: 07/27/2017
*********************************************************************/

  doRefresh(refresher){

// -- Get the Team Record
    
    this.googleSheets.load( this.spreadsheetId, 'Schedule', this.apiKey )
      
      .then( ( data ) => {

        this.teamSchedule = data;

        refresher.complete();

      }, (error) => {


// -- If this executes, then an error has occurred

        console.log( error );

      });

  }

}