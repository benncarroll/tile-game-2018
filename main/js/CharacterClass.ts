class Character
{
    ///////////////////////////////
    //   VARIABLE DEFINITIONS    //
    //  REQUIRED FOR TYPESCRIPT  //
    ///////////////////////////////

    name: string;
    lvl: number;
    maxHealth: number;
    health: number;
    statAtk: number;
    statAgi: number;
    statCha: number;
    statEnd: number;
    statInt: number;
    statLck: number;


    ////////////////////////////
    //  CONSTRUCTOR FUNCTION  //
    ////////////////////////////

    constructor(name: string, lvl: number, health: number, statStr: number, statAgi: number, statCha: number, statEnd: number, statInt: number, statLck: number)
    {
        this.name = name,
        this.lvl = lvl,
        this.maxHealth = 5 + lvl*2,
        this.health = health,
        this.statAtk = statStr,
        this.statAgi = statAgi,
        this.statCha = statCha,
        this.statEnd = statEnd,
        this.statInt = statInt,
        this.statLck = statLck
    }


    ///////////////////
    //  NAME GETTER  //
    ///////////////////

    public get Name()
    {
        return this.name;
    }


    ///////////////////////////
    //  LEVEL GETTER/SETTER  //
    ///////////////////////////

    get Lvl()
    {
        return this.lvl;
    }
    set Lvl(value)
    {
        this.lvl = value;
    }


    ////////////////////////////
    //  HEALTH GETTER/SETTER  //
    ////////////////////////////

    get Health()
    {
        return this.health;
    }
    set Health(value)
    {
        this.health = value;
    }


    //////////////////////////
    //  STAT GETTER/SETTER  //
    //////////////////////////

    get StatAtk()
    {
        return this.statAtk;
    }
    get StatAgi()
    {
        return this.statAgi;
    }
    get StatCha()
    {
        return this.statCha;
    }
    get StatEnd()
    {
        return this.statEnd;
    }
    get StatInt()
    {
        return this.statInt;
    }
    get StatLck()
    {
        return this.statLck;
    }
    set StatAtk(statAtk)
    {
        this.statAtk = statAtk;
    }
    set StatAgi(statAgi)
    {
        this.statAgi = statAgi;
    }
    set StatCha(statCha)
    {
        this.statCha = statCha;
    }
    set StatEnd(statEnd)
    {
        this.statEnd = statEnd;
    }
    set StatInt(statInt)
    {
        this.statInt = statInt;
    }
    set StatLck(statLck)
    {
        this.statLck = statLck;
    }
}
