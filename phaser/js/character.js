/*jshint esversion: 6 */
class Character {
  // stats array
  // attack, speed, endurance


  ////////////////////////////
  //  CONSTRUCTOR FUNCTION  //
  ////////////////////////////

  constructor(name, lvl, stats, health) {
    this.name = name || "Steve";
    this._lvl = lvl || 0;
    this._maxHealth = 10 + lvl * 2;
    this._health = health || this._maxHealth;
    this._stats = stats;
  }


  ///////////////////
  //  NAME GETTER  //
  ///////////////////

  get name() {
    return this._name;
  }


  ///////////////////////////
  //  LEVEL GETTER/SETTER  //
  ///////////////////////////

  get lvl() {
    return this._lvl;
  }
  set lvl(value) {
    this._lvl = value;
    this._maxHealth = 5 + this._lvl * 2;
    return this._lvl;
  }


  ////////////////////////////
  //  HEALTH GETTER/SETTER  //
  ////////////////////////////

  get health() {
    return this._health;
  }
  set health(value) {
    this._health = value;
    return this._health;
  }


  //////////////////////////
  //  STAT GETTER/SETTER  //
  //////////////////////////

  get stats() {
    return this._stats;
  }
  set stats(value) {
    this._stats = value;
    return this._stats;
  }

}
