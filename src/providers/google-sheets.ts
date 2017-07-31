import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/* bl - new imports created by bl */
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from './global-vars'


@Injectable()
export class GoogleSheetsProvider {
data: any = null;

constructor(
    public http: Http,

    /* bl - new declarations created by bl */
    public storage: Storage,
    public globalVars: GlobalVarsProvider
    
    ) {}

/* bl - main function of Google Sheets provider */

load( spreadsheetId: string, sheetId: string, apiKey: string ) {
    
    if (this.data) {
        // already loaded data
        return Promise.resolve(this.data);
    }

	/* bl - spreadsheet ranges that get attached to
       the url when the GET command is executed; */
    var columnsRange: string = '!A4:AB4';
    var rowsRange: string = '!A5:AB';
	

    /* bl - url for GETTING the column values within a sheet
       that is within the spreadsheet */
    var columnsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetId + columnsRange + '?majorDimension=ROWS&key=' + apiKey;


    return new Promise(resolve => {

        this.http.get(columnsUrl)
        .map(res => res.json())
        .subscribe( data => {

            /* bl - create an array name columns for the data grabbed */
            var columns: Array<any>  = data;


                /* bl - url for GETTING the row values within a sheet
                   that is within the spreadsheet */
                var rowsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetId + rowsRange + '?majorDimension=ROWS&key=' + apiKey;

                this.http.get(rowsUrl)
                .map(res => res.json())
                .subscribe( data => {

                    /* bl - create an array name columns for the data grabbed */
                    var rows: Array<any> = data;

                    /* bl - intialize the array to be passed back to the call */
                    var dataArray: Array<any> = [];

                    /* bl - continue ONLY IF there are rows that exist; would
                       not continue IF a spreadsheet has columns but no data */
                    if (rows.values) {

                        /* bl - good ol' Javascript nested for loop for
                           creating the objects of the teams; essentailly
                           adds all column names (attributes) to all of
                           the individual data points from the rows */
                        for (var i = 0; i < rows.values.length; i++) {

                            var tempObj = {}

                            for (var j = 0; j < columns.values[0].length; j++) {

                                tempObj[columns.values[0][j]] = rows.values[i][j];

                            }
                            
                            /* bl - push the completed object to the dataArray */
                            dataArray.push(tempObj)

                        }

                    }

                    /* bl - pass the dataArray back to the call */
                    resolve(dataArray);

                })  
            })
        });
    }




    /* bl - load teams function that prepares the teams
    by setting the favorites and the default */

    loadTeams( spreadsheetId: string, sheetId: string, apiKey: string ) {
    
    if (this.data) {
        // already loaded data
        return Promise.resolve(this.data);
    }

	/* bl - spreadsheet ranges that get attached to
       the url when the GET command is executed; */
    var columnsRange: string = '!A4:AB4';
    var rowsRange: string = '!A5:AB';
	

    /* bl - url for GETTING the column values within a sheet
       that is within the spreadsheet */
    var columnsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetId + columnsRange + '?majorDimension=ROWS&key=' + apiKey;

    return new Promise(resolve => {

        this.http.get(columnsUrl)
        .map(res => res.json())
        .subscribe( data => {

            /* bl - create an array name columns for the data grabbed */
            var columns: Array<any>  = data;


                /* bl - url for GETTING the row values within a sheet
                   that is within the spreadsheet */
                var rowsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetId + rowsRange + '?majorDimension=ROWS&key=' + apiKey;

                this.http.get(rowsUrl)
                .map(res => res.json())
                .subscribe( data => {

                    /* bl - create an array name columns for the data grabbed */
                    var rows: Array<any> = data;

                    /* bl - intialize the array to be passed back to the call */
                    var dataArray: Array<any> = [];

                    /* bl - continue ONLY IF there are rows that exist; would
                       not continue IF a spreadsheet has columns but no data */
                    if (rows.values) {

                        /* bl - good ol' Javascript nested for loop for
                           creating the objects of the teams; essentailly
                           adds all column names (attributes) to all of
                           the individual data points from the rows */
                        for (var i = 0; i < rows.values.length; i++) {

                            var tempObj = {}

                            for (var j = 0; j < columns.values[0].length; j++) {

                                tempObj[columns.values[0][j]] = rows.values[i][j];

                            }
                            
                            /* bl - push the completed object to the dataArray */
                            dataArray.push(tempObj)

                        }

                        /* bl - if this executes, then we have successfully
                        grabbed the data from Google Spreadsheet; we then
                        "prepare" the data with favorites and the default */

                        /* bl - forEach parameters MUST BE (value, key), value is always first, key is always second */
                        this.storage.forEach( ( value, key) => { /* bl - PC: for each item in Local Storage */

                            for (var i = 0; i < dataArray.length; i++){ /* bl - PC: for each available team */

                                /* bl - first test all stored favorites */

                                if (key === dataArray[i].teamId){ /* bl - PC: Does local storage key = id of team? */

                                    dataArray[i].isFavoriteTeam = 'true'; /* bl - PC: IF YES, then it is a favorite <- */
                                    
                                    this.globalVars.setHasFavorites(true);
                                }
                                
                                /* bl - next test for my team (default team) */

                                if (key === 'myTeam'){ /* bl - PC: IF key = myTeam */

                                    for (var j = 0; j < dataArray.length; j++){ /* bl - PC: for each available team */

                                        if (value === dataArray[j].teamId){ /* bl - PC: Does key, myTeam, value = id of team? */

                                            dataArray[j].isMyTeam = 'true'; /* bl - PC: IF YES, then it is myTeam <- */
                                            
                                            this.globalVars.setMyTeamIsSet(true);
                                            
                                        }

                                        else{
                                            /* bl - if this does not find a team, then it
                                            may have been deleted from the master spreadsheet;
                                            may want to notify user if this happens? */
                                        }
                                    }

                                }

                            }

                        })

                    }
                    
                    /* bl - pass the dataArray back to the call */
                    resolve(dataArray);

                })  
            })
        });
    }
}