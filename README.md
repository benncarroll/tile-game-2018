# tile-game-2018
Carroll & Karozis

---

### A tile-based game for our 2018 Assessment.

Our plan for the game is to have a game in which the user will have to escape. For the graphic element, we plan to go for a simplistic spritesheet that will be able to flow and connect cleanly without an excess of detail. Our game will be web-based, running on a JavaScript base.

## Ideas

- Gameplay
  - Survival elements
  - unique tiles to collect special recourses
  - Fog of war (see around you 5x5, and tiles already explored, everything else grey etc.)
  - randomly generated world with guidelines
    - easier rooms towards the middle and harder ones towards the edges
    - spawn in middle
  - Goal
    - Escape a certain place (i.e. Prison, wilderness)
    - survive a certain precursor event (plane crash, avalanche,)
  - Combat
    - armour increases the chance that the attack will be blocked
    - weapon increases damage
    - higher overall level increases health
    - different weapons allow for different likelihoods of hit/miss

- Implementation
  - JavaScript in canvas, library possibilities:

| Library           | Pros           | Cons     |
| :-------------    | :------------- | :------- |
| ExcaliburJS       | Extensive Tile support, support for Tiled map editor, extensive docs | ❌ |
| JSiso | 3D isometric (hence name), detailed | little docs |
| Phaser | Extremely extensive, good docs | too wide ranging,  |

  - decided on [ExcaliburJS](https://excaliburjs.com)
  - !!!!!! Don't forget Tiled and excaliburjs/excalibur-tiled


## Classes Required
- fight class
- Character Stats
- Movement
- Changing rooms
- Buy/Sell

## Functions Required
- init
- spawning/respawning
- end conditions
- starting restarting game
- saving game
