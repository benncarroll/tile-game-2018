/*jshint esversion: 6 */

function genChecksum(userData) {
  if (typeof userData === 'object') {
    cs = Number(userData.playerPosition.x);
    cs *= Number(userData.playerPosition.y);
    cs -= Number(userData.health) / 2;
    return cs;
  } else {
    throw "Object not passed to genChecksum! Passed variable: " + ud.toString();
  }
}

function saveUserData(_scene) {

  // obj = localStorage.getItem(userData)
  if (localStorage.getItem('userData') == null) {
    craftedStorage = {
      playerPosition: {
        x: 184.5,
        y: 247
      },
      health: 100,
      charType: 'walker',
      lvl:1,
      // inventory:{},
      cs: 0
    };
  } else {
    try {
      craftedStorage = JSON.parse(Base64.decode(localStorage.getItem('userData')));
    } catch (e) {
      // console.warn("Stored data parsing error.");
      // console.log(e);
      localStorage.removeItem('userData');
      saveUserData();
    }
  }

  craftedStorage.playerPosition = {
    x: p.x,
    y: p.y
  };

  craftedStorage.charType = characterId;

  craftedStorage.lvl = p.lvl;

  craftedStorage.cs = genChecksum(craftedStorage);

  localStorage.setItem('userData', Base64.encode(JSON.stringify(craftedStorage)));

  // doLog("Save completed.");

}

function loadUserData() {

  console.log("Fetching previous user data...");

  if (localStorage.getItem('userData') == null) {
    saveUserData();
  }

  try {
    userData = JSON.parse(Base64.decode(localStorage.getItem('userData')));
  } catch (e) {
    console.warn("Stored data parsing error, re-saving.");
    // console.log(e);
    saveUserData();
    return;
  }

  // Gen checksum
  cs = genChecksum(userData);

  if (cs != Number(userData.cs)) {
    console.warn("Checksum invalid - Setting values to 0.");
    // resetUserData(true);
    return;
  } else {
    console.log("Checksum validated - User data loaded.");
  }

  // wallet.updateCash(Number(userData.userCash));
  // timeStarted = Number(userData.timeStarted);
  p.x = userData.playerPosition.x;
  p.y = userData.playerPosition.y;
  p.health = userData.health;
  characterId = userData.charType;
  p.lvl = userData.lvl;

  userDataLoaded = true;

}
