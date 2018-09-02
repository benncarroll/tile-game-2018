/*jshint esversion: 6 */

/*

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
        this.lastDir = null;
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

    /////////////////////////////
    //  LASTDIR GETTER/SETTER  //
    /////////////////////////////

    get LastDir()
    {
        return this.lastDir;
    }
    set LastDir(value)
    {
        this.lastDir = value;
        return this.lastDir;
    }
}


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
    for (var e = 0; e < enemies.length; e++)
    {
        // if the player is close enough to the enemy then the enemy will chase the player
        if (Math.abs(distBetween(enemies[e].GameObj.x, enemies[e].GameObj.y, p.x, p.y)) < CONST.ENEMY_AGRO_DIST)
        {
            var dirTo = roundTo(angleTo(enemies[e].GameObj.x, enemies[e].GameObj.y, p.x, p.y), 45.0);
            switch(dirTo)
            {
                case 0 || 360:
                    enemyMove(enemies[e], "up");
                    break;

                case 45:
                    enemyMove(enemies[e], "upRight");
                    break;

                case 90:
                    enemyMove(enemies[e], "right");
                    break;

                case 135:
                    enemyMove(enemies[e], "downRight");
                    break;

                case 180:
                    enemyMove(enemies[e], "down");
                    break;

                case 225:
                    enemyMove(enemies[e], "downLeft");
                    break;

                case 270:
                    enemyMove(enemies[e], "left");
                    break;

                case 315:
                    enemyMove(enemies[e], "upLeft");
                    break;

                default:
                    console.error(`ERROR: ${dirTo} is an invalid direction`);
                    break;
            }
        }
        // otherwise it will wonder around randomly
        else
        {
            var directions = ["up", "down", "left", "right", "upLeft", "upRight", "downLeft", "downRight"];

            var valid = false;
            var theDir = null;
            while(!valid)
            {
                theDir = directions[randNum(0, 7)];
                if (theDir != enemies[e].LastDir)
                {
                    valid = true;
                }
            }
            enemyMove(enemies[e], theDir);
        }
    }
}

function enemyMove(enemy, dir)
{
    switch(dir)
    {
        case "up":

            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x), Math.floor(enemy.GameObj.y) + 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "up";
            return true;

        case "down":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x), Math.floor(enemy.GameObj.y) - 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "down";
            return true;

        case "left":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) - 1, Math.floor(enemy.GameObj.y), CONST.ENEMY_SPEED);
            enemy.LastDir = "left";
            return true;

        case "right":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) + 1, Math.floor(enemy.GameObj.y), CONST.ENEMY_SPEED);
            enemy.LastDir = "right";
            return true;

        case "upLeft":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) - 1, Math.floor(enemy.GameObj.y) + 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "upLeft";
            return true;

        case "upRight":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) + 1, Math.floor(enemy.GameObj.y) + 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "upRight";
            return true;

        case "downLeft":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) - 1, Math.floor(enemy.GameObj.y) - 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "downLeft";
            return true;

        case "downRight":
            moveTo(enemy.GameObj, Math.floor(enemy.GameObj.x) + 1, Math.floor(enemy.GameObj.y) - 1, CONST.ENEMY_SPEED);
            enemy.LastDir = "downRight";
            return true;

        default:
            console.error(`ERROR: ${dir} is an invalid direction`);
            return false;
    }
}


//(**)
