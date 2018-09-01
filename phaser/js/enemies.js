/*jshint esversion: 6 */

/*

88888888888
88
88
88aaaaa      8b,dPPYba,    ,adPPYba,  88,dPYba,,adPYba,   8b       d8
88"""""      88P'   `"8a  a8P_____88  88P'   "88"    "8a  `8b     d8'
88           88       88  8PP"""""""  88      88      88   `8b   d8'
88           88       88  "8b,   ,aa  88      88      88    `8b,d8'
88888888888  88       88   `"Ybbd8"'  88      88      88      Y88'
                                                              d8'
                                                             d8'

  ,ad8888ba,   88
 d8"'    `"8b  88
d8'            88
88             88  ,adPPYYba,  ,adPPYba,  ,adPPYba,
88             88  ""     `Y8  I8[    ""  I8[    ""
Y8,            88  ,adPPPPP88   `"Y8ba,    `"Y8ba,
 Y8a.    .a8P  88  88,    ,88  aa    ]8I  aa    ]8I
  `"Y8888Y"'   88  `"8bbdP"Y8  `"YbbdP"'  `"YbbdP"'

*/

class enemy
{
    // stats array
    // strength, agility, charisma, endurance, intelligence, luck


    ////////////////////////////
    //  CONSTRUCTOR FUNCTION  //
    ////////////////////////////

    constructor(id, gameObj, type, lvl)
    {
        this.id = name;
        this.gameObj = gameObj;
        this.type = type;
        this.lvl = lvl;
        this.maxHealth = 10 + lvl*1.5;
        this.health = this.maxHealth;
        this.stats = [];
    }

    ///////////////////
    //  NAME GETTER  //
    ///////////////////

    get Id()
    {
        return this.name;
    }

    /////////////////////////////
    //  gameObj GETTER/SETTER  //
    /////////////////////////////

    get GameObj()
    {
        return this.gameObj;
    }

    set GameObj(value)
    {
        this.gameObj = value;
        return this.gameObj;
    }

    //////////////////////////
    //  TYPE GETTER/SETTER  //
    //////////////////////////

    get TypeNum()
    {
        return this.type;
    }

    set TypeNum(value)
    {
        this.type = value;
        return this.type;
    }

    get Type()
    {
        try
        {
            return CONST.ENEMY_TYPES[this.type];
        }
        catch(err)
        {
            if (err.name == "RangeError")
            {
                console.error(`ERROR: The "${this.type}" type Number has not been assigned a type`);
            }
            else
            {
                console.error(err.message);
            }
        }
    }

    set Type(value)
    {
        if (CONST.ENEMY_TYPES.indexOf(value) == -1)
        {
            console.error(`ERROR: "${value}" is not a type`);
        }
        else
        {
            this.type = CONST.ENEMY_TYPES.indexOf(value);
            return this.type;
        }
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
        this.maxHealth = 10 + this.lvl*1.5;
        return this.lvl;
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
        return this.health;
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
        return this.stats;
    }
}


/*
88888888888
88
88
88aaaaa      8b,dPPYba,    ,adPPYba,  88,dPYba,,adPYba,   8b       d8
88"""""      88P'   `"8a  a8P_____88  88P'   "88"    "8a  `8b     d8'
88           88       88  8PP"""""""  88      88      88   `8b   d8'
88           88       88  "8b,   ,aa  88      88      88    `8b,d8'
88888888888  88       88   `"Ybbd8"'  88      88      88      Y88'
d8'
d8'

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

function spawnEnemies(_game, enemyCount)
{
    for (var i = 0; i < enemyCount; i++)
    {
        var spawnTile = pickSpawnTile();
        var type = randNum(0, 1);
        var lvl = randNum(1, 10);
        enemies.push(new enemy(i, _game.physics.add.sprite(spawnTile.x, spawnTile.y, 'walker'), type, lvl));
    }

    for (var e = 0; e < enemies.length; e++)
    {
        enemies[e].GameObj.setScale(0.75);
        enemies[e].GameObj.setOrigin(0.5, 0.75);
        enemies[e].GameObj.setCollideWorldBounds(true);
        _game.physics.add.collider(enemies[e].GameObj, _game.groundLayer);
        _game.physics.add.overlap(enemies[e].GameObj, p, combat, null, _game);
    }
}



function enemyAi()
{

}

//(**)
