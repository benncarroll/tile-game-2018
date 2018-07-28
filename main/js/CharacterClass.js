Class Character
{
    constructor(name, lvl, health, statStr, statAgi, statCha, statEnd, statInt, statLck)
    {
        this.name = name;
        this.lvl = lvl;
        this.maxHealth = 5 + lvl*2;
        this.health = health;
        this.statAtk = statStr;
        this.statAgi = statAgi;
        this.statCha = statCha;
        this.statEnd = statEnd;
        this.statInt = statInt;
        this.statLck = statLck;

    }
}
