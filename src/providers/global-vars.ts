import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarsProvider {

  constructor() {}

// -- Available Teams

  _availableTeams: Array<any>;

  setAvailableTeams(passed_AvailableTeams: Array<any>){
    this._availableTeams = passed_AvailableTeams;
  }

  getAvailableTeams(){
    return this._availableTeams;
  }


// -- Active Team

  _activeTeam: any;

  setActiveTeam(passed_Team: any){
    this._activeTeam = passed_Team;
  }

  getActiveTeam(){
    return this._activeTeam;
  }

// -- My Team

  _myTeamIsSet: boolean;

  setMyTeamIsSet(passed_Boolean: boolean){
    this._myTeamIsSet = passed_Boolean;
  }

  getMyTeamIsSet(){
    return this._myTeamIsSet;
  }

// -- Favorites

  _hasFavorites: boolean;

  setHasFavorites(passed_Boolean: boolean){
    this._hasFavorites = passed_Boolean;
  }

  getHasFavorites(){
    return this._hasFavorites;
  }

}