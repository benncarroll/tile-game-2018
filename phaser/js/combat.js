/*jshint esversion: 6 */
function combat(playerName, tile)
{
    // initialisation of the combat
    combatInit();

    // loop variables
    var loop = true;
    var outcome = null;

    while(loop)
    {
        // start enemy turn
        switch (enemyTurn())
        {
            case -1:
                // case for if the player wins
                loop = false;
                outcome = "win";
                break;

            case -2:
                // case for if the player loses
                loop = false;
                outcome = "lose";
                break;
        }

        // start player turn
        switch (playerTurn())
        {
            case -1:
                // case for if the player wins
                loop = false;
                outcome = "win";
                break;

            case -2:
                // case for if the player loses
                loop = false;
                outcome = "lose";
                break;
        }
    }
    // if the enemy is defeated then end()
    end();
}

function combatInit()
{

}

function playerTurn()
{

}

function enemyTurn()
{

}

function calcDamage()
{

}

function end()
{

}
