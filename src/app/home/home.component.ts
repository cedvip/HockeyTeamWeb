import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  constructor(private http: HttpClient) { }
  teams: any = [];
  yearsList: any = [];

  // Variable AddPlayer popup 
  modalTitle = "";
  teamYear = 0;
  playerNumber = 0;
  playerName = "";
  playerLastName = "";
  playerPosition = "";

  ngOnInit(): void {
    this.GetYearList();
  }

  //Récupération de la liste des années
  GetYearList() {
    this.http.get<any>(environment.API_URL + 'team')
      .subscribe(data => {
        this.yearsList = data;
      });
  }
  // Actualisation du tableau
  refreshList(teamYear: any) {
    this.http.get<any>(environment.API_URL + 'team' + '/' + teamYear)
      .subscribe(data => {
        this.teams = data;
      });
  }

  // Ouverture du paneau d'ajout
  addPlayerClick(teamYear: number) {
    this.modalTitle = "Ajouter un joueur";
    this.teamYear = teamYear;
  }

  // Ajout du joueur
  createClick(teamYear: number) {
    var param: any  = {
      number: this.playerNumber,
      name: this.playerName,
      lastName: this.playerLastName,
      position: this.playerPosition
    }
    this.http.post(environment.API_URL + 'team' + '/' + teamYear, param)
      .subscribe(res => {
        this.closebutton.nativeElement.click();
        this.refreshList(teamYear);
      });
  }

  // Defini le capitaine de l'équipe
  defineCaptain(playerId: number, teamYear: number) {
    const body = { title: 'Angular PUT Request' };
    this.http.put(environment.API_URL + 'Player' + '/' + playerId + ',' + teamYear + '/captain', body)
      .subscribe(res => {
        this.refreshList(teamYear);
      });
  }
}

