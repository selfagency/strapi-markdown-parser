# Welcome to strapi-markdown-parser 👋

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: self_agency](https://img.shields.io/twitter/follow/self_agency.svg?style=social)](https://twitter.com/self_agency)

Strapi controller module to parse Markdown to HTML.

## Install

```sh
yarn add strapi-markdown-parser
```

## Use

Open your collection or single type's controller file (eg., `./api/{COLLECTION}/controllers/${COLLECTION}.js`), and add the following, substituting your collection or single type's name in the place of `{COLLECTION}`:

```javascript
const StrapiMarkdown = 'strapi-markdown-parser'
const model = require('../models/{COLLECTION}.settings.json')

const { md } = new StrapiMarkdown(model)

module.exports = {
  async find(ctx) {
    return md(await strapi.services.{COLLECTION}.find())
  },
  async findOne(ctx) {
    return md(await strapi.services.{COLLECTION}.findOne())
  }
}
```

### Full Parameters

StrapiMarkdown(`model`, `types`, `options`)

#### `model` (`Object`)

Your model's JSON settings file, eg. `./api/{collection}/models/{collection}.settings.json`.

#### `types` (`Object || Array`)

Either an object or array specifying the types in your collection's model to transform to HTML. If an array, all fields will be treated as standard markdown and therefore paragraphs will be wrapped in `<p>` tags. If an object, types specified under `standard` will be wrapped in `<p>` tags, an those specified `inline` will not.

**Defaults:**

```javascript
{
  standard: ['richtext'],
  inline: ['string']
}
```

#### `options` (`Object`)

Uses [Marked](https://marked.js.org/) as a parser and therefore options correspond to the [Marked API](https://marked.js.org/using_advanced#options).

**Defaults:**

```javascript
{
  smartypants: true,
  headerIds: false,
  breaks: true
}
```

### Known Issues

- Does not currently work on Strapi components, only top-level fields. Component support to come.

## Author

👤 **Daniel Sieradski <daniel@self.agency>**

- Website: https://self.agency
- Twitter: [@self_agency](https://twitter.com/self_agency)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/selfagency/strapi-markdown-parser/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
