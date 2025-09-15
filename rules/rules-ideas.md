# Rules Ideas

A file to document specific ideas and concerns regarding rules, pertinently those that are relevant to how the art can and can't be used.

## --- BEGIN --- DRAFT ---
# General rules

[Copy from DCJam](<https://itch.io/jam/dcjam2024>), with the following (minor) changes:

**Goal**: Using limited assets, create a finished and reasonably polished dungeon crawler; not a prototype, proof of concept or tech demo, but a small game you can play from beginning to end.

**FAQ**: No to 3rd party assets (Gen AI or pre-made other than as provided)

**Rating**: Entries will be rated in multiple categories (TODO: draft these later, if we agree we want multiple, but I'll throw out the controversial set of "Overall Fun", "Innovation", "Retrocity", "Asset Utilization")

**Recommendations**: Add default of Q/E for strafe

# Limited Assets Rules
* Limit yourself to only using the game assets provided
* **Graphics**
  * You may additionally use, plus up to 10 original, hand-made (no Gen-AI), "bonus" tiles in the same style - 12x12, limited palette.  Bonus tiles must be shared on the itch game page (maybe: and may be included by the jam organizers in a post-jam asset pack release?)
  * The assets may be palette swapped, stretched, scaled, used as textures on 2D/3D primitives (quads/cubes/spheres/cylinders/particles/etc), but all textures must be recognizably from the asset pack (or your bonus tiles) (TODO: provide examples)
  * "Palette swapping" means that every texel which was the same color in the original image should all be swapped to the same (new) color (including transparent) (TODO: provide examples)
  * Cropping tiles to extract recognizable elements (e.g. just the door from a door + frame tile, or a lever from one tile to place in front of a different background) is allowed, as long as the result is still identifiable (TODO: provide examples)
  * Tiles do not necessarily need to be used 1:1 for wall textures (e.g. you may texture a wall with a 3x3 grid of tiles, as long as the originals are still identifiable)
  * It is not allowed to use models, textures, fonts or other assets that come with your game engine (with the exception of primitives as noted above)
  * Example against the spirit of the jam: any overlaying or compositing where the result is essentially a completely new texture that could more simply have been authored
* Fonts may be styled (drop-shadows, outlines, etc) as long as they remain recognizable
* Custom materials, shaders, post-processing, etc, are all allowed, as long as all textures are sourced from the assets (examples: dithered lighting, outlining)
* **Audio**
  * (TODO: insert line about what's allowed to be done with the provided SFX/music)
  * Original voice recordings are allowed (TODO: insert recommended sampling rate/settings to match style)
* If you feel unclear on whether something is allowed or not, feel free to reach out on Discord.  It's meant to be a game jam where you challenge yourself to only use premade assets.

## --- END --- DRAFT ---



## DC Rules

- Standard DCJAM rules apply (do we want to make any changes to the permissiveness as the art is being provided, e.g. regarding combat?)
- I (Slippers) think we should give a standard set of keybindings as an example. Q/E & A/D shenanigans abound.



## Consensus / Discussion Needed
- Generative AI
  - (Local) I think we should ban any asset creation with generative AI. There should be no need to add assets anyhow, but if we have "slots" open for art, sound fx, or music then I think it should be hand made
  - (Slippers) Hard agree, of all the jams where genAI doesn't make sense, this has got to be one of them. Getting genAI to actually produce pixel art from what I understand is a nightmare, but if someone wants to use AI and hand-paint something such that we cannot tell the difference, then we won't know anyway. I Wouldn't want to see any clear and obvious uses.

- 3D Meshes - Permitted usage:
    - Should meshes be limited to primitive shapes?
    - For example is it limited to planes, cubes and other similar shapes, or can more complex meshes be used as long as the provided art is used to texture them?
      - (Local) If we allow it we should have a very limited number of custom shapes one can add
      - (Local) I think it might be fine to add at least a cube primitive as an allowed 3D art. Maybe some other primitive too like sphere and pyramid? 
      - (Slipeprs) The potential problem with this limitation is that meshes are used for a wide vareity of things such as the subsequently discussed particle emitters, which can be mesh-based, as well as collision shapes, and if people want to skin 3d enemies (not likely, but I'd like to allow it if someone is brave enough) and make composite textures rather than just having billboards.

- Particle systems:
    - Are particle systems allowed, provided that emmiters only use spirtes / billboards of the given art assets?
        - (Jimbly) I say yes
        - (Local) I think yes too!

- Procedural Generation:
    - (Slippers) I vote that we ban any and all procedurally generated colour / audio.
        - (Jimbly) Arguably, that's what "lighting" is in engines - anything that feels like post-processing/lighting/visual effects I'd say is a fine way to use the assets, generating something as a replacement/alternative to a source asset seems not fine.
    - I am more open to the use of edge detection filters to generate normal maps if participants should want to:
        - Notch is making a crawler with those techniques which might serve as inspiration for this usecase

- Decide on definition of pallete swap, with visual examples.

- Art assets should remain structurally sound:
    - Adjustments can be made via shaders to colour, brightness etc, but must be made across the entire texture uniformly. i.e. the same shader must be run across each fragment.
    - (Jimbly) I'd want to allow reasonable cutting, especially for technical reasons.  E.g. cutting a wall + door texture into 2 to animate it, or use one style door with a different style frame, and similar - this overlaps with what shape of meshes you're allowed to put these textures on
        - (Slippers) cutting sounds reasonable as long as the edges meet at where they are cut, such as the example of animating a door.
    - (Local) Art asset should maintain its original 1:1 aspect ratio in world coordinates. You can apply post-processing and such effect that distort the world but you can't make a line out of some tile and use it as a divider line inside a UI component
    - (Local) I think each sprite should not have too many colors
    - (Local) I think it should be allowed to reinterpret what is transparent in the asset at will (though stil on color basis of the original texture)
    - (Local) I think it should be allowed to tile or otherwise use more than one texture per wall/floor/ceiling to mosaically build up a more complex image

- Voice
  - (Local) I think we should be allowed some or even as many as we want voice lines into the game as it sort of equates adding text. And I don't think we want to limit text do we?
  - (Slippers) I think that's okay, but I would like to strictly enforce the no genAI on this (if we agree on that as a rule).
   
## Possible loopholes

- Sprite destruction and reassembly:
    - fracturing down into sections and rearranging back into a new 12x12 sprite (if it's not recognizeable as from the original asset pack, it's a clear violation of the spirit of the rules)

- Not using any of the provided assets and building a game some other way:
    - line renderer
    - abuse of shader permissiveness

- Shader Use:
    - Branching shader based upon UV to create a new sprite by applying different adjustments to different parts of the texture.
