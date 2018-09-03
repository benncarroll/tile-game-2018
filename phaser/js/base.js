/*jshint esversion: 6, evil: true */

class entity {
  // stats array
  // attack, speed, endurance

  ////////////////////////////
  //  CONSTRUCTOR FUNCTION  //
  ////////////////////////////

  constructor(id, gameObj, type, lvl) {

    this.id = id;
    this._id = id;
    this.gameObj = gameObj;
    this.gameObj.id = id;
    this._type = type;
    this._lvl = lvl;
    this._maxHealth = round(10 + lvl * 1.5, 1);
    this._health = this.maxHealth;
    this._stats = GLOBALS.ENEMY_DATA[GLOBALS.ENEMY_TYPES[this._type]].stats;
    this._initials = GLOBALS.ENEMY_TYPES[this._type].getInitials();
    this._speed = this._stats.speed;
    this._lastDir = 'up';
    this._dirTime = 5;
    this._dirCurrentTime = 0;
  }

  /////////////////////////////
  //  gameObj GETTER/SETTER  //
  /////////////////////////////

  get GameObj() {
    return this.gameObj;
  }

  set GameObj(value) {
    this.gameObj = value;
    return this.gameObj;
  }

  //////////////////////////
  //  TYPE GETTER/SETTER  //
  //////////////////////////

  get typeNum() {
    return this._type;
  }

  set typeNum(value) {
    this._type = value;
    return this._type;
  }

  get type() {
    try {
      return GLOBALS.ENEMY_TYPES[this._type];
    } catch (err) {
      if (err.name == "RangeError") {
        console.error(`ERROR: The "${this._type}" type Number has not been assigned a type`);
      } else {
        console.error(err.message);
      }
    }
  }

  set type(value) {
    if (GLOBALS.ENEMY_TYPES.indexOf(value) == -1) {
      console.error(`ERROR: "${value}" is not a type`);
    } else {
      this._type = GLOBALS.ENEMY_TYPES.indexOf(value);
      return this._type;
    }
  }
  ///////////////////////////
  //  LEVEL GETTER/SETTER  //
  ///////////////////////////

  get lvl() {
    return this._lvl;
  }
  set lvl(value) {
    this._lvl = value;
    this._maxHealth = 10 + this._lvl * 1.5;
    return this._lvl;
  }


  ////////////////////////////
  //  HEALTH GETTER/SETTER  //
  ////////////////////////////

  get health() {
    return this._health;
  }
  set health(value) {
    this._health = Math.max(value, 0);
    return this._health;
  }
  get maxHealth() {
    return this._maxHealth;
  }
  set maxHealth(value) {
    this._maxHealth = value;
    return this._maxHealth;
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

  /////////////////////////////
  //  LASTDIR GETTER/SETTER  //
  /////////////////////////////

  get lastDir() {
    return this._lastDir;
  }
  set lastDir(value) {
    this._lastDir = value;
    return this._lastDir;
  }
  get dirTime() {
    return this._dirTime;
  }
  set dirTime(value) {
    this._dirTime = value;
    return this._dirTime;
  }
  get dirCurrentTime() {
    return this._dirCurrentTime;
  }
  set dirCurrentTime(value) {
    this._dirCurrentTime = value;
    return this._dirCurrentTime;
  }

  get speed() {
    return this._speed;
  }
  set speed(value) {
    this._speed = value;
    return this._speed;
  }

  kill() {
    this.gameObj.destroy();
    delete enemies[this.id];
  }

}
