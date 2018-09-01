/*jshint esversion: 6 */
class Character {
  // stats array
  // attack, speed, endurance


  ////////////////////////////
  //  CONSTRUCTOR FUNCTION  //
  ////////////////////////////

  constructor(name, lvl, health, stats) {
    this.name = name || "Steve";
    this.lvl = lvl || 0;
    this.maxHealth = 10 + lvl * 2;
    this.health = health || this.maxHealth;
    this.stats = stats;
  }


  ///////////////////
  //  NAME GETTER  //
  ///////////////////

  get Name() {
    return this.name;
  }


  ///////////////////////////
  //  LEVEL GETTER/SETTER  //
  ///////////////////////////

  get Lvl() {
    return this.lvl;
  }
  set Lvl(value) {
    this.lvl = value;
    this.maxHealth = 5 + this.lvl * 2;
  }


  ////////////////////////////
  //  HEALTH GETTER/SETTER  //
  ////////////////////////////

  get Health() {
    return this.health;
  }
  set Health(value) {
    this.health = value;
  }


  //////////////////////////
  //  STAT GETTER/SETTER  //
  //////////////////////////

  get Stats() {
    return this.stats;
  }
  set Stats(value) {
    this.stats = value;
  }

  kill() {
    // Say some shit u died whataver
    alert("You died.");

  }

}
