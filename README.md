
This is a lightweight template and boilerplate for a responsive single page app that uses both React and PostCSS.

It comes ready to go with base styling and example code.

**[DEMO](https://jameswestwood.github.io/webpack-react-postcss-boilerplate/).**

## Bespoke implementations of this boilerplate.

If you are looking for a bespoke design and/or functionality drop me a line at [james@autotelic.io](mailto:james@autotelic.io).

## Running

Run development mode (local development server at localhost:8000)
```
npm run dev
```

Build for production
```
npm run build
```

## HTML

As the boilerplate is set up as a single page app there is only a single HTML template included - [main.ejs](/src/templates/main.ejs). Title, description, keywords etc are all controled via variables declared in [webpack.common.js](/webpack.common.js) through the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

## React

The boilerplate uses React router to create a single page app at higher screen resolutions, and a flattened version at small resolutions. The core of this functionality lives in [ui.jsx](/src/js/components/ui.jsx). This is where routes and their accompanying content, transitions between routes, and layout based on screen size is defined.

CSS relating to React components is kept in a separate file alongside the JSX file it relates to. These CSS files should be completely modular, if it's JSX component is removed then the CSS should also be able to be deleted without affecting anything else in the site.

## CSS

Bootstraps default theme is overridden in config.scss as per the recommendations at https://getbootstrap.com/docs/4.0/getting-started/theming/#variable-defaults . config.scss is imported into bootstrap.custom.scss, which in turn is imported by index.js. bootstrap.custom.scss is also the place where we import the components we need for the app, along side bootstraps default variables, functions, resets etc.

**SMACSS** (https://smacss.com/) methodology is followed throughout the CSS, most notably in regards to managing specificity. A few rules from SMACSS I would suggest adhering to :

- Only classes and pseudo-classes are used as selectors
- Selector depth is restricted to a single level where ever possible.
- Keep your component CSS completely modular. Add layout specific styling from a layout file. This ensures that your components can easily be reused throughout your app.

These rules are not immutable, but adhering to them will make your life a lot easier. There are specific cases however where breaking them does make sense.

Bespoke styling for components and scaffolding uses the **BEM methodology** (http://getbem.com/) as it's naming convention.

CSS is transformed via **PostCSS** (https://github.com/postcss/postcss). You can find a list of plugins being used in [postcss.config.js](postcss.config.js).

### Grid

Grid styles should be applied semantically via bootstraps [grid mixins](https://getbootstrap.com/docs/4.0/layout/grid/#mixins). This keeps our HTML clean and lean, and means layout changes are applied from one place, our CSS. This also helps to keep as much of our styling names adherant to BEM as possible, as our grid CSS is abstracted inside our custom classes.

## Tests
### Typescript / React

The testing methodology around react components follows the guide [here](https://medium.com/selleo/testing-react-components-best-practices-2f77ac302d12)


Testing is performed via Jest and the ts-jest

Setup followed this guide

- https://codeburst.io/webpack-typescript-react-part-4-14582e9a33ce

There are a couple of tweaks needed to test Typescript React code with jest around es6 import statements

- https://github.com/facebook/jest/issues/2081#issuecomment-332406033
- https://github.com/facebook/jest/issues/2081#issuecomment-306706600
- https://stackoverflow.com/a/34720573/863736


## Pattern library

React components are documented via [storybook](https://storybook.js.org). A storybook instance can be launched via :

```
npm run storybook
```

And will then be available at [here](http://localhost:9001)
