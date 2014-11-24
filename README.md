Polymer Carousel
================

This is a polymer carousel element with demo.

This is a test of polymer technologies and gulp task runner.



How to build
------------

Install dependences:

```bash
$ npm install
$ bower install
```

Run gulp task:

```bash
$ gulp
```



How to visualize preview
------------------------

Use gulp to start development version (with livereload):

```bash
$ gulp serve
```


Or use gulp to previsualize build version:

```bash
$ gulp serve-dist
```



How to use the component
------------------------

Include distribution `carousel.html` (gulp buld) in your project.
Make sure that you are including also `polymer.html` and `webcomponents.jsp` (`bower install Polymer/polymer`).

Example of use:

```html
    <carousel-container aspect="4:3">
      <carousel-image src="https://i.chzbgr.com/maxW500/8359907840/hA0ADD8A8/"></carousel-image>
      <carousel-image src="https://i.chzbgr.com/maxW500/8383201024/h0C144AA6/"></carousel-image>
      <carousel-image src="http://media.giphy.com/media/GTxGoOO7Wwbn2/giphy.gif"></carousel-image>
      <carousel-next></carousel-next>
      <carousel-prev></carousel-prev>
      <carousel-index></carousel-index>
      <carousel-timer delay="5"></carousel-timer>
    </carousel-container>
```



How to publish at github
------------------------

```bash
$ gulp build
$ cd www
$ git init
$ git checkout -b gh-pages
$ git add -f $(find .)
$ git commit -m initial commit
$ git remote add github https://github.com/you/your-repo.git
$ git push -u github gh-pages
```

