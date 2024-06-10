# Changelog

## [1.0.1] - 2024-06-10

### Changed
- Completed documentation
- Fixed minor issues with paddings
- Fixed type-error with events not being dispatched
- Changed `border` option into `bordercolor` and `borderwidth`
- Prepared for Quarto version

## [1.0.0] - 2024-06-05

### Changed
- Fixed Firefox issue with the modals having extra space
- Newer version of devDependency Pug

## [0.1.6] - 2024-04-19

### Changed
- Fix overflow issue


## [0.1.5] - 2024-04-19

### Changed
- Change gulp header function


## [0.1.4] - 2024-04-17

### Changed
- Rounded scalecorrection variables.

### Added
- Added more details in the events that are dispatched to the deck.


## [0.1.3] - 2024-04-16

### Changed
- Fix for 'bodyscrolllock'. Opening a locknav-link no longer breaks on iOS. However, when the lock is enabled on iOS, somehow scrolling back up is still possible. The functionality may be removed (for iOS) in the future.
- Fix for situation where a first slide is a modal slide. On iOS, that modal was also opened when the user was on another section.

### Added
- Added a scalecorrection option. This makes sure that the close button is not reduced in size when the modal is scaled down. The same is also set up for the border around the modal.


## [0.1.1] - 2024-04-08

### Changed
- Fix for iOS video


## [0.1.0] - 2024-04-08

### Changed
- First public GitHub version
- Dispatch events to deck


## [0.0.9] - 2024-04-08
### Added
- Modals can now also be opened by triggers that are added later to the DOM.

### Changed
- Some tweaks to variable names.


## [0.0.8] - 2024-04-05
- Beta version