# RSI Front-end

## Installation

The RSI Front-end is build with [Gulp](http://gulpjs.com/). Gulp is a tool to automate repetitive tasks build with [node.js](http://nodejs.org).

To use Gulp you need to install node. If you use homebrew on OSX, run:

```bash
$ brew install node
```

Otherwise, you can download and install node from [here](http://nodejs.org/download/). At the time of writing Node version 4+ is needed, latest version is recommended.

Install Gulp globally using [npm](https://www.npmjs.com) (node package manager, it will be installed with node):

```bash
$ npm install -g gulp
```

After installing gulp:

```bash
$ cd path/to/project
$ npm install
```

This runs through all dependencies listed in `package.json` and downloads them to the `node_modules` folder (created automatically) in your project directory.

__Note:__ If you are using a version control system (like git) ignore the `node_modules` folder as the dependencies will be quite large.

## Where are the files?

When using a build system there is the concept of **source** and **destination**. This is reflected in the code by having two folders: `src` for source and `dest` for destination. The `src` folder contains the source files which will be processed by the build-system to create the content of the `dest` folder which, after the build process, will contain the production ready files.

- Sass: `src/sass`
- Compiled Css: `dist/css/main.css`
- Javascript: `src/javascript`
- Compiled Javascript: `dist/js/main.js`
- SVG Icons for sprite generation: `src/icons`
- Generated sprite styles: `src/sass/base/_sprite.scss`
- Generated SVG sprite: `dist/images/sprite.svg`
- Handlebars HTML templates & data: `src/html`
- Rendered HTML partials: `dist/raw-html`
- Favicons: `src/favicons`
- CSS & JS files for the preview: `src/preview`
- Fonts: `src/fonts`
- Build system files (gulp tasks): `gulp/tasks`
- Build system configuration: `gulp/config.js`



## `gulp` commands

Gulp allows to create arbitrary tasks that do whatever the author wants. This project has three major tasks/commands:

```bash
$ gulp
```

Will generate a dev version of the theme in the `dist` folder

```bash
$ gulp watch
```

Will run the default task once, start a server and watch for file changes.

```bash
$ gulp production
```

Will generate a production version into the `dist` folder by compressing JS, CSS & HTML. This is the folder that should go on the server.

The configuration of the build system is located in `gulp/config.js`

__Important:__ Every time you run one of the commands the `dist` folder will be deleted! Don't make any changes in that folder.

More information about gulp can be found here:

- http://gulpjs.com/
- https://github.com/gulpjs/gulp
- https://github.com/gulpjs/gulp/blob/master/docs/README.md

## HTML Templates

To create a modular HTML system HTML templates need to be reusable and composable. For this purpose all HTML templates in `src/html` are written using [handlebars.js](http://handlebarsjs.com/) and rendered to HTML using the gulp build system.

This might need to be changed, in an ideal case the templates should be written in the templating language used by the RSI backend to avoid double work.

All relevant HTML templates (components, widgets, sections, pages) are rendered as HTML fragments inside `dist/raw-html` to make the porting of templates to the templating language used by the RSI backend easier.

Nevertheless the use of [handlebars.js](http://handlebarsjs.com/) illustrates how templates can/should be composed in a modular HTML template system.

```handlebars
<div class="c-heroImg">
  {{> c-imgBadge class="c-imgBadge-topLft"}}

  <div class="c-heroImg_content">

    <p class="c-heroImg_label">
      {{> c-label class="c-label-alt"}}
    </p>

    <h1 class="c-heroImg_title">
      <a href="{{href}}" class="c-heroImg_titleLink">
        {{title}}
      </a>
    </h1>

    <p class="c-heroImg_desc">
      {{description}}
    </p>
  </div>

  <a class="c-heroImg_share" href="#">
    {{> c-icon icon="share" class="c-heroImg_shareIcon"}}
    <span class="c-heroImg_shareLabel">
      Share
    </span>
  </a>

  {{> c-imgActions class="c-imgActions-topRgt"}}
</div>
```


## Sass

[Sass](http://sass-lang.com/) is used as a style sheet preprocessor. Vendor prefixing happens automatically via [Autoprefixer](https://github.com/postcss/autoprefixer). Local third party CSS stylesheets (like normalize.css) that are referenced using an `@import` statement are automatically inlined into the final CSS file (see: `src/sass/thirdparty/_normalize.sass`).

Sass files usually have comments that indicate their purpose or explain the contained functionality, to get a better understanding of the codebase have a look at the source files.

__Note:__ To refer to components, widgets and sections as a whole the word _modules_ is used throughout the documentation.

### Structure

#### `lib` folder

Contains all Sass mixins and functions that are used in the project. Look into the source files for further information.

#### `base` folder

Contains all base styles: raw HTML elements, fonts, breakpoint helper, generated sprite styles.

#### `thirdparty` folder

Contains styles that come from third-parties. These styles can be imported (and automatically inlined, see intro of this section) or can be styles that are necessary to power some thirdparty Javascript plugin that requires CSS styles to work or whose generated markup can not be customized.

The important thing is to control what external styles are included in the CSS and make their removal easy if they are not needed any more.

#### `layout` folder

Contains the grid styles and all generic layout helper classes: `.container`, `.section`. These classes should be usable inside every widget, component or section (`.section` is an exception and will most likely only be used inside sections).

#### `components` folder

Contains small modules that can be used to composed larger modules (widgets, sections). All components are name-spaced with `.c-`

#### `widgets` folder

Contains larger or more complex modules that usually are composed of components + some additional styles. All widgets are name-spaced with `.wdg-`

#### `utility` folder

Contains single purpose helper classes that usually do only one thing. All utility classes are name-spaced with `.u-`. they usually follow this pattern:

```stylus
.u-<shortcode for css property>-<value for propperty>[@<breakpoint>]
```

Examples:

```stylus
.u-d-none // Hide element applying display: none
.u-d-ibl@sm // Apply display: inline-block and breakpoint "sm" and above.
```

Some of the most used helpers are dimensions-helpers, which are classes that add padding, margin and negative margin to elements:

```stylus
.u-push-top-half@sm // Margin top half a spacing unit at breakpoint "sm" and above
```

These classes should be used when there is a need to create variations in modules that are not general to the module but just for a specific implementation of the module, for example to space our elements inside sections. (Read more about the [`$space`](#the-space-variable) variable)

__Note:__ In the case of utility classes it is completely OK to use `!important` in a declaration, as the styles applied by utility classes should always _win_.

#### `theme` folder

Contains styles for one-off implementations (like sections for temporary events, special television cycles...). Styles for elements that deviate from the default styles and are not (likely) to be used again after a while, should go here and be deleted once they become irrelevant.

### What about section styles?

Section implementations do not have their own styles, they are composed. All sections created in HTML use the generic layout classes: `.section` (of course), `.container`, the grid and the utility classes to create their layout.

### What should be a widget, what should be a component?

The main criteria to consider a module, a widget or a component, is its reusability. If a component will always be used _as is_ and will never be nested inside a widget you might consider making it a widget itself. On the contrary if a widget will be nested inside other widgets it should probably be a component.

### CSS authoring rules

#### Only use Classes

When using IDs for styling, the styles by nature are not reusable. This should be avoided. Classes are the natural styling hooks in the HTML & CSS world so attribute selectors should also be avoided.

#### Avoid nesting of classes (whenever possible)

When using styles like this (real example):

```less
//--- In box-white ---/
.box-white {
  .c-title-widget {
    .title {
      a:hover {
        background: url('../img/sys/c-title-widget-title-arrow-hvr.png') right center no-repeat;
        color: @color-vector;
      }
    } //.title
  } //.c-title-widget
} //.box-white
```

Generated CSS:

```css
.box-white .c-title-widget .title a:hover {
  background: url('../img/sys/c-title-widget-title-arrow-hvr.png') right center no-repeat;
  color: #333;
}
```

Required HTML

```html
<div class="box-white">
  <div class="c-title-widget">
    <div class="title">
      <a href="#">Link</a>
    </div>
  </div>
</div>
```

The conditions that have to be _true_ to apply the style are very specific and easy to break. It makes developers fear removing a class or making any other changes (possibly improvements to the code) and induces a "I will just write this new and never re-factor the old" practice.

On the contrary:

```stylus
.c-titleWidget
  ...

.c-titleWidget_link
  ...

  &:hover
    ...
```

Required HTML

```html
<a href="#" class="c-titleWidget_link">Link</a>
```

Knowing that a class only depends on it's self gives the developer the confidence to change/delete any selectors surrounding it without the fear of breaking a complicated chain and therefore inducing visual regression.

### Module naming conventions

Module class names are (loosely) based on the [BEM](http://getbem.com/introduction/) naming convention. The concepts of BEM are very valuable to create a maintainable system. BEM introduces the notion of:

**B**lock **E**lement **M**odifier

Example:
```stylus
// Block (or parent)
.c-dropDown
  position: relative

// Element, separated by _
.c-dropDown_list
  position: absolute
  top: 0
  left: 0

// Modifier, separated by -
.c-dropDown_list-locale
  background: red

// Other element
.c-dropDown_item
  padding: 0.5em 0
```

HTML

```html
<div class="c-dropDown">
  <ul class="c-dropDown_list">
    <li class="c-dropDown_item">
      Some Text
    </li>
  </ul>

  <!-- This one is red -->
  <ul class="c-dropDown_list c-dropDown_list-locale">
    <li class="c-dropDown_item">
      Italiano
    </li>
    <li class="c-dropDown_item">
      Deutsch
    </li>
  </ul>
</div>
```

#### Why is this better?

**Elements are interchangeable:**

```html
<div class="c-dropDown">
  <ol class="c-dropDown_list"> <!-- Still works with ol -->
    <li class="c-dropDown_item">
      Some Text
    </li>
  </ol>
</div>
```

**It creates a parent-child relationship that can be spotted at a glance:**

```html
<!-- These belong together -->
<div class="c-dropDown">
  <ol class="c-dropDown_list">
    <li class="c-dropDown_item">

      <!-- And these belong together -->
      <span class="c-label">
        <i class="c-label_icon"></i>
      </span>

    </li>
  </ol>
</div>
```

**It has low specificity:**

```html
<div class="wdg-myWidget">
  <!-- Extending the dropdown component -->
  <div class="c-dropDown wdg-myWidget_dropdown">
    ...
  </div>
</div>
```

```stylus
.w-myWidget

.w-myWidget_dropdown
  // Extends .c-dropDown
  // these styles overwrite the component, no problem.
```

**Classes are easy to remove:**

```stylus
// Element
.c-dropDown_list
  position: absolute
  top: 0
  left: 0

// Remove these lines when not needed anymore
// Nothing else breaks. (Or at least is less likely to)
.c-dropDown_list-locale
  background: red
```

#### How do I create variations of a module? (or when is it OK to nest classes)

Often a module needs to have different variations/versions. As seen above usually this is done using a modifier class. There are to kinds of modifiers: 

- Block modifiers: `.c-badge-light`
- Element modifiers: `.c-badge_inner-large`

In both cases it is possible that one of he modifiers needs to affect its children. In the case of the RSI front-end in particular there are some modules that have a light version. In that case it is OK to nest classes:

```stylus
.c-badge
  ...

  // Light version
  &-light

.c-badge_inner
  ...

  // Light version
  .c-badge-light &
  ...
```

Try to keep this to a minimum. and to make the selector chains as short as possible, ideally only two selectors:

```css
/* Generated CSS */
.c-badge-light .c-badge_inner {
  ...
}
```

__When to use a block modifier and when a element modifier?__

When a modifier affects the whole module, e.g. it changes the color scheme of (potentially) all elements in the module, then a block modifier should be used.

```stylus
.c-badge
  background: $black

  // Light version
  &-light
    background: $white

.c-badge_inner
  color: $gray

  // Light version
  .c-badge-light &
    color: $black

.c-badge_title
  color: $primary

  // Light version
  .c-badge-light &
    color: $secondary
```

When a modifier affects only a specific element of the module, e.g. it changes the size of the title, then a element modifier should be used.

```stylus
.c-badge
  ...

.c-badge_title
  font-size: $fs-large

  // Small title variations
  &-small
    font-size: $fs-small
```

### Other concepts

#### The `rem` unit.

Spacing is set using the `rem` unit. Using a relative unit is good for accessibility as it allows users that are visually impaired to scale the page via their default browser settings. To make working with `rem` units more comfortable the font-size of the `html` element is set to `62.5%` which equals `10px`. This means that for example `1rem == 10px` or `2.2rem === 22px`.

#### `.js-` classes and state-classes

To select elements with Javascript only use classes with the prefix `.js-`. On the other hand never use a `.js-` class for styling.

This separation of concerns will enable developers to make changes to both CSS and Javascript with much more confidence and makes refactoring much easier.

Ideally `.js-` class names should follow a similar BEM-naming approach as explained [above](#module-naming-conventions).

Of course there are some dependencies between Javascript and CSS especially when classes are applied to DOM elements using Javascript. These classes are called _state-classes_ as usually they provoke a change in the _state_ of the UI.

State classes should start with a `.is-` or a `.has-` and should always be scoped to the CSS module they modify as they can be quite generic e.g. `.is-open`, `.is-hidden`:

```stylus
.c-badge
  // Disabled badge 
  &.is-disabled
  ...

// This can also be OK
.c-badge_inner
  // Disabled badge 
  .c-badge.is-disabled &
```

#### The `$space` variable

The `$space` variable equals the general line height of text. This allows to have a consistent measuring unit contained in a variable which will help to decide on the spacing of elements. Another big benefit is that it allows to "scale" the website spacing-styles (if used consistently) with the change of a single variable. This might not be something that will always be needed but it is a good thing to have.

Without `$space`:

```stylus
.wdg-myBlock
  // equals the line-height
  margin-bottom: 2.2rem

// Other file
.wdg-myOtherBlock
  // equals half of the line-height
  margin-bottom: 1.1rem
```

Now if the line-height was to change, two files would need to be modified to fulfill the change, with potentially tens of files, will not be very scalable and will be very error prone.

```stylus
.wdg-myBlock
  // equals the line-height
  margin-bottom: $space

// Other file
.wdg-myOtherBlock
  // equals half of the line-height
  margin-bottom: $space-half

// Other file
.c-label
  // This is also OK
  padding: $space + 0.1rem

// Inside vars
// Changes need to only be made here.
$space: 2.2rem
```

Sometimes after changing the value of `$space` some styles might need to be readjusted specially if `$space + 0.1rem` was used somewhere, but for the most part it will be fine and it is far better than changing hundreds of hard-coded values throughout the code base.

**When not to use `$space`**

Mainly `$space` should be used to create consistent spacing between elements. Some modules might need spacing "inside", especially if they are complex interactive UI pieces, that don't have much to do with the rest of the layout. Then using hard-coded values is OK.

#### Magic numbers

If hard-coded values, a.k.a. magic numbers are relevant for other modules in your system they should be stored in a variable e.g. `$header-height: 8rem`.

```stylus
// In _c-header
.c-header
  position: fixed
  height: $header-height

// In defaults
body
  padding-top: $header-height
```


## Image sprites

The RSI Front-end uses a SVG image sprite. The sprite is automatically created from a folder of single SVG icons `src/icons` in `dist/images/sprite.svg`. Accompanying the sprite the builder also creates a SCSS file that will properly size the icons when used in HTML, and places it in `src/sass/base/_sprite.scss` (This goes a bit against the concept of **source** <-> **destination** explained [here](#where-are-the-files-), but it is the only exception).

In addition to the icons there are some Sass helper mixins and functions in place to resize icons proportionally and to get their size without having to hard-code values. See: `src/sass/lib/mixins/_icons.sass` and `src/sass/lib/functions/_icons.sass`.

For each icon a `<symbol>` element is generated inside the sprite image and named after the icon file name.

To render a icon inside HTML use the following markup:

```html
<svg class="c-icon c-icon-<icon name>">
  <use xlink:href="images/sprite.svg#<icon name>"></use>
</svg>
```

The browser will follow the path in the `xlink:href` attribute, retrieve the `<symbol>` with the name given after the `#` and render it. This is almost equivalent to just putting the SVG code directly into the HTML but without increasing the size of the markup significantly and with the benefit that the sprite file will be cached by the browser.

The Icons can also be colored with Sass/CSS using `fill`, `stroke`, etc.

Read more about this SVG spriting technique [here](https://css-tricks.com/svg-sprites-use-better-icon-fonts/#article-header-id-6).

__Note:__ To make this work in IE a [Javascript plugin](https://github.com/jonathantneal/svg4everybody) is needed.

## Javascript

The Javascript is bundled using [Browserify](http://browserify.org/). Browserify is a tool that brings [node.js](https://nodejs.org) `require` statements to the browser.


Dependencies can be installed via the `[npm](https://www.npmjs.com/)` CLI and used via `require`:

```bash
$ npm install --save jquery
```

```js
var $ = require('jquery');
```

Local modules can be consumed the same way but using a relative path. For them to work they have to use `module.exports`.

```js
// File: modules/foo.js
module.exports = function() {
  console.log('foo')
}
```

```js
// Main file
var foo = require('./modules/foo')

foo();
```

To get a better understanding of how this works have a look at the source code.

More information:
- http://browserify.org/
- https://www.npmjs.com/
- https://docs.npmjs.com/cli/npm

## Using npm

This is just a note about `npm` and how to use it in this particular case. For in depth information see the links above.

All installed npm modules are tracked in the `package.json` file at the root of the project. When cloning the project for the first time run:

```bash
$ npm install
```

This will create a `node_modules` folder that contains all dependencies listed in `package.json` and their dependencies.

The package.json file, among other information, contains two attributes `devDependencies` and `dependencies`. The difference between them is:

- `devDependencies` is used to track dependencies that are needed for the build system, for example `gulp`.
- `dependencies` is used to keep track of dependencies that are needed in production for example `jQuery`.

To save either one use these commands

```bash
# Install dependency needed for development
npm install --save-dev gulp

# Install dependency needed for production
npm install --save jquery

# Install a specific dependency version needed for production
npm install --save jquery@2.1.1
```
