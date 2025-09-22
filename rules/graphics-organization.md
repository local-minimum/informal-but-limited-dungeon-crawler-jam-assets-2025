# Graphic asset organization proposal
* Main goals: make it as easy as possible for anyone to author a bunch of stuff, and not have it be a _completely_ disorganized mess (only a partially disorganized mess)
* Side goal: every tile should have some unique, if vague, hopefully meaningful, name (even if it's just "floor-37"), so that these can be delivered (but not necessarily authored) as individual .PNGs per tile
* Use _dashes_ as word delimiter (I'd also be happy with underscores or spaces or CamelCase, as long as we all do the same - speak now or forever hold your peace!)
* **Always**: name things from most general to most specific, e.g. `dungeon/floor-wooden-broken-02`
* Top-level folders:
  * **DUNGEON** - generally opaque, useful to build structure - walls, ceilings, floors, doors
  * **DETAILS** - generally alpha-masked, useful as details or decals - trees, chests, torches, fences, rocks, signs
  * **MONSTER** - any mobile living(ish) thing - enemies, NPCs, robots, space ships
  * **ITEMS** - generally alpha-masked, anything that would be at home in an inventory - equipment, potions, coins
  * **UTILITY** - completely abstract tiles, UI components, borders, buttons, gradients, stat icons
* Within each folder:
  * Author either individual files, or multiple related tiles in a single file
    * If individual files, just name each file appropriately
    * If multiple tiles in a single file, name the file more generally (e.g. `floors`) and the unique name is just the file plus an index (e.g. `floors-01`).  Make sure unused portions of the file are empty or a solid color.
  * Feel free to also commit source files in Aseprite or PSD or whatever format you work in if you wish, we'll ignore those when delivering to jammers
* Each author can make a folder for themselves if they want, though it might be easier to view thumbnails of what's currently available if we just work flat in each folder, and I don't expect too many conflicts based on how many people are volunteering, but if you want to completely avoid conflicts, just make a folder with your name (either `assets/dungeon/jimb/` and `assets/details/jimb` *or* `assets/jimb/dungeon/` and `assets/jimb/details` seems fine)

For context, but not directly related to the organization, for delivering the asset pack to jammers, we'll run a script that chops any image larger than 12x12 into individual tiles (discarding any that are completely the same color / empty) and generates names so we can deliver a collection of individual PNGs.  Then, we'll also run something to grab every image in every folder and combine them into a single giant atlas for people who want a single PNG.  People can use whichever of those formats is most useful.
