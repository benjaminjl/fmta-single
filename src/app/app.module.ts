import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { BrowserModule } from '@angular/platform-browser'; // NEW 07262017
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* bl - new pages created by bl */
import { LandingPage } from '../pages/landing/landing';
import { OptionsPage } from '../pages/options/options';
import { HelpPage } from '../pages/help/help';
import { TeamInfoPage } from '../pages/team-info/team-info'; // bl
import { TeamRosterPage } from '../pages/team-roster/team-roster';
import { TeamSchedulePage } from '../pages/team-schedule/team-schedule';
import { FindTeamPage } from '../pages/find-team/find-team';
import { SearchTeamRosterPage } from '../pages/search-team-roster/search-team-roster';
import { SearchTeamSchedulePage } from '../pages/search-team-schedule/search-team-schedule';

/* bl - new imports created by bl */
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/* bl - new custom pipes created by bl */
import { MyTeamFilterPipe } from '../pipes/pipe.my-team-filter';
import { FindTeamFilterPipe } from '../pipes/pipe.find-team-filter';
import { FavoriteTeamsFilterPipe } from '../pipes/pipe.favorite-teams-filter';
import { RecordFilterPipe } from '../pipes/pipe.record-filter';
import { HelpFilterPipe } from '../pipes/pipe.help-filter';
import { SearchRosterFilterPipe } from '../pipes/pipe.search-roster-filter';
import { SearchScheduleFilterPipe } from '../pipes/pipe.search-schedule-filter';

/* bl - new providers created by bl */
import { GoogleSheetsProvider } from '../providers/google-sheets';
import { GlobalVarsProvider } from '../providers/global-vars';

@NgModule({
  declarations: [
    MyApp,
    TeamRosterPage,
    TeamSchedulePage,
    TabsPage,

    /* bl - new pages created by bl */
    LandingPage,
    OptionsPage,
    HelpPage,
    FindTeamPage,
    TeamInfoPage,
    SearchTeamRosterPage,
    SearchTeamSchedulePage,

    /* bl - new custom pipes created by bl */
    MyTeamFilterPipe,
    FindTeamFilterPipe,
    FavoriteTeamsFilterPipe,
    RecordFilterPipe,
    HelpFilterPipe,
    SearchRosterFilterPipe,
    SearchScheduleFilterPipe
    

  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom'}), // Placing tabs at bottom by default

    /* bl - new imports created by bl */
    IonicStorageModule.forRoot(),
    BrowserModule, // NEW 07262017
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamRosterPage,
    TeamSchedulePage,
    TabsPage,

    /* bl - new pages created by bl */
    LandingPage,
    OptionsPage,
    HelpPage,
    FindTeamPage,
    TeamInfoPage,
    SearchTeamRosterPage,
    SearchTeamSchedulePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

// -- New providers
// -- Need these here so they are globally accessed by all pages
    GoogleSheetsProvider,
    GlobalVarsProvider,
    InAppBrowser
  ]
})
export class AppModule {}
