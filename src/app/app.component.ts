import { Component } from '@angular/core';
import {interval, timer} from "rxjs";
import {NgForm} from '@angular/forms';

import * as moment from 'moment'
import {audit} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'lcpGame';

  colonnes: number = 7;
  lignes: number = 9;
  delai: number = 120;

  lvl : {
    point: number,
    minTime: number,
    maxTime: number,
  }[] = [
    {
      point: 0,
      minTime: 5000,
      maxTime: 7000,
    },
    {
      point: 10,
      minTime: 3000,
      maxTime: 7000,
    },
    {
      point: 20,
      minTime: 2000,
      maxTime: 5000,
    },
    {
      point: 30,
      minTime: 500,
      maxTime: 5000,
    },
    {
      point: 40,
      minTime: 500,
      maxTime: 4000,
    },
    {
      point: 50,
      minTime: 300,
      maxTime: 3000,
    },
    {
      point: 60,
      minTime: 300,
      maxTime: 2000,
    },
    {
      point: 70,
      minTime: 300,
      maxTime: 1000,
    },
    {
      point: 500,
      minTime: 100,
      maxTime: 300,
    }
  ];

  points: number = 0;

  grille: siege[][] = [];

  timeApparition: any;
  timeEndGame: any;
  chrono: any;
  chronoInterval: any;

  start: boolean = false;
  end: boolean = false;

  pseudo: string = '';
  submited: boolean = false;
  scores: score[];

  sound = new Audio();

  moment = moment;

  constructor() {
    for (let i = 0; i < this.lignes; i++){
      var ligne = [];
      for (let j = 0; j<this.colonnes; j++){
        ligne.push(new siege());
      }
      this.grille.push(ligne);
    }

    const savScores = localStorage.getItem('scores');
    if(!savScores){
      this.scores = [];
    }else{
      this.scores = JSON.parse(savScores);
    }

    this.sound.src = "assets/sound.mp3";
    this.sound.load();

    this.initTimer();
  }

  initTimer(){
    this.chrono = moment().add(this.delai, 'seconds').diff(moment());
  }

  startGame(){
    this.submited = false;
    this.points = 0;
    this.popEliott();
    this.start = true;
    this.timeEndGame = moment().add(this.delai, 'seconds');
    this.chronoInterval = interval(23).subscribe(() => {
      this.chrono = moment(this.timeEndGame).diff(moment());
      if (moment(this.timeEndGame).isBefore(moment())){
        this.chrono = moment().diff(moment());
        this.endGame();
      }
    })
  }

  endGame(){
    this.start = false;
    this.end = true;
    this.chronoInterval.unsubscribe();
    this.timeApparition.unsubscribe();
    for (let i = 0; i < this.grille.length; i++){
      for (let j = 0; j < this.grille[i].length; j++){
        this.grille[i][j].hideEliott();
      }
    }
  }

  randBetween(min: number, max: number): number{
    return Math.floor(Math.random() * (max-min) + min);
  }

  getRandSiege(): coord{
    return new coord(
      this.randBetween(0, this.colonnes),
      this.randBetween(0, this.lignes)
    )
  }

  catchEliott(siege: siege): void{
    if (siege.isCatchable()){
      this.points++;
      this.timeApparition.unsubscribe();
      this.sound.play();
      siege.hideEliott();
      this.popEliott();
    }
  }

  popEliott(){
    const coords = this.getRandSiege();
    this.grille[coords.y][coords.x].showEliott();
    this.resetTimer(this.grille[coords.y][coords.x]);
  }

  resetTimer(siege: siege){
    for (var i = this.lvl.length-1; i > 0; i--){
      if (this.lvl[i].point < this.points){
        break;
      }
    }
    this.timeApparition = timer(this.randBetween(this.lvl[i].minTime, this.lvl[i].maxTime))
      .subscribe(() => {
        siege.hideEliott();
        this.popEliott();
      });
  }

  savScore(form: NgForm){
    console.log(form.value.pseudoInput);
    this.scores.push({
      pseudo: form.value.pseudoInput,
      points: this.points,
      date: moment().format(),
    });
    this.scores.sort(this.sortByScore);
    localStorage.setItem('scores', JSON.stringify(this.scores));
    this.submited = true;
  }

  sortByScore(a: score, b: score){
    if (a.points < b.points){
      return 1;
    }
    if (a.points > b.points){
      return -1;
    }
    return 0;
  }
}

export class siege{
    private catchable: boolean = false;

    constructor() {
    }

    public showEliott(){
      this.catchable = true;
    }

    public hideEliott(){
      this.catchable = false;
    }

    public isCatchable(): boolean{
      return this.catchable;
    }
}

export class coord{
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public x: number = 0;
  public y: number = 0;
}

export interface score{
  pseudo: string;
  points: number;
  date: string;
}
