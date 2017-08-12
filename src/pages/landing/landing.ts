/*********************************************************************
FILE INFO
**********************************************************************
Name: landing.ts
Purpose: Communicates with landing.html
Parameters: None
Description: The variables and functions used for the Landing Page
Note: The Landing Page is one of the potential pages that the use will 
  see when they first open the app.
Last Update: 04/07/2017
*********************************************************************/





/*********************************************************************
Name: import
Purpose: Imports different controllers for certain functionalities
Parameters:
Description: 
Note: 
Last Update: 03/31/2017
*********************************************************************/

  import { Component } from '@angular/core'; // Exact functionality unknown

  import {
    
    NavController,    // Controller used to create navCtrl which is used for changing pages/views
    NavParams,        // Exact functionality unknown
    ItemSliding,      // Declares the the slidingItem variable which is passed in the add/remove Favories and My Team functions below
    AlertController,  // Controller used to create alertCtrl which is used to create interactive popups
    ModalController,  // Controller used to create the modalCtrl which is used for showing the menus
    App               // Controller used to create app which is used for setting the page/view roots

  } from 'ionic-angular';

  import { GoogleSheetsProvider } from '../../providers/google-sheets';  // Custom provider that creates googleSheets which is used for calling functions from the GoogleSheetsProvider
  import { GlobalVarsProvider } from '../../providers/global-vars';      // Custom provider that creates GlobalVarsProvider which is use for calling functions from the GlobalVarsProvider provider
  
  import { Storage } from '@ionic/storage'; // Controller that creates storage which is used for accessing the user's local storage
  
  import { TabsPage } from '../tabs/tabs';                // Page that lays over the others pages that are accessed via the tabs shown within the app
  import { FindTeamPage } from '../find-team/find-team';  // Page that is shown via the modalCtrl that acts as a menu for finding teams
  import { OptionsPage } from '../options/options';       // Page that is shown via the modalCtrl that acts as a menu for certain app options
  import { HelpPage } from '../help/help';       // Page that is shown via the modalCtrl that acts as a menu for certain app options





/*********************************************************************
Name: @Component
Purpose: Exact functionality unknown
Parameters: selector, templateUrl
Description: This is where the selector and templateUrl are declared.
Note: Ionic provides this by default
Last Update: 03/31/2017
*********************************************************************/

@Component({

  selector: 'page-landing',   // Exact functionality unknown
  templateUrl: 'landing.html' // Refers to the html page that this TypeScript file communicates with

})





/*********************************************************************
Name: export class LandingPage
Purpose: Exact functionality unknown
Parameters:
Description: This is where the constructor, functions, and variables
  are placed for this particular page.
Note: Ionic provides this by default and it is needed for any page
  that is accessed within the app.
Last Update: 03/31/2017
*********************************************************************/

export class LandingPage {

// -- Dynamic variables

  availableTeams: Array<any> = [];  // The array of available teams set through a call to the GlobalVarsProvider
  showMessageHowToAddMyTeam: boolean;
  showMessageHowToAddFavorites: boolean;

  editingFavorites: boolean = false;
  editingMyTeam: boolean = false;


/*********************************************************************
Name: constructor
Purpose: Exact functionality unknown
Parameters: navCtrl, navParams, googleSheets, storage, globalVars,
  modalCtrl, alertCtrl
Description: This is where the controllers and providers are declared
  that are used within this TypeScript file
Note: Nothing ever seems to go into the curly braces of the constructor
  function, except with app.component.ts
Last Update: 03/31/2017
*********************************************************************/
  
  constructor(

    public navCtrl: NavController,              // Used for changing pages
    public navParams: NavParams,                // Exact functionality unknown
    public googleSheets: GoogleSheetsProvider,  // Used for calling functions from GoogleSheetsProvider
    public storage: Storage,                    // Used for accessing the user's local storage
    public globalVars: GlobalVarsProvider,      // Used for calling functions from GlobalVarsProvider
    public modalCtrl: ModalController,          // Used for opening pages that act as menus
    public alertCtrl: AlertController,          // Used for showing interactive popups
    public app: App                             // Used for setting page/view roots

  ) {}





/*********************************************************************
Name: ionViewDidLoad
Purpose: Executes the code within it after the page is loaded
Parameters: None
Description: When the page loads, the availableTeams array will be set 
  through a call to the GlobalVarsProvider. Available teams are set 
  within the GoogleSheetsProvider which is called upon with the
  app.component.ts file.
Note: None
References: https://ionicframework.com/docs/api/navigation/NavController/
Last Update: 04/07/2017
*********************************************************************/

  ionViewDidLoad() {

    this.availableTeams = this.globalVars.getAvailableTeams();  // Set the availableTeams variable

  }





/*********************************************************************
Name: ionViewDidEnter
Purpose: 
Parameters: None
Description: 
References: 
Last Update: 07/30/2017
*********************************************************************/
  
  ionViewDidEnter(){

    if (this.globalVars.getMyTeamIsSet() !== true){

      this.showMessageHowToAddMyTeam = true;

    }

    if (this.globalVars.getHasFavorites() !== true){

      this.showMessageHowToAddFavorites = true;

    }
  
  }


/*********************************************************************
Name: clickedFavoriteteam
Purpose: 
Parameters: 
Description:

Note: 
Last Update: 8/11/17
*********************************************************************/

  clickedFavoriteTeam(passed_FavoriteTeam: any){

//-- Remove Favorite

    if(this.editingFavorites){

      this.storage.get( passed_FavoriteTeam.teamId ).then( ( result ) => {
      
        if (result !== null) {

          this.storage.remove(passed_FavoriteTeam.teamId);

          this.globalVars.setHasFavorites(false);
          this.showMessageHowToAddFavorites = true;

          for (var i = 0; i < this.availableTeams.length; i++){
            
            if (passed_FavoriteTeam.teamId === this.availableTeams[i].teamId){
              
              delete this.availableTeams[i].isFavoriteTeam;
              
            }
          
            if (this.availableTeams[i].isFavoriteTeam == 'true'){
              
              this.globalVars.setHasFavorites(true);
              this.showMessageHowToAddFavorites = false;
              
            }

          }
  
        }

      })

//-- Remove My Team if it is the same team

      this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {  
        
        if (gotten_teamId === passed_FavoriteTeam.teamId) {     

          this.storage.remove('myTeam');

          for (var i = 0; i < this.availableTeams.length; i++){ 

            if (passed_FavoriteTeam.teamId === this.availableTeams[i].teamId){
          
              delete this.availableTeams[i].isMyTeam;
              
              this.showMessageHowToAddMyTeam = true;

            }
          }

          this.storage.remove('loadMyTeamByDefault');

          this.globalVars.setMyTeamIsSet(false);

        }

      });

    }

//-- Add My Team

    else if(this.editingMyTeam){

      this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {

        if (gotten_teamId  === null) {
          
          this.storage.set('myTeam', passed_FavoriteTeam.teamId);
          
          for (var i = 0; i < this.availableTeams.length; i++){
            
            if (passed_FavoriteTeam.teamId === this.availableTeams[i].teamId){
              
              this.availableTeams[i].isMyTeam = 'true';

              this.globalVars.setMyTeamIsSet(true);

              this.showMessageHowToAddMyTeam = false;

            }

          }

        }

        else{

        this.storage.set('myTeam', passed_FavoriteTeam.teamId);

          for (var i = 0; i < this.availableTeams.length; i++){

            if (gotten_teamId === this.availableTeams[i].teamId) {

              delete this.availableTeams[i].isMyTeam;

              this.storage.remove('loadMyTeamByDefault');
            
            }

            
            if (passed_FavoriteTeam.teamId === this.availableTeams[i].teamId){

              this.availableTeams[i].isMyTeam = 'true';

            }

          }

        }

      })

    }

//-- Open Team

    else if(!this.editingMyTeam){

      this.editingFavorites = false;
      this.editingMyTeam = false;

      this.globalVars.setActiveTeam(passed_FavoriteTeam); // Function call to GlobalVarsProvider
      
      this.app.getRootNav().push(TabsPage);    // Set root page/view
    
    }

  }


/*********************************************************************
Name: removeMyTeam
Purpose: Remove the team that the user has selected as their team.
Parameters: slidingItem, teamId
Description: This function will remove the team that is considered the
  user's 'My Team' if the user confirms the removal. The items slide
  so the slidingItem is also passed in order to close the slidingItem
  after the confirmation. Removal of the team will remove the key
  loadMyTeamByDefault from local storage as well as reset the global
  variable myTeamIsSet to false since no team will be selected.
Note: 
References: https://ionicframework.com/docs/storage/
  https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  clickedMyTeam(passed_MyTeam: any){

//-- Remove My Team

    if(this.editingMyTeam){

      this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {  
        
        if (gotten_teamId !== null) {     

          this.storage.remove('myTeam');

          for (var i = 0; i < this.availableTeams.length; i++){ 

            if (passed_MyTeam.teamId === this.availableTeams[i].teamId){
          
              delete this.availableTeams[i].isMyTeam;
              
              this.showMessageHowToAddMyTeam = true;

            }
          }

          this.storage.remove('loadMyTeamByDefault');

          this.globalVars.setMyTeamIsSet(false);

        }

      });

    }


//-- Open Team

    else if(!this.editingFavorites){

      this.editingFavorites = false;
      this.editingMyTeam = false;

      this.globalVars.setActiveTeam(passed_MyTeam); // Function call to GlobalVarsProvider
      
      this.app.getRootNav().push(TabsPage);    // Set root page/view

    }

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

  openFindTeamPage(){

    this.editingFavorites = false;
    this.editingMyTeam = false;

    let findTeamPageModal = this.modalCtrl.create(FindTeamPage);  // Declare the Modal
    
    findTeamPageModal.present();                                  // Present the Modal

  }



/*********************************************************************
Name: openOptionsPage
Purpose: Opens the Options Page
Parameters: None
Description: This function will open the Options page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  openOptionsPage(){

    this.editingFavorites = false;
    this.editingMyTeam = false;

    let optionsPageModal = this.modalCtrl.create(OptionsPage);  // Delcare Modal
      
    optionsPageModal.present();                                 // Present Modal
    
  }

/*********************************************************************
Name: openOptionsPage
Purpose: Opens the Options Page
Parameters: None
Description: This function will open the Options page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  editFavorites(){

    this.editingFavorites = true;
    
  }

/*********************************************************************
Name: openOptionsPage
Purpose: Opens the Options Page
Parameters: None
Description: This function will open the Options page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  saveFavorites(){

    this.editingFavorites = false;
    
  }

/*********************************************************************
Name: openOptionsPage
Purpose: Opens the Options Page
Parameters: None
Description: This function will open the Options page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  editMyTeam(){

    this.editingMyTeam = true;
    
  }

/*********************************************************************
Name: openOptionsPage
Purpose: Opens the Options Page
Parameters: None
Description: This function will open the Options page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  saveMyTeam(){

    this.editingMyTeam = false;
    
  }

}
