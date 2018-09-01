/*jshint esversion: 6 */

var currentEnemy = null;

function combat(enemy, player) {
  // initialisation of the combat
  inCombat = true;
  updateFightBox(enemy, player);

  currentEnemy = enemy;

  enemyTurn(enemy, player);

}

function playerTurn(action, player_i) {
  // Called by button press
  if (inCombat) {
    var result = 0;
    var player = player_i || p;

    // Player action will be decided by passed variable
    // below line is temporary
    currentEnemy.health -= round(calcDamage(player.stats), 1);

    updateFightBox(currentEnemy, player);

    if (player.health <= 0) {
      // case for if the player loses
      player.kill();
    } else if (currentEnemy.health <= 0) {
      // case for if the player wins
      endCombat();
    }

    setTimeout(function() {
      enemyTurn(currentEnemy, player);
    }, Phaser.Math.Between(200, 800));

  }
}

function enemyTurn(enemy, player) {
  if (inCombat) {
    var result = 0;

    // insert enemy attacking stuff here
    // below line is temporary
    player.health -= round(calcDamage(enemy.stats), 1);

    updateFightBox(enemy, player);

    if (player.health <= 0) {
      // case for if the player loses
      player.kill();
    } else if (enemy.health <= 0) {
      // case for if the player wins
      endCombat();
    }
  }
}

function calcDamage(o) {
  return o.attack * randDec(0.5, 1.5);
}

function endCombat() {
  currentEnemy = null;
  inCombat = false;

  alert("You won!");

  setTimeout(function() {
    toggleFightBox(false);
  }, 2000);

}
