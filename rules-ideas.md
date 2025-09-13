# Rules Ideas

A file to document specific ideas and concerns regarding rules, pertinently those that are relevant to how the art can and can't be used.


## DC Rules

- Standard DCJAM rules apply (do we want to make any changes to the permissiveness as the art is being provided, e.g. regarding combat?)
- I (Slippers) think we should give a standard set of keybindings as an example. Q/E & A/D shenanigans abound.



## Consensus / Discussion Needed

- 3D Meshes - Permitted usage:
    - Should meshes be limited to primitive shapes?
    - For example is it limited to planes, cubes and other similar shapes, or can more complex meshes be used as long as the provided art is used to texture them?

- Particle systems:
    - Are particle systems allowed, provided that emmiters only use spirtes / billboards of the given art assets?

- Procedural Generation:
    - (Slippers) I vote that we ban any and all procedurally generated colour / audio. 
    - I am more open to the use of edge detection filters to generate normal maps if participants should want to:
        - Notch is making a crawler with those techniques which might serve as inspiration for this usecase

- Decide on definition of pallete swap, with visual examples.

- Art assets should remain structurally sound:
    - Adjustments can be made via shaders to colour, brightness etc, but must be made across the entire texture uniformly. i.e. the same shader must be run across each fragment.


## Possible loopholes

- Sprite destruction and reassembly:
    - fracturing down into sections and rearranging back into a new 12x12 sprite

- Not using any of the provided assets and building a game some other way:
    - line renderer
    - abuse of shader permissiveness

- Shader Use:
    - Branching shader based upon UV to create a new sprite by applying different adjustments to different parts of the texture.
