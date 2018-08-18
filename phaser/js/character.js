/*jshint esversion: 6 */
class Character
{
    // stats array
    // strength, agility, charisma, endurance, intelligence, luck


    ////////////////////////////
    //  CONSTRUCTOR FUNCTION  //
    ////////////////////////////

    constructor(name, lvl, health, stats)
    {
        this.name = name || "Steve";
        this.lvl = lvl || 0;
        this.maxHealth = 10 + lvl*2;
        this.health = health || this.maxHealth;
        this.stats = stats;
    }





/*

  ,ad8888ba,                                                                             d8
 d8"'    `"8b                ,d       ,d                                               ,8P'
d8'                          88       88                                              d8"
88              ,adPPYba,  MM88MMM  MM88MMM  ,adPPYba,  8b,dPPYba,  ,adPPYba,       ,8P'
88      88888  a8P_____88    88       88    a8P_____88  88P'   "Y8  I8[    ""      d8"
Y8,        88  8PP"""""""    88       88    8PP"""""""  88           `"Y8ba,     ,8P'
 Y8a.    .a88  "8b,   ,aa    88,      88,   "8b,   ,aa  88          aa    ]8I   d8"
  `"Y88888P"    `"Ybbd8"'    "Y888    "Y888  `"Ybbd8"'  88          `"YbbdP"'  8P'



 ad88888ba
d8"     "8b                ,d       ,d
Y8,                        88       88
`Y8aaaaa,     ,adPPYba,  MM88MMM  MM88MMM  ,adPPYba,  8b,dPPYba,  ,adPPYba,
  `"""""8b,  a8P_____88    88       88    a8P_____88  88P'   "Y8  I8[    ""
        `8b  8PP"""""""    88       88    8PP"""""""  88           `"Y8ba,
Y8a     a8P  "8b,   ,aa    88,      88,   "8b,   ,aa  88          aa    ]8I
 "Y88888P"    `"Ybbd8"'    "Y888    "Y888  `"Ybbd8"'  88          `"YbbdP"'

*/
//(*)


    ///////////////////
    //  NAME GETTER  //
    ///////////////////

    get Name()
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
        this.maxHealth = 5 + this.lvl*2;
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

    get Stats()
    {
        return this.stats;
    }
    set Stats(value)
    {
        this.stats = value;
    }

//(**)


/*
88888888888                                             88
88                                               ,d     ""
88                                               88
88aaaaa  88       88  8b,dPPYba,    ,adPPYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,   ,adPPYba,
88"""""  88       88  88P'   `"8a  a8"     ""    88     88  a8"     "8a  88P'   `"8a  I8[    ""
88       88       88  88       88  8b            88     88  8b       d8  88       88   `"Y8ba,
88       "8a,   ,a88  88       88  "8a,   ,aa    88,    88  "8a,   ,a8"  88       88  aa    ]8I
88        `"YbbdP'Y8  88       88   `"Ybbd8"'    "Y888  88   `"YbbdP"'   88       88  `"YbbdP"'
*/
//(*)



    kill()
    {
        // Say some shit u died whataver

    }

//(**)
}
