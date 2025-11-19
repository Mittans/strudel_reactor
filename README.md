# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
 
# Controls Overview (What each control does)
Transport Controls

## Preprocess
Runs the placeholder replacement system (e.g., <CPM>, <VOLUME>, <MASTER_VOLUME>, etc.) without playing.

## Proc & Play
Runs preprocessing and instantly evaluates the Strudel code.

## Mix & Tempo Controls

### Master Volume Slider
Replaces <MASTER_VOLUME> with the selected value.

### Volume Slider
Controls per-pattern gain and replaces <VOLUME> in the Strudel code.

### Cycles per Minute (CPM) Input
Sets Strudel’s tempo via <CPM>.

### Low Pass Filter (LPF) Slider
Replaces <LPF> with a cutoff frequency for filtering patterns.

### Reverb / Room Slider
Replaces <ROOM> to simulate more or less spatial effect.

## Instrument Toggles 

### Each instrument has ON/HUSH radio buttons:

ON - Inserts <P1_GAIN> = 1.0
ON - Inserts <P2_GAIN> = 1.0
ON - Inserts <P3_GAIN> = 1.0

HUSH - Inserts <P1_GAIN> = 0.0 (mutes that pattern)
HUSH - Inserts <P2_GAIN> = 0.0 (mutes that pattern)
HUSH - Inserts <P3_GAIN> = 0.0 (mutes that pattern)

Patterns respond immediately if playback is running.

### Bassline Selector

Replaces <BASSLINE> with either 0 (Bassline A) or 1 (Bassline B).
Used to branch between bass patterns inside the Strudel composition.

## Pattern Selector

Replaces <PATTERN> with 0 / 1 / 2, switching between Pattern A, Pattern B, or Pattern C.

## Preset Buttons

### Save Preset
Stores all UI values (sliders, selects, hush toggles) to localStorage.

### Load Preset
Restores saved values and automatically calls ProcAndPlay().

## D3 Live Gain Graph

A real-time SVG graph that listens to Strudel console output and displays the last approx. 80 gain values.
Updates every 300ms and visually reflects amplitude changes over time.

## Usage Notes & Quirks

Preprocess is required before playback
Proc & Play is recommended
Some controls only take effect if playback is active


