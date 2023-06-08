# Changlelog

## 1.10.0

- Merge pull request #1 from kajecode/v10update
- refactor and update for v10

## 1.9.1

- Bump version

## 1.9.0

- package lock
- Merge pull request #35 from cogitocode/v9
- fix: template eraser works in v9
- remove getLayer calls

## 1.8.1

- Prepared readme for version 1.8.1
- Adjusted German wording
- Merge pull request #26 from Dada1981/master
- Fixed release script to include measurement HUD files
- Added german translation
- Update README.md
- Update README.md

## 1.8.0

- Updated README
- Made measurement HUD only appear when using touch
- Added setting for measurement HUD
- Implemented waypoint-based movement
- Fixed button position
- Tmp
- Added MeasurementHud

## 1.7.2

- Updated readme
- Fixed not being able to move tokens any more as a GM due to easy target

## 1.7.1

- Restricted targeting to the select tool

## 1.7.0

- Updated Readme
- Added setting to configure targeting behavior
- Added ability to target tokens by tapping them
- Added description of settings to readme

## 1.6.0

- Updated readme
- Added tool to erase drawing

## 1.5.1

- Updated readme
- Updated readme
- Moved enlarge button feature from the wall tools menu to a module setting
- Stopped players from rotating their token while the game is paused

## 1.5.0

- Updated README.md
- Updated README.md
- Added directional arrows to TokenHUD
- Updated compatible core version to 0.8.6
- Updated dependencies, fixed language files being missing from distributable

## 1.4.0

- Updated README
- Added snap to grid toggle

## 1.3.1

- Updated README
- Made it possible to use split zooming if LockView restricts zoom or pan when 2 fingers is selected

## 1.3.0

- Adjusted README
- Adjusted README
- Fixed compatibility with LockView Module
- Added compatibility with LockView Module
- Removed hardcoded magic number in distance calculation, allowed 3 & 4 fingers for panning regardless of the mode
- Implemented split zooming & panning gestures

## 1.2.3

- Merge pull request #19 from sunspots/patch-1
- Ensure TouchEvent exists before using instanceof - fixes #16

## 1.2.2

- Fixed libWrapper shim
- Added libWrapper to add a layer of compatibility with other modules

## 1.2.1

- Updated compatible core version
- Added to readme

## 1.2.0

- Removed logs
- Refactored wall tools initialization
- Fixed window header handler
- Tmp
- Restored ability to forward touch events
- Brought back support for forwarding touch event
- Fixed canvas touch controls, window header controls still broken
- Attempted to fix window moving
- Cleaned up wall and pen support MR
- Merge pull request #7 from tcflanag/wall_and_pen_support
- Move wall chaining to local var, so it's not sticky
- Finish restoring misnamed identifier vars
- Cleanup based on code review
- Fix right clicks, and cleanups
- Swap to pointer events to not break stylus support
- Add wall tool controls
- Updated donation URL
- Added donation link

## 1.1.1

- Fixed release CI script

## 1.1.0

- Amended README
- Added eraser tool to the measurement templates menu that can be used with touch. First tap the eraser tool, then tap the template you want to remove.

## 1.0.1

- Fixed long-touch to right-click not working reliably. Increased the size of token status effects to make them easier to hit with a finger.

## 1.0.0

- Fleshed out Readme

## 0.9.2

- Another big step in zooming behavior - now horizontal finger layouts work just as well as diagonal ones :)

## 0.9.1

- Improved simultaneous zooming and panning, eliminated bug that required an additional tap before one could move tokens

## 0.9.0

- Implemented moving windows with touch controls

## 0.8.1

- Fixed release script

## 0.8.0

- Implemented ability to right-click tokens
- Implemented pointer event forwarding. Left-clicking and dragging now works properly.

## 0.7.3

- Added zip targets explicitly

## 0.7.2

- Fixed automation step

## 0.7.1

## 0.7.0

- Created release automation step
- Zooming works. Almost.
- Zooming works. Barely.
