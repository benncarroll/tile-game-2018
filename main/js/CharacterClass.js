var Character = (function () {
    function Character(name, lvl, health, statStr, statAgi, statCha, statEnd, statInt, statLck) {
        this.name = name,
            this.lvl = lvl,
            this.maxHealth = 5 + lvl * 2,
            this.health = health,
            this.statAtk = statStr,
            this.statAgi = statAgi,
            this.statCha = statCha,
            this.statEnd = statEnd,
            this.statInt = statInt,
            this.statLck = statLck;
    }
    Object.defineProperty(Character.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "Lvl", {
        get: function () {
            return this.lvl;
        },
        set: function (value) {
            this.lvl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "Health", {
        get: function () {
            return this.health;
        },
        set: function (value) {
            this.health = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatAtk", {
        get: function () {
            return this.statAtk;
        },
        set: function (statAtk) {
            this.statAtk = statAtk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatAgi", {
        get: function () {
            return this.statAgi;
        },
        set: function (statAgi) {
            this.statAgi = statAgi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatCha", {
        get: function () {
            return this.statCha;
        },
        set: function (statCha) {
            this.statCha = statCha;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatEnd", {
        get: function () {
            return this.statEnd;
        },
        set: function (statEnd) {
            this.statEnd = statEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatInt", {
        get: function () {
            return this.statInt;
        },
        set: function (statInt) {
            this.statInt = statInt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "StatLck", {
        get: function () {
            return this.statLck;
        },
        set: function (statLck) {
            this.statLck = statLck;
        },
        enumerable: true,
        configurable: true
    });
    return Character;
}());
//# sourceMappingURL=CharacterClass.js.map