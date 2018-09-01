function limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}


function round(x, amt) {
  return (x % amt) >= amt / 2 ? parseInt(x / amt) * amt + amt : parseInt(x / amt) * amt;
}

//////////////////////////////////////////
//  Ease of use random number function  //
//////////////////////////////////////////
function randNum(min, max)
{
    return Math.floor((Math.random() * max+1) + min);
}

////////////////////////////////
//  picks a valid spawn tile  //
////////////////////////////////
function pickSpawnTile() {
    var tilePicked = false;
    var cx;
    var cy;
    while (!tilePicked) {
        var proposedX = Phaser.Math.Between(9,89);
        var proposedY = Phaser.Math.Between(9,89);
        if (m.getTileAt(proposedX, proposedY).index in GLOBALS.PLACEMENT_TILES) {
            cx = proposedX;
            cy = proposedY;
        }
    }
    return {x:cx, y:cy};
}

//////////////////////////////////////////////////
//  Calculates the distance between two points  //
//////////////////////////////////////////////////
function distBetween(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x2 - x1) + Math.pow(y2 - y1));
}

///////////////////////////////////////////////
//  Calculates the angle between two points  //
///////////////////////////////////////////////
function angleTo(x1, y1, x2, y2)
{
    return Math.atan((y2-y1)/(x2-x1)) * 180 / Math.PI;
}

/////////////////////////////////////////////////////////////////////
//  Returns a number rounded to the nearest number of your choice  //
/////////////////////////////////////////////////////////////////////
function roundTo(num, round)
{
    return Math.round(num / round) * round;
}
