## Ideas

- Gameplay
  - Survival elements
  - Unique tiles to collect special recourses
  - Fog of war (see around you 5x5, and tiles already explored, everything else grey etc.)
  - Randomly generated world with guidelines
	- Easier rooms towards the middle and harder ones towards the edges
	- Spawn in middle
  - Goal
	- Escape a certain place (i.e. Prison, wilderness)
	- Survive a certain precursor event (plane crash, avalanche,)
  - Combat
	- Armour increases the chance that the attack will be blocked
	- Weapon increases damage
	- Higher overall level increases health
	- Different weapons allow for different likelihoods of hit/miss

## Game Engine Ideas

| Library           | Pros           | Cons     |
| :-------------    | :------------- | :------- |
| ExcaliburJS       | Extensive Tile support, support for Tiled map editor, extensive docs | Requires node modules and packing (big no thankyou) |
| JSiso | 3D isometric (hence name), detailed | Little docs |
| Phaser | Extremely extensive, good docs | Seems to be to wide |

  - Decided on [ExcaliburJS][1]
  - Realised this was a really dumb decision
  - Now transitioned to [Phaser.js][2] and have a working copy

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

[1]:	https://excaliburjs.com
[2]:	https://phaser.io