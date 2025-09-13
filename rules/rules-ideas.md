# Rules Ideas

A file to document specific ideas and concerns regarding rules, pertinently those that are relevant to how the art can and can't be used.


## DC Rules

- Standard DCJAM rules apply (do we want to make any changes to the permissiveness as the art is being provided, e.g. regarding combat?)
- I (Slippers) think we should give a standard set of keybindings as an example. Q/E & A/D shenanigans abound.



## Consensus / Discussion Needed
- Generative AI
  - (Local) I think we should ban any asset creation with generative AI. There should be no need to add assets anyhow, but if we have "slots" open for art, sound fx, or music then I think it should be hand made

- 3D Meshes - Permitted usage:
    - Should meshes be limited to primitive shapes?
    - For example is it limited to planes, cubes and other similar shapes, or can more complex meshes be used as long as the provided art is used to texture them?
      - (Local) If we allow it we should have a very limited number of custom shapes one can add
      - (Local) I think it might be fine to add at least a cube primitive as an allowed 3D art. Maybe some other primitive too like sphere and pyramid? 

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
    - (Local) I think each sprite should not have too many colors
    - (Local) I think it should be allowed to reinterpret what is transparent in the asset at will (though stil on color basis of the original texture)
    - (Local) I think it should be allowed to tile or otherwise use more than one texture per wall/floor/ceiling to mosaically build up a more complex image

- Voice
  - (Local) I think we should be allowed some or even as many as we want voice lines into the game as it sort of equates adding text. And I don't think we want to limit text do we?
   
## Possible loopholes

- Sprite destruction and reassembly:
    - fracturing down into sections and rearranging back into a new 12x12 sprite (if it's not recognizeable as from the original asset pack, it's a clear violation of the spirit of the rules)

- Not using any of the provided assets and building a game some other way:
    - line renderer
    - abuse of shader permissiveness

- Shader Use:
    - Branching shader based upon UV to create a new sprite by applying different adjustments to different parts of the texture.
