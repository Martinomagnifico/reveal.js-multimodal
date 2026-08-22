<!-- .slide: data-modal-type="html" data-modal-url="#titlediv" -->

# Multimodal
For Reveal.js, using Markdown

> # Multimodal
For Reveal.js, using Markdown
<!-- .element: id="titlediv" class="mm-content"-->



---

## What can you use it for?

----

You can use it as a lighbox or actual modal to showcase images, video or HTML content. It can be triggered from text - or image links or automatically when a slide is shown.

----

* Use it to show [an image](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/1.jpg"--> in a window.
* Use it to show [a video](#)<!-- .element: data-modal-type="video" data-modal-url="assets/vid/radar.mp4"--> in a window.
* Use it to show [HTML content](#)<!-- .element: data-modal-type="html" data-modal-url="#somehiddendiv"--> in a window.


> ## Example of HTML content
This is just content that is normally hidden.
<!-- .element: id="somehiddendiv" class="mm-content"-->

---

## Modal behaviour


----

### Modal size
* Content in modals will display at its original size, but is constrained to the maximum size of the modal.
* The maximum size of modals is the size to the viewport, *minus the margin* as set in the Reveal config.
* The minimum size of HTML modals is 300x200 pixels. This can be set in the config.

----

### Triggers
A triggering element needs at least a `data-modal-type`.


* From [a data-modal-url](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/1.jpg"--> in an anchor tag.
* From [an href attribute](assets/img/2.jpg)<!-- .element: data-modal-type="image" --> in an anchor tag.


```md []
* From [a data-modal-url](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/1.jpg"--> in an anchor tag.
* From [an href attribute](assets/img/2.jpg)<!-- .element: data-modal-type="image" --> in an anchor tag.
```

----

### Navigation changes

* The `arrow keys` will close the modal *and* go to the next slide
* The `space bar` or `escape key` will only close the modal


[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/2.jpg"-->
<!-- .element: class="example"-->

Click the link above and then the `arrow keys`, `space bar` or `escape key`: the modal will be closed in all cases, but only arrow keys will navigate.
<!-- .element: class="small"-->

----
<!-- .slide: data-background="#260505" -->

### Override navigation
To prevent the user from accidentally navigating to another slide while the modal is open, you can add the `data-modal-navblock` attribute to the triggering element.

[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/3.jpg" data-modal-navblock="true"-->
<!-- .element: class="example"-->

Note that this blocks all keyboard navigation, but the `escape` key or any close buttons will still close the modal.
<!-- .element: class="small"-->

----
<!-- .slide: data-modal-type="image" data-modal-url="assets/img/4.jpg" -->

## Slide modals

To automatically open a modal when a slide is shown, add the `data-modal-type` and `data-modal-url` attributes to the section element.

```md []
----
<!-- .slide: data-modal-type="image" data-modal-url="assets/img/4.jpg" -->

## Slide modals
<!-- Slide content here -->
```

----

## Events
There are four events that may help you do things in your modals: `multimodal:show`, `multimodal:shown`, `multimodal:hide`, and `multimodal:hidden`. Details about the trigger are in `event.detail.trigger`. Use it like this:

```js []
deck.addEventListener("multimodal:shown", async (event) => {
  const triggerInfo = event.detail.trigger;
  console.log("Trigger type:", triggerInfo.dataset.modalType);
  console.log("Trigger URL:", triggerInfo.dataset.modalUrl);
});
```

A `.multimodal-open` class is also added to the `.reveal` element so that you can hook into this with CSS.
<!-- .element: class="small"-->

---

## Styling

----

The modal is styled with CSS variables, which are controlled through the Reveal.js options (see [Global options](#globaloptions)). Some of these options can also be set per trigger:

----
<!-- .slide: data-background="white" -->
### Overlay

Add a `data-modal-overlaycolor` attribute to the trigger to change the overlay color on a per-trigger basis.

[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/5.jpg" data-modal-overlaycolor="rgba(150, 50, 0, 0.5)"-->
<!-- .element: class="example"-->

```md []
[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/5.jpg" data-modal-overlaycolor="rgba(150, 50, 0, 0.5)"-->
```

----

### Setting background and padding

[![Graph](assets/img/svgexample.svg)](#)<!-- .element: data-modal-type="image" data-modal-background="gray" data-modal-padding="1em"-->
<!-- .element: class="example small"-->

```md []
[![Graph](assets/img/svgexample.svg)](#)<!-- .element: data-modal-type="image" data-modal-background="gray" data-modal-padding="1em"-->
```

The background color and padding can be set with the `data-modal-background` and `data-modal-padding` attributes. When using SVG's, this may come in handy. Both attributes can also be globally set in the options.
<!-- .element: class="small"-->



---

## Image modals

----

### Image modal from a text link

[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/2.jpg"-->
<!-- .element: class="example"-->

```md []
[Show modal](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/2.jpg"-->
```

As shown before, the `href` attribute can also be used.
<!-- .element: class="small"-->

----

### Image modal from a clickable image
Both data-attribute and href attribute methods are shown.
<!-- .element: class="small"-->

[![Some glasses](assets/img/3-small.jpg)](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/3.jpg"-->
[![Leaves](assets/img/4-small.jpg)](assets/img/4.jpg)<!-- .element: data-modal-type="image"-->
<!-- .element: class="example"-->

```md []
[![Some glasses](assets/img/3-small.jpg)](#)<!-- .element: data-modal-type="image" data-modal-url="assets/img/3.jpg"-->
[![Leaves](assets/img/4-small.jpg)](assets/img/4.jpg)<!-- .element: data-modal-type="image"-->
```

In this example, a small image is linked to a (different) large image in the modal. 
<!-- .element: class="small"-->


----

### Image modal from a clickable image, with the same image used

[![Mountain](assets/img/5.jpg)](#)<!-- .element: data-modal-type="image"-->
<!-- .element: class="example small"-->

```md []
[![Mountain](assets/img/5.jpg)](#)<!-- .element: data-modal-type="image"-->
```

When a `data-modal-url` attribute is not added, and the link has an image as direct child of it, then that image will be used for the modal. This example limits the size of the image inside the outlined box.
<!-- .element: class="small"-->


---

## Video modals

----

### Video modal from a text link

[Show video](#)<!-- .element: data-modal-type="video" data-modal-url="assets/vid/abstract.mp4"-->
<!-- .element: class="example"-->

```md []
[Show video](#)<!-- .element: data-modal-type="video" data-modal-url="assets/vid/abstract.mp4"-->
```

Video modals will play when opened, close when finished, and finish when closed. Set this with `videoautoplay` and `videoautohide` settings in the options.
<!-- .element: class="small"-->


---

## HTML modals

----

### HTML modal from a local ID

[Link to an ID](#)<!-- .element: data-modal-type="html" data-modal-url="#somehiddendiv"-->
<!-- .element: class="example"-->

```md []
[Link to an ID](#)<!-- .element: data-modal-type="html" data-modal-url="#somehiddendiv"-->

> ## Example of HTML content
This is just content that is normally hidden.
<!-- .element: id="somehiddendiv" class="mm-content"-->
```

Long content [like this](#)<!-- .element: data-modal-type="html" data-modal-url="#longhiddendiv"--> will be scrollable in the modal.

<div>

## Example of HTML content
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis pretium cursus. Sed vel tincidunt dui. Aenean accumsan eget lectus eget aliquam. Vivamus risus neque, finibus at ex at, lobortis dignissim sem. Nunc euismod euismod justo, eget condimentum urna efficitur eleifend. Quisque ornare velit ac lectus mollis eleifend. Quisque faucibus id velit at eleifend. Sed sed nunc dui. Nullam eget tempor dolor.

Etiam tortor erat, fringilla ut sem vitae, interdum euismod dolor. Phasellus pellentesque at augue et pellentesque. Etiam non commodo ex, quis egestas risus. Cras ornare molestie lacus, ac gravida justo suscipit vel. Etiam consectetur est tortor, eu ornare augue tempus a. Mauris venenatis dapibus magna sit amet gravida. Pellentesque interdum nibh vel arcu tristique condimentum. Maecenas tincidunt sem eget dui posuere commodo.

Phasellus eu risus lacinia, imperdiet felis vel, condimentum est. Fusce tristique nisi lacus, non placerat turpis scelerisque id. Etiam massa urna, venenatis ac lacus sit amet, faucibus vestibulum metus. Nulla facilisi. Vestibulum porttitor varius dapibus. In sit amet justo condimentum, lacinia sapien non, lacinia odio. Nullam sollicitudin sapien eget turpis condimentum, nec aliquet sem venenatis. Sed efficitur risus quis neque fringilla, at fringilla purus varius.

</div>
<!-- .element: id="longhiddendiv" class="mm-content"-->

----

### HTML modal from an HTML file
The HTML content will use local styles
<!-- .element: class="small"-->

[Link to an HTML file](#)<!-- .element: data-modal-type="html" data-modal-url="external/externalhtml.html"-->
<!-- .element: class="example"-->

```md []
[Link to an HTML file](#)<!-- .element: data-modal-type="html" data-modal-url="external/externalhtml.html"-->
```

----

### HTML modal from a Markdown file
The HTML content will use local styles
<!-- .element: class="small"-->

[Link to a Markdown file](#)<!-- .element: data-modal-type="html" data-modal-url="external/externalmd.md"-->
<!-- .element: class="example"-->

```md []
[Link to a Markdown file](#)<!-- .element: data-modal-type="html" data-modal-url="external/externalmd.md"-->
```

Markdown is converted to HTML with marked. It does not support Reveal.js' element attributes.
<!-- .element: class="small"-->

----

### Modal from an iframe
Both data-attribute and href attribute methods are shown.

[Link to an external website](#)<!-- .element: data-modal-type="iframe" data-modal-url="https://www.wikipedia.org"-->
[Link to a Youtube video](https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1)<!-- .element: data-modal-type="iframe"-->
<!-- .element: class="example"-->

```md []
[Link to an external website](#)<!-- .element: data-modal-type="iframe" data-modal-url="https://www.wikipedia.org"-->
[Link to a Youtube video](https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1)<!-- .element: data-modal-type="iframe"-->
```

---
<!-- .slide: id="globaloptions" -->
## Global options
See the [regular HTML demo](demo.html#/globaloptions) for the global options.