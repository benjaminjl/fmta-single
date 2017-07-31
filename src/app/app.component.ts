import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* bl - new pages created by bl */
import { LandingPage } from '../pages/landing/landing';
import { TabsPage } from '../pages/tabs/tabs';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../providers/google-sheets';
import { GlobalVarsProvider } from '../providers/global-vars';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  /* bl - made the LandingPage the new rootPage so
     the app loads to the landing page, first. After
     first login, if the user select a default team,
     then the app will load to either the LandingPage
     OR the default page. This is determined on app
     initialization within app.component.ts */

  rootPage: any;

    /* bl - for this page, the spreadsheetId will be static; other 
  pages will have dynamic spreadsheetId's provided by the master
  spreadsheet */
  spreadsheetId: string = '12Eod_cSjp-vQ383kNg6kYiUTI3x6rlq59DMs4yc3LJw';
  
  /* bl - the sheet name is placed into the url for GETTING
  information from the respective sheet */
  sheetName: string;

  /* bl - for this page, the apiKey will be static other 
  pages will have dynamic apiKey's provided by the master
  spreadsheet */
  apiKey: string = 'AIzaSyCJP9S1cWSVdi-hqWe-PVeTXeaWTQY9cHg';


/* bl - array that is displayed on LandingPage; will be prepared 
  within this page in the ionViewDidLoad function below */
  availableTeams: Array<any>;


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,


    /* bl - new declarations created by bl */
    public googleSheets: GoogleSheetsProvider,
    public storage: Storage,
    public globalVars: GlobalVarsProvider
    
  ) {  

    this.sheetName = 'Teams';
    
    this.googleSheets.loadTeams( this.spreadsheetId, this.sheetName, this.apiKey )
      .then( ( data ) => {

        this.availableTeams = data;

// -- Send the availableTeams to Global Vars for other pages to access

        this.globalVars.setAvailableTeams(this.availableTeams);

// -- Test if user wants their team loaded by default

        this.storage.get( 'loadMyTeamByDefault' ).then( ( result ) => {
          
          if (result === true){

            this.storage.get( 'myTeam' ).then( ( grabbed_MyTeamId ) => {
              
              if (grabbed_MyTeamId !== null){

                for (var i = 0; i < this.availableTeams.length; i++){

                  if (grabbed_MyTeamId === this.availableTeams[i].teamId){


// -- Set the Active Team globally
                        
                        this.globalVars.setActiveTeam(this.availableTeams[i]);

// -- Go to the Tab Pages
                        
                        this.rootPage = TabsPage;

                        platform.ready().then(() => {
                          // Okay, so the platform is ready and our plugins are available.
                          // Here you can do any higher level native things you might need.
                          statusBar.styleDefault();
                          splashScreen.hide();
                        });

                  }

                }

              }

              

            });

          }

          else{
                
                this.rootPage = LandingPage;

                platform.ready().then(() => {
                          // Okay, so the platform is ready and our plugins are available.
                          // Here you can do any higher level native things you might need.
                          statusBar.styleDefault();
                          splashScreen.hide();
                        });
              }

        });

      }, (error) => {

        /* bl - if this executes, then an error has occurred */
        console.log( error );

      });
  }
}
