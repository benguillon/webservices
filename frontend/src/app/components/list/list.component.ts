import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatInputModule} from '@angular/material/input';

import { Issue } from '../../model/issue.model';
import { IssueService } from '../../service/issue.service';
import { RiotService } from '../../service/riot.service';
import { Summoner } from '../../model/summoner.model';
import { SpecGame } from '../../model/game.model';
import { History } from '../../model/game.model';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  summoner: Summoner;
  matchlist: History;
  currentGame: SpecGame;
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  columnsToDisplay = ['champion', 'lane', 'role', 'detail'];

  constructor(private issueService: IssueService, private riotService: RiotService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
    this.fetchSummoner('Marshall Jordan');
    this.fetchMatchlist('38gnHmCK0dLt1SjOXPZxaCh3PUH_cIHBldrU7FGROUimJg');
    this.fetchCurrentGame('yxqKcUGVadTSyVMz6LwfuELyDqq5MXC4HAaCXHoAWUoTne4');

  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested ...');
        console.log(this.issues);
      });
  }

  fetchSummoner(summonerName) {
    this.riotService
      .getSummonerByName(summonerName)
      .subscribe((data: Summoner) => {
        this.summoner = data;
        console.log('SUMMONER');
        console.log(this.summoner);
      });
  }

  fetchMatchlist(summonerId) {
    this.riotService
      .getMatchlistBySummonerId(summonerId)
      .subscribe((data: History) => {
        this.matchlist = data;
        console.log('HISTORIQUE');
        console.log(this.matchlist);
      });
  }

  fetchCurrentGame(summonerId) {
    this.riotService
      .getCurrentGame(summonerId)
      .subscribe((data: SpecGame) => {
        // DONNEES DE RIOT
        this.currentGame = data;
        // ON AJOUTE NOTRE ROLE AUX PARTICIPANTS
        this.currentGame.participants.forEach(participant => {
          participant.role = this.riotService.getChampionRole(participant.championId)
        });
        console.log('CURRENT GAME');
        console.log(this.currentGame.participants);
      });

  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

  getMatchDetails(matchId) {
    this.router.navigate([`/game/${matchId}`]);
  }

}
