Gulp configuration for a Frontend UI worklow. This starter kit was intended to experiment  some "weird" tools together. 

## Overview
The idea behind is to separate the content, the logic and the template. The `content.json` file is generated dynamically by the `content task`. This is the result of the union between the partial files contained in the `partials folder`. Here you can split the content in many JSON files to store info such as menu items, sidebar links, paragraphs and so on.   
Those infos are rendered dynamically by the Template Engine `Nunjucks` with interpolation. The `views folder` contains the `_layout.njk` which is the base partial included in all pages (or wherever you want).   

## Gulp Config
There are two main tasks: one concerns the static files like libraries (bootstrap) or the content in the JSON files. Every time you rebuild the static resources you need to delete the content.json file first (gulp pre:statics) and then rebuild again the static resources (gulp statics).
Both JS and CSS are compiled with separated vendors file.

#### Dev
- gulp pre:statics
- gulp statics
- gulp

#### Prod
- NODE_ENV=prod gulp pre:statics
- NODE_ENV=prod gulp statics
- NODE_ENV=prod gulp   
  
Run `gulp pre:statics` to remove `content.json` file then recreate it with `gulp statics`. This operations is needed only when content in JSON changes or is added a vendor libraries.


## Folder Structure
```
sources
├── content
│   ├── partials/
│   └── content.json
├── sass
│   ├── base/
│   ├── layout/
│   ├── modules/
│   ├── utils/
│   └── main.scss
├── scripts
│   ├── ui/
│   ├── utils/
│   └── main.js
├── views
│   ├── content-panels/
│   ├── macros/
│   ├── partials/
│   ├── templates/
│   └── _layout.njk
└── gulpfile.js
```


