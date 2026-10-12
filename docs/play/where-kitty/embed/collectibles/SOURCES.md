# Collectible cat portraits

Generated with OpenAI image generation on 2026-09-09 for Where Kitty, using `Art/cat_icon.png` as a visual reference.

The four prompts requested a centered, transparent-background collectible cat bust matching the game's warm, rounded, storybook style: a wizard, deep-sea explorer, dinosaur adventurer, and space captain. Final files were resized to 512×512 PNG with alpha and stripped metadata.

Four additional milestone portraits were generated with OpenAI image generation on 2026-09-11, using the existing Starwhisker portrait for collection style and the corresponding level painting for costume and palette inspiration: Sphinxie (level 15), Moonpetal (level 18), Sunny (level 21), and Professor Paws (level 24). Every prompt ended with `TRANSPARENT BACKGROUND` repeated three times. The outputs were resized to 512×512 PNG, validated for true alpha, and stripped of metadata.

## Journey redesign assets

Generated with the built-in OpenAI image-generation tool on 2026-09-09, using the Wizard School and Space Station paintings plus `Art/cat_icon.png` as style references.

- `public/journey/adventure-map.webp`: a text-free vertical storybook island/river map backdrop, kept separate from all live labels, paths, and state.
- `public/journey/kitty-album-book.png`: transparent illustrated travel scrapbook prop.
- `public/journey/landmarks/*.png`: twelve transparent landmark stickers generated as a regular atlas and split into modular per-level files. The final prompt ended with `TRANSPARENT BACKGROUND` repeated three times, per the project's preferred generation convention.

All outputs were resized, stripped of metadata, and integrated as modular artwork. Future levels can use a new landmark file without regenerating the backdrop or progression UI.

## Completed landmark badge

Generated with the built-in OpenAI image-generation tool on 2026-09-09 as a single bold green checkmark inside a warm cream circular sticker, with a dark-brown storybook outline and transparent surroundings. The prompt specified a clear read at 32 pixels, no text or extra symbols, and ended with `TRANSPARENT BACKGROUND` repeated three times. The generated image was resized and saved as `public/journey/completed-check.png` and is loaded only when progression UI is first opened.

## Levels 13–15 landmarks

Generated with the built-in OpenAI image-generation tool on 2026-09-09 using each exported level background as its subject/palette reference and the existing Wizard landmark as its composition/style reference.

- `japanese-festival.png`: isolated shrine gate, lanterns, cherry blossoms, and festival stalls.
- `pirate-ship.png`: isolated ornate pirate ship with cream sails and black flag.
- `pyramid-egypt.png`: isolated pyramid entrance with painted columns and a sarcophagus centerpiece.

Each prompt requested one centered, fully visible, text-free Journey landmark with no frame or circle and ended with `TRANSPARENT BACKGROUND` repeated three times. Outputs were resized to 414×414 PNG while preserving alpha.
