function limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}


function round(x, amt) {
  return (x % amt) >= amt / 2 ? parseInt(x / amt) * amt + amt : parseInt(x / amt) * amt;
}
