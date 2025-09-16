# General rules

[Copy from DCJam](<https://itch.io/jam/dcjam2025>), we've made some minor tweaks [here](https://github.com/local-minimum/informal-but-limited-dungeon-crawler-jam-assets-2025/blob/main/rules/rules-dcjam-updated.md) (refine Goal, no AI/3rd party assets)

**Rating**: Entries will be rated in multiple categories (TODO: draft these later, if we agree we want multiple, but I'll throw out the controversial set of "Overall Fun", "Innovation", "Retrocity", "Asset Utilization")

# Limited Assets Rules
* Limit yourself to only using the game assets provided
* To keep with the spirit of the jam, where transformations and combinations of assets are allowed as specified below, the original asset must always still be recognizable
* **Graphics**
  * You may additionally use, plus up to 8 original, hand-made (no Gen-AI), "bonus" tiles in the same style - 12x12, limited palette per tile. Bonus tiles must be shared on the itch game page (maybe: and may be included by the jam organizers in a post-jam asset pack release?)
  * The assets may be palette swapped, stretched, scaled, used as textures on 2D/3D primitives (quads/cubes/spheres/cylinders/particles/etc), but all textures must be recognizably from the asset pack (or your bonus tiles) (TODO: provide examples)
  * "Palette swapping" means changing all pixels of a color in a tile to a (new) single color (including transparent) (TODO: provide examples)
  * For the bonus tiles and palette swapping, you are not limited to colors in the original asset, but sticking to a limited palette will help with consistency and to follow the "original assets must always be recognizable" rule
  * Cropping tiles to extract recognizable elements (e.g. just the door from a door + frame tile, or a lever from one tile to place in front of a different background) is allowed, as long as the result is still identifiable (TODO: provide examples)
  * Tiles do not necessarily need to be used 1:1 for wall textures (e.g. you may texture a wall with a 3x3 grid of tiles, as long as the originals are still identifiable)
  * It is not allowed to use models, textures, fonts or other assets that come with your game engine (with the exception of primitives as noted above)
  * Example against the spirit of the jam: any overlaying or compositing where the result is essentially a completely new texture that could more simply have been authored
  * Exception: A logo/intro screen for you/your brand/engine is allowed (e.g. "by Super-Great Games", "powered by Godot")
  * Custom materials, shaders, post-processing, lighting, etc, are all allowed, as long as all textures are sourced from the assets and input colors from the provided palette (examples: dithered lighting, outlining)
* **Fonts**
  * The fonts provided in the asset pack must be used throughout the game 
  * Fonts may be styled (drop-shadows, outlines, etc) as long as they remain recognizable
* **Audio**
  * Music and Sound effects should be composed from the provided assets.
  * Audio can be distorted by effects but as with skewing the textures, it may not be transformed entirely out of recognition. I.e. you can not crop a track down to a note and use that as an instrument to create entirely new melodies. 
  * (TODO: insert line about what's allowed to be done with the provided SFX/music)
  * Original voice recordings are allowed, but the same AI-rules apply as with all other asset creation (TODO: insert recommended sampling rate/settings to match style)
* **Text**
  * There is no limitation to text, but the same AI-rules apply as with all other asset creation
  * If you feel this is too permissive, consider outlawing all words containing the letter "I" or similar.
* If you feel unclear on whether something is allowed or not, feel free to reach out on Discord.  It's meant to be a game jam where you challenge yourself to only use premade assets.
