
Inspired by [gulp-compile-handlebars](https://www.npmjs.com/package/gulp-compile-handlebars) and the Handlebars templates from [OOCSS](https://github.com/stubbornella/oocss/tree/master/oocss)


### Install
`npm install --save-dev gulp-prototype-handlebars`


### gulpfile.js
```
var gulp = require('gulp');
var handlebars = require('gulp-prototype-handlebars');

gulp.task('handlebars', function () {

  var options = {
    partials: ['./src/partials']
  };

  return gulp.src('src/p-home.json')
  .pipe(handlebars(options))
  .pipe(gulp.dest('dist/'));
});
```


### src/p-home.json
```
{
    "template" : "src/p-home.hbs",
    "data" :  {
        //Billboard
        billboardHeader: "Important Header",
        billboardText: "Billboard Description",

        //Button
        btnType: "button",
        btnClass: "btn-default",
        btnText: "Click Me"
    }
}
```


### src/partials/button.hbs (from [OOCSS Button Object](https://github.com/stubbornella/oocss/blob/master/oocss/src/components/button/button.handlebars))
```
{{#compare btnType "==" "button"}}
  <button class="btn {{btnClass}}" {{#if disabled}}disabled="disabled"{{/if}}>{{btnText}}</button>
{{/compare}}

{{#compare btnType "==" "link"}}
  <a href="/" class="btn {{btnClass}}">{{btnText}}</a>
{{/compare}}

{{#compare btnType "==" "btnLink"}}
  <a href="/" class="{{btnClass}}">{{btnText}}</a>
{{/compare}}
```


### src/p-home.hbs
```
<div class="billboard">
  <h3>{{billboardHeader}}</h3>
  <p>{{billboardText}}</p>
  {{> button btnType = this.btnType btnClass = this.btnClass btnText = this.btnText}}
</div>
```


### dist/p.home.html
```
<div class="billboard">
  <h3>Important Header</h3>
  <p>Billboard Description</p>
  <button class="btn btn-default">Click Me</button>
</div>
```


### Options
* **partials**: filepath to the partials (relative to gulpfile.js)


### handlebars.Handlebars
Access to the Handlebars library through `handlebars.Handlebars` property.

```
var handlebars = require('gulp-prototype-handlebars');
handlebars.Handlebars.registerHelper(...);
```

