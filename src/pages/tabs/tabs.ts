import { Component } from '@angular/core';

import { TeamInfoPage } from '../team-info/team-info';
import { TeamRosterPage } from '../team-roster/team-roster';
import { TeamSchedulePage } from '../team-schedule/team-schedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TeamInfoPage;
  tab2Root: any = TeamRosterPage;
  tab3Root: any = TeamSchedulePage;

  constructor() {

  }
}
