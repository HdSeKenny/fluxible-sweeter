# express-dustjs

A [Dustjs] middleware for [Express](http://expressjs.com/).

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Travis CI][travis-image]][travis-url] [![Coveralls][codecov-image]][codecov-url]

# Installation

```
npm install express-dustjs
```

# Usage

```js
var express = require('express')
var app = express()
var path = require('path')

var dust = require('express-dustjs')

// Dustjs settings
dust._.optimizers.format = function (ctx, node) {
  return node
}

// Define custom Dustjs helper
dust._.helpers.demo = function (chk, ctx, bodies, params) {
  return chk.w('demo')
}

// Use Dustjs as Express view engine
app.engine('dust', dust.engine({
  // Use dustjs-helpers
  useHelpers: true
}))
app.set('view engine', 'dust')
app.set('views', path.resolve(__dirname, './views'))

app.get('/', function (req, res) {
  // Render template with locals
  res.render('index', {
    title: 'Hello world',
    name: 'Joe',
    sentence: 'The quick brown fox jumps over the lazy dog',
    number: req.query.number || 0
  })
})
```

# API

## `_`

A reference of [Dustjs] instance. You can use it to change Dustjs settings or define helper / filter.

```js
dust._.helpers.demo = demo
```

## `bind()`

By default, `express-dustjs` will use [dustjs-linkedin] (^2.5.1) to render template, if you want to use another version of `dustjs`, do like this:

```js
var dust = require('express-dustjs')
dust.bind(otherDust)
// Equals to
var dust = require('express-dustjs')(otherDust)
```

## `engine()`

Create a tempalte engine middleware for Express.

```js
app.engine('dust', dust.engine({
  useHelpers: true
}))
app.set('view engine', 'dust')
```

Options:

- `useHelpers`: if `true`, will load [`dustjs-helpers`] (^1.5.0).

# Compatibility

- Node `>= 0.10`
- Express `>= 4.10`.

# Contributors

Via [GitHub](https://github.com/chrisyip/express-dustjs/graphs/contributors)

[npm-url]: https://npmjs.org/package/express-dustjs
[npm-image]: http://img.shields.io/npm/v/express-dustjs.svg?style=flat-square
[daviddm-url]: https://david-dm.org/chrisyip/express-dustjs
[daviddm-image]: http://img.shields.io/david/chrisyip/express-dustjs.svg?style=flat-square
[travis-url]: https://travis-ci.org/chrisyip/express-dustjs
[travis-image]: http://img.shields.io/travis/chrisyip/express-dustjs.svg?style=flat-square
[codecov-url]: https://codecov.io/github/chrisyip/express-dustjs
[codecov-image]: https://img.shields.io/codecov/c/github/chrisyip/express-dustjs.svg?style=flat-square
[Dustjs]: http://linkedin.github.io/dustjs
[dustjs-linkedin]: http://linkedin.github.io/dustjs
[dustjs-helpers]: https://github.com/linkedin/dustjs-helpers
