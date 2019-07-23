# :books: :video_game: Manabu

> A gamified e-learning platform

## Run this project

- Clone the repository & install it's dependencies using `yarn`
- Run it using `yarn run dev`

## Components & Breakpoints Sizes

Manabu uses [Grommet](https://github.com/grommet/grommet) basic UI theme settings such as Breakpoints for quick component creation.
Each component receives `responsiveSize` as a prop which indicates the actual view-port size.
This prop is handled by the actual page where the component is being rendered from in pages this value comes as `props.viewportSize`.
With this configuration you can not only manage the display behavior in each component, but also which components should render in that page.

### `responsiveSize`

responsiveSize can be used to modify component behavior around different view-port sizes.
The sizes can be: `'small'`,`'medium'` or `'large'`. If needed, more breakpoints can be added to the `customTheme` helper under `global.breakpoints.[custom size]` and `global.deviceBreakpoints.[device name]`.  
Please note that **both properties are required in `customTheme`**

#### myComponent.jsx

```
myComponent.propTypes={
responsiveSize: PropTypes.string.isRequired,
...
};
```

#### page.js

```
page.propTypes={
viewportSize: PropTypes.string.isRequired,
...
};
```

## Want to contribute?

You can [open an issue](https://github.com/gonzarascon/Manabu/issues) with your questions or features proposals!
Contribution guides are on their way!
