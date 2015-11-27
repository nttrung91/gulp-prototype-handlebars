
Compile Handlebars into HTML

### Page Format in JSON

```
{
    "template" : "TEMPLATE_NAME",
    "data" :  {TEMPLATE_DATA}
}
```


### examples

### homepage.json
```
{
    "template" : "homepage.hbs",
    "data" :  {
        "bannerHeader" : "Welcome to our site",
        "bannerBodyText" : "This is banner body"
    }
}
```


### homepage.hbs
```
<div class="banner">
  <h3>{{bannerHeader}}</h3>
  <p>{{bannerBodyText}}</p>
</div>
```

Run this gulp task to generate

### homepage.html
```
<div class="banner">
  <h3>Welcome to our site</h3>
  <p>This is banner body</p>
</div>
```

