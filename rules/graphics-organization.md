# Graphic asset "organization"
* Main goals: make it as easy as possible for anyone to author a bunch of stuff, and not have it be a _completely_ disorganized mess (only a partially disorganized mess)
* For now, everyone can just create a folder in `assets/tiles` with their name (e.g. `assets/tiles/jimb/file1.png`), and go wild
* If putting multiple tiles in one file:
  * Ensure the tiles are 12x12 and aligned to the 12x12 grid so an automated tool can cut it up trivially
  * Ensure unused portions of the file are empty or a solid color
* If you'd like just a little organization, create 5 files or sub-folders with the names below
* Feel free to also commit source files in Aseprite or PSD or whatever format you work in if you wish, we'll ignore those when delivering to jammers

# Later organization / distribution to jammers
* Goal: every tile needs a filename, so should have some unique, if vague, hopefully meaningful, name (even if it's just "dungeon-37"), so that these can be delivered (but not necessarily authored) as individual .PNGs per tile
* Probably this just means categorizing each tile into one of these categories:
  * **DUNGEON** - generally opaque, useful to build structure - walls, ceilings, floors, doors
  * **DETAILS** - generally alpha-masked, useful as details or decals - trees, chests, torches, fences, rocks, signs
  * **MONSTER** - any mobile living(ish) thing - enemies, NPCs, robots, space ships
  * **ITEMS** - generally alpha-masked, anything that would be at home in an inventory - equipment, potions, coins
  * **UTILITY** - completely abstract tiles, UI components, borders, buttons, gradients, stat icons
* If things become unwieldy, we'll do some re-organizing during asset creation, but if not, we'll organize at the very end
* For context, but not directly related to the organization, for delivering the asset pack to jammers, we'll run a script that chops any image larger than 12x12 into individual tiles (discarding any that are completely the same color / empty) and generates names so we can deliver a collection of individual PNGs.  Then, we'll also run something to grab every image in every folder and combine them into a single giant atlas for people who want a single PNG.  People can use whichever of those formats is most useful.

