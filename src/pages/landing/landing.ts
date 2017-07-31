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
Name: removeFavoriteTeam
Purpose: Removes a team from the user's favorites
Parameters: slidingItem, teamId
Description: This function will check if the teamId is within local
  storage.

  (1) If it is within local storage, then it is listed as a favorite,
  therefore, it will be removed from local storage upon confirmation
  from the user.

  (2) If it is not within local storage, then there is a bigger issue
  at hand. May need to put some sort of error report in place if this
  ever occurs.

Note: 
Last Update: 03/31/2017
*********************************************************************/

  removeFavoriteTeam(slidingItem: ItemSliding, teamId: string){

    this.storage.get( teamId ).then( ( result ) => {
      
      if (result !== null) {

        let alert = this.alertCtrl.create({

          title: 'Remove Favorite',

          message: "Remove this team from Favorites?",

          buttons: [

            {

              text: 'Cancel',

              handler: () => {
                
                slidingItem.close();

              }

            },

            {

              text: 'Yes',

              handler: () => {

                this.storage.remove(teamId);

                for (var i = 0; i < this.availableTeams.length; i++){
                  
                  if (teamId === this.availableTeams[i].teamId){
                    
                    delete this.availableTeams[i].isFavoriteTeam;
                    
                  }
                
                  if (this.availableTeams[i].isFavoriteTeam == 'true'){
                    
                    this.globalVars.setHasFavorites(true);
                    
                  }

                }
              
                slidingItem.close();

              }

            }

          ]

        });
        
        alert.present();
 
      }

    })

  }





/*********************************************************************
Name: addMyTeam
Purpose: Make the selected team the user's default team.
Parameters: slidingItem, teamId
Description: This function will check if the myTeam key is within local
  storage already.

  (1) If it is not, then it will set the selected team set 
  the myTeam key within local storage with a value of the teamId, then 
  it will find the team that has the teamId and give it a property of
  isMyTeam set to true.

  (2) If the myTeam key is already in local storage
  then that means there is already a default team selected. If the newly
  selected team is the same team that is already the default team then
  nothing will be done.

  (3) If the myTeam key is already in local storage then that means there
  is a default team selected. If the newly selected team is not the same
  as the default team then the isMyTeam property will be removed from the
  old default team and then the isMyTeam property will be added to the new
  default team.
  
  Popups update the user throughout and the sliding items are closed.

Note: None
Last Update: 04/07/2017
*********************************************************************/

  addMyTeam(slidingItem: ItemSliding, teamId: string){

    this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {

      if (gotten_teamId  === null) {
        
        this.storage.set('myTeam', teamId);
        
        for (var i = 0; i < this.availableTeams.length; i++){
          
          if (teamId === this.availableTeams[i].teamId){
            
            this.availableTeams[i].isMyTeam = 'true';

            this.globalVars.setMyTeamIsSet(true);

            this.showMessageHowToAddMyTeam = false;

            let alert = this.alertCtrl.create({

              title: 'My Team Added',

              message: this.availableTeams[i].teamName + " is now your team!",

              buttons: [

                {

                  text: 'OK',

                  handler: () => {
                    
                    slidingItem.close();

                  }

                }

              ]

            });
            
            alert.present();

          }

        }

      }

      else if (gotten_teamId === teamId){
        
        let alert = this.alertCtrl.create({

          title: 'My Team Already Set',

          message: "This team is already set!",

          buttons: [

            {

              text: 'OK',

              handler: () => {
                
                slidingItem.close();

              }

            }

          ]

        });
        
        alert.present();

      }

      else{ 

        let alert = this.alertCtrl.create({

          title: 'New My Team',

          message: "Set this as your new team?",

          buttons: [

            {

              text: 'Cancel',

              handler: () => {
                
                slidingItem.close();

              }

            },

            {

              text: 'Yes',

              handler: () => {

                this.storage.set('myTeam', teamId);

                for (var i = 0; i < this.availableTeams.length; i++){

                  if (gotten_teamId === this.availableTeams[i].teamId) {

                    delete this.availableTeams[i].isMyTeam;

                    this.storage.remove('loadMyTeamByDefault');
                  
                  }

                  
                  if (teamId === this.availableTeams[i].teamId){

                    this.availableTeams[i].isMyTeam = 'true';

                    let alert = this.alertCtrl.create({

                      title: 'My Team Added',

                      message: this.availableTeams[i].teamName + " is now your team!",

                      buttons: [

                        {

                          text: 'OK',

                          handler: () => {

                            slidingItem.close();

                          }

                        }

                      ]

                    });

                    alert.present();

                  }

                }

                slidingItem.close();

              }

            }

          ]

        });
        
        alert.present();

      }

    })

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

  removeMyTeam(slidingItem: ItemSliding, teamId: string){

    this.storage.get( 'myTeam' ).then( ( gotten_teamId ) => {  
      
      if (gotten_teamId !== null) {     

            let alert = this.alertCtrl.create({                 
              
              title: 'Remove My Team',

              message: "Remove your team?",

              buttons: [

                {
                  
                  text: 'Cancel',

                  handler: () => {
                    
                    slidingItem.close();

                  }

                },

                {

                  text: 'Yes',
                  
                  handler: () => {

                    this.storage.remove('myTeam');

                    for (var i = 0; i < this.availableTeams.length; i++){ 

                      if (teamId === this.availableTeams[i].teamId){
                    
                        delete this.availableTeams[i].isMyTeam;
                        
                        this.showMessageHowToAddMyTeam = true;

                      }
                    }

                    this.storage.remove('loadMyTeamByDefault');
    
                    this.globalVars.setMyTeamIsSet(false);
                    
                    slidingItem.close();

                  }

                }

              ]

            });
            
            alert.present();

      }

    })

  }





/*********************************************************************
Name: goToTeam
Purpose: Open up the Team Info Page with the chosen team's info.
Parameters: passed_Team
Description: The user selects a team from either their favorites or
  their default team and the team object is passed to this function.
  It then sets the global variable for the active team and then
  changes the navigation root to the Tabs Page which loads the 
  team info page by default.
Note: 
Reference: https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889
Last Update: 03/31/2017
*********************************************************************/

  goToTeam(passed_Team: any){

    this.globalVars.setActiveTeam(passed_Team); // Function call to GlobalVarsProvider
    
    this.app.getRootNav().setRoot(TabsPage);    // Set root page/view

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

    let findTeamPageModal = this.modalCtrl.create(FindTeamPage);  // Declare the Modal
    
    findTeamPageModal.present();                                  // Present the Modal

  }





/*********************************************************************
Name: openHelpPage
Purpose: Opens the Find Team Page
Parameters: None
Description: This function will open the Find Team page for the user.
Note: This is a modal page that displays over the other pages.
References: https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts
Last Update: 03/31/2017
*********************************************************************/

  openHelpPage(){

    let findTeamPageModal = this.modalCtrl.create(HelpPage);  // Declare the Modal
    
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

    let optionsPageModal = this.modalCtrl.create(OptionsPage);  // Delcare Modal
      
    optionsPageModal.present();                                 // Present Modal
    
  }

}
