/*jshint esversion: 6 */

var currentEnemy = null;
var allowPlayerTurn = false;
var enemyDead = false;

function combat(enemyGameObject, player) {
  // initialisation of the combat
  inCombat = true;
  enemyDead = false;
  if (enemyGameObject.hasOwnProperty("gameObj")) {
    currentEnemy = enemies[enemyGameObject.id];
  } else {
    currentEnemy = enemyGameObject;
  }

  updateFightBox(currentEnemy, player);

  enemyTurn(currentEnemy, player);

}

function playerHeal() {
  playerTurn('heal');
}
function playerHit() {
  playerTurn('hit');
}

function playerTurn(action) {
  // console.log("Hit!", action);
  if (!allowPlayerTurn) {
    console.log('action blocked, slow down.');
    return;
  }
  allowPlayerTurn = false;
  // Called by button press
  if (inCombat && !enemyDead) {
    var result = 0;
    var player = p;

    // Player action will be decided by passed variable
    // below line is temporary
    if (action == 'hit') {
      dmg = round(calcDamage(player.stats), 1);
      currentEnemy.health -= dmg;
      actionDesc = `${currentEnemy._initials} took ${dmg} damage.`;
    } else if (action == 'heal') {
      p.health += p.stats.heal;
      p.health = Math.min(p.health, p.maxHealth);
      actionDesc = `P healed, gaining ${p.stats.heal}hp.`;
    }

    attacker = 1;
    updateFightBox(currentEnemy, player, "", actionDesc);

    if (player.health <= 0) {
      // case for if the player loses
      endCombat(0);
    } else if (currentEnemy.health <= 0) {
      // case for if the player wins
      endCombat(1);
      result = 1;
    }

    setTimeout(function() {
      if (!enemyDead) {
        enemyTurn(currentEnemy, player);
      }
    }, Phaser.Math.Between(1000, 1200));

  }
}

function enemyTurn(enemy, player) {
  if (inCombat) {
    setTimeout(function() {
      allowPlayerTurn = true;
    }, 200);
    var result = 0;

    // insert enemy attacking stuff here
    // below line is temporary
    // console.log(enemy);
    dmg = round(calcDamage(enemy.stats), 1);
    player.health -= dmg;
    player.health = Math.max(player.health, 0);

    actionDesc = `P took ${dmg} damage.`;

    attacker = 0;
    updateFightBox(enemy, player, "", actionDesc);

    if (player.health <= 0) {
      // case for if the player loses
      endCombat(0);
    } else if (enemy.health <= 0) {
      // case for if the player wins
      endCombat(1);
    }
  }
}

function calcDamage(o) {
  return o.attack * randDec(0.5, 1.5);
}

function endCombat(finishCase) {
  switch (finishCase) {
    case 1:

      enemyDead = true;
      updateFightBox(currentEnemy, p, "You won!");
      currentEnemy.kill();

      setTimeout(function() {
        currentEnemy = null;
        inCombat = false;
        if (!currentEnemy) {
          toggleFightBox(false);
        }

      }, 1500);

      break;
    case 0:

      document.addEventListener("click", function(evnt) {
        localStorage.removeItem("userData");
        location.reload();
      });

      updateFightBox(currentEnemy, p, "You died! Click anywhere to restart.");
      playerDead = true;
      currentEnemy = null;
      inCombat = false;
      console.log(p.play(characterId + '-dead'));
      // p.setVisible(false);

      setTimeout(function() {
        toggleFightBox(false);
        GLOBALS.PLAYER_ENABLED = false;
      }, 2000);

      break;

  }
}
