# Multimodal

[![Version](https://img.shields.io/npm/v/reveal.js-multimodal)](#)
<!--[![Downloads](https://img.shields.io/npm/dt/reveal.js-multimodal)](https://github.com/martinomagnifico/reveal.js-multimodal/archive/refs/heads/master.zip)-->

A plugin for [Reveal.js](https://revealjs.com) to show content in modal windows.

[<img src="https://martinomagnifico.github.io/reveal.js-multimodal/screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-multimodal/demo/demo.html)

Multimodal can be used as a lightbox or actual modal to showcase images, video or HTML content from wihin a presentation. It can be triggered from text links, images, or buttons, or automatically when a slide is shown. 

* [Demo](https://martinomagnifico.github.io/reveal.js-multimodal/demo/demo.html)
* [Markdown demo](https://martinomagnifico.github.io/reveal.js-multimodal/demo/demo-markdown.html)



## Basics

There are really only three steps:

1. Install Multimodal
2. Add the multimodal data-attributes to your links
2. Enjoy the modals


## Installation

### Regular installation

Copy the multimodal folder to the plugins folder of the reveal.js folder, like this: `plugin/multimodal`.

### npm installation

This plugin is published to, and can be installed from, npm.

```console
npm install reveal.js-multimodal
```
The Multimodal plugin folder can then be referenced from `node_modules/reveal.js-multimodal/plugin/multimodal`



## Setup

### JavaScript

There are two JavaScript files for Multimodal, a regular one, `multimodal.js`, and a module one, `multimodal.esm.js`. You only need one of them:

#### Regular 
If you're not using ES modules, for example, to be able to run your presentation from the filesystem, you can add it like this:

```html
<script type="text/javascript" src="dist/reveal.js"></script>
<script src="plugin/multimodal/multimodal.js"></script>
<script>
	Reveal.initialize({
		// ...
		plugins: [ Multimodal ]
	});
</script>
```
#### As a module 
If you're using ES modules, you can add it like this:

```html
<script type="module">
	// This will need a server
	import Reveal from './dist/reveal.esm.js';
	import Multimodal from './plugin/multimodal/multimodal.esm.js';
	Reveal.initialize({
		// ...
		plugins: [ Multimodal ]
	});
</script>
```

### Styling
The styling of Multimodal is automatically inserted when the multimodal folder is manually copied to the Reveal.js plugin folder.

If you import reveal.js-multimodal from npm, you will need to import the CSS file yourself. Depending on your setup this can be something like this:

```
import 'reveal.js-multimodal/plugin/multimodal/multimodal.css';
```

Note that if you use 'import' like this, then in the `csspath` option (in the Reveal multimodal options) should be set to false. But if you know the actual full path to the CSS file, then you can still use the csspath option and keep cssautoload set to true.


### Markup

It is easy to set up your HTML structure for Multimodal. To show a modal, it needs to be triggered from a trigger. A trigger needs at least a `data-modal-type`. 

* From a `data-modal-url` in an anchor tag
* From an `href` attribute in an anchor tag
* From a `data-modal-url` in a button tag

```html
<a href="#" data-modal-type="image" data-modal-url="assets/img/1.jpg">a data-modal-url</a>
<a href="assets/img/2.jpg" data-modal-type="image">an href attribute</a>
<a href="#" data-modal-type="image" data-modal-url="assets/img/3.jpg">a data-modal-url</a>
```

For **Markdown** markup, check the Markdown demo above.

Of course, you also need to make sure that the content you are linking to (an image, a video, a piece of HTML) is there where you expect it.

#### Navigation changes

* The `arrow keys` will close modals *and* go to the next slide
* The `space bar` or `escape key` will only close the modal


#### Override navigation

To prevent the user from accidentally navigating to another slide while the modal is open, you can add the `data-modal-navblock` attribute to the triggering element.

```html
<a href="assets/img/3.jpg" data-modal-type="image" data-modal-navblock="true">Show modal</a>
```

#### Slide modals

To automatically open a modal when a slide is shown, add the `data-modal-type` and `data-modal-url` attributes to the section element.

```html
<section data-modal-type="image" data-modal-url="assets/img/4.jpg">
  <h2>Slide modals</h2>
  <!-- Slide content here -->
</section>
```

#### Events

There are 4 events that may help you do things in your modals: `multimodal:show`, `multimodal:shown`, `multimodal:hide`, and `multimodal:hidden`. Details are in `event.detail`. Use it like this:

```javascript
deck.addEventListener("multimodal:shown", async (event) => {
  const triggerInfo = event.detail.trigger;
  console.log("Trigger type:", triggerInfo.dataset.modalType);
});
```


## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
  // ...
  multimodal: {
    border: "1px solid white",
    background: {
      html: "var(--r-background-color)",
      iframe: "var(--r-background-color)",
      media: "white"
    },
    closebuttonhtml: '',
    cssautoload: true,
    csspath: '',
    htmlminwidth: "100px",
    htmlminheight: "100px",
    shadow: "0 0.5em 0.75em 0.5em rgba(0, 0, 0, 0.25)",
    overlaycolor: "rgba(0, 0, 0, 0.30)",
    padding: {
      html: "1em",
      iframe: "0",
      media: "0"
    },
    radius: "0.5em",
    scalecorrection: true,
    slidemodalevent: "slidetransitionend",
    speed: 300,
    videoautoplay: true,
    videocontrols: true,
    videoautohide: true,
    zoom: true,
    zoomfrom: 0.90
  },
  plugins: [ Multimodal ]
});
```

Documentation about these options can be found in the demo for now.





## Like it?
If you like it, please star this repo! 

And if you want to show off what you made with it, please do :-)


## License
MIT licensed

Copyright (C) 2024 Martijn De Jongh (Martino)