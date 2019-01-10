import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatInputModule} from '@angular/material/input';

import { RiotService } from '../../service/riot.service';
import { Game } from '../../model/game.model';
import { Team } from '../../model/team.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  id: String;
  game: Game;
  blueTeam: Team;
  redTeam: Team;
  columnsToDisplay = ['champion', 'summonerName', 'rank', 'kda', 'degats', 'cs'];

  constructor(private riotService: RiotService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.blueTeam = {participants:[], side:"",totalDamage:0};
      this.redTeam = {participants:[], side:"",totalDamage:0};
      this.riotService
      .getMatchById(this.id)
      .subscribe((data: Game) => {
        this.game = data;
        this.game.participants.forEach(participant => {
          if(participant.teamId == 100){
            this.blueTeam.participants.push(participant);
            this.blueTeam.totalDamage += participant.stats.totalDamageDealtToChampions;
          } else {
            this.redTeam.participants.push(participant);
            this.redTeam.totalDamage += participant.stats.totalDamageDealtToChampions;
          }
        });
        console.log('GAME');
        console.log(this.game);
        console.log('BLUE TEAM');
        console.log(this.blueTeam.totalDamage);
        
      });
    });
  }

  totalDamage(participant){
    return Math.round(participant.stats.totalDamageDealtToChampions * 100 / this.blueTeam.totalDamage);
  }

}


