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
    get Name()
    {
        return this.name;
    }

    get Lvl()
    {
        return this.lvl;
    }
    set Lvl(value)
    {
        this.lvl = value;
    }

    get Health()
    {
        return this.health;
    }
    set Health(value)
    {
        this.health = value;
    }

    get Stats()
    {
        return this.statAtk, this.statAgi, this.statCha, this.statEnd, this.statInt, this.statLck
    }
    set Stats(statStr, statAgi, statCha, statEnd, statInt, statLck)
    {
        this.statAtk = statStr;
        this.statAgi = statAgi;
        this.statCha = statCha;
        this.statEnd = statEnd;
        this.statInt = statInt;
        this.statLck = statLck;
    }

    
}
