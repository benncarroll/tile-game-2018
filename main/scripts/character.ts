import * as ex from 'scripts/lib/excalibur.min.js';

export default class Character extends ex.Actor {
  readonly name: string;
  lvl: number;
  health: number;
  stats: number[];

  constructor(name:string, lvl:number, health:number, stats: number[]) {

    super()

    this.name = name || "Steve";
    this.lvl = lvl || 1;
    this.health = health || 100;
    this.stats = stats;

    // stats array
    // strength, agility, charisma, endurance, intelligence, luck

  }

}
