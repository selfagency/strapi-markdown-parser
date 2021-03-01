# Welcome to strapi-markdown-parser 👋

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: self_agency](https://img.shields.io/twitter/follow/self_agency.svg?style=social)](https://twitter.com/self_agency)

Strapi controller module to parse Markdown to HTML.

## Install

```sh
yarn add strapi-markdown-parser
```

## Use

Open your collection or single type's controller file (eg., `./api/{COLLECTION}/controllers/${COLLECTION}.js`), and add the following, substituting your collection or single type's name in the place of `{COLLECTION}`. You can specify field names directly, or use the `fieldsByType` helper utility to get the field names matching any specified datatypes. This module uses [Marked](https://marked.js.org/) as its parser, therefore options correspond to the [Marked API](https://marked.js.org/using_advanced#options).

```javascript
// Import parser, helper utility, and collection/component models
const { StrapiMarkdown, fieldsByType } = require('strapi-markdown-parser')
const model = require('../models/{COLLECTION}.settings.json')
const componentA = require('../../../components/{CATEGORY}/{COMPONENT}.json')
const componentB = require('../../../components/{CATEGORY}/{COMPONENT}.json')

// Standard fields are wrapped in <p> tags
const standardFields = ['body', 'summary']

// Inline fields are not wrapped in <p> tags
const inlineFields = ['title', 'photo.caption']

    // Get field names by type using helper utility
    const standardFields = fieldsByType(model, ['richtext'])
    const inlineFields = fieldsByType(model, ['string', 'text'])

    // Get field names by type, including components
    const standardFields = fieldsByType([model, componentA], ['richtext'])
    const inlineFields = fieldsByType([model, componentA, componentB], ['string', 'text'])

    // Special feature: Include captions from all Strapi file upload types
    const standardFields = ['caption', ...fieldsByType(model, ['richtext'])]
    const inlineFields = fieldsByType(model, ['string'])

// 3. Options for Marked Markdown parser (defaults shown)
const options = {
  smartypants: true,
  headerIds: false,
  breaks: true
}

// Instantiate class
const { md } = new StrapiMarkdown(standardFields, inlineFields, options)

// Modify response data
module.exports = {
  async find(ctx) {
    const data = await strapi.services.{COLLECTION}.find(ctx.query)

    return md(data)
  },
  async findOne(ctx) {
    const { id } = ctx.params
    const data = await strapi.services.{COLLECTION}.findOne({ id })

    return md(data)
  }
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/selfagency/strapi-markdown-parser/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
