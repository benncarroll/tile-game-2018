# FuseBlade
Carroll & Karozis

---

### A tile-based game for our 2018 11SDD Assessment.

Our plan for the game is to make a basic RPG with modern technologies that will make it easily expandable in the future. For the graphic element, we plan to go for a simplistic spritesheet that will be able to flow and connect cleanly without an excess of detail. Our game will run in a browser on a JavaScript base.

Available live at [http://projects.bencarroll.tech/fuseblade](http://projects.bencarroll.tech/fuseblade) !

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

## Game Engine Ideas

| Library           | Pros           | Cons     |
| :-------------    | :------------- | :------- |
| ExcaliburJS       | Extensive Tile support, support for Tiled map editor, extensive docs | Requires node modules and packing (big no thankyou) |
| JSiso | 3D isometric (hence name), detailed | little docs |
| Phaser | Extremely extensive, good docs | Seems to be to wide |

  - decided on [ExcaliburJS](https://excaliburjs.com)
  - realised this was a really dumb decision
  - now transitioned to [Phaser.js](https://phaser.io) and have a working copy

> sidenote:
>
> 12+ hours was spent on Excalibur to no avail, the webpage did not even render once.
> It will not be touched ever again even with a 120-foot carbon fibre shock-absorbent pole
>
> conversely, phaser, is amazing.
> In 3 hours I have been able to load a tilemap, create a movable player with a following camera and even animate the bloody guy.
> Evidently, phaser will be exalted from here on in.

## Classes Required
- Fight class
- Character Stats
- Movement
- Changing rooms
- Buy/Sell

## Functions Required
- Initialisation
- Spawning/respawning
- End conditions
- Starting restarting game
- Saving game
