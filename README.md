# :books: :video_game: Manabu

> A gamified e-learning platform

## Coming soon

Manabu was thought as an open-source project from scratch. In the future you will be able to contribute to the platform.

## Components & Breakpoints Sizes

Manabu uses [Grommet](https://github.com/grommet/grommet) basic UI theme settings such as Breakpoints for quick component creation.
Each component receives `viewportSize` as a prop which indicates the actual view-port size.

### `viewportSize`

viewportSize can be used to modify component behavior around different view-port sizes.
The sizes can be: `'small'`,`'medium'` or `'large'`. If needed, more breakpoints can be added to the `customTheme` helper under `global.breakpoints.[custom size]` and `global.deviceBreakpoints.[device name]`.  
Please note that **both properties are required in `customTheme`**

```
myComponent.propTypes={
viewportSize: PropTypes.string.isRequired,
...
};
```

### Stay tuned!
