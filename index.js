const defaults = {
  types: {
    standard: ['richtext'],
    inline: ['string']
  },
  options: {
    smartypants: true,
    headerIds: false,
    breaks: true
  }
}

class StrapiMarkdown {
  constructor(model, types = defaults.types, options = defaults.options) {
    if (model && model.attributes) {
      this.model = model.attributes
    } else {
      throw new Error('`model` must be valid model object')
    }

    if (types && types.standard && Array.isArray(types.standard) && types.inline && Array.isArray(types.inline)) {
      this.types = types
    } else {
      throw new Error('`types` must be object containing `standard` and `inline` arrays')
    }

    if (options && options.constructor === Object) {
      this.marked = require('marked')
      this.marked.setOptions(options)
    } else {
      throw new Error('`options` must be valid object')
    }
  }

  parse = async data => {
    const item = await data

    try {
      for (let key in this.model) {
        if (item[key]) {
          if (this.types.standard.includes(this.model[key].type)) {
            item[key] = this.marked(item[key])
          } else if (this.types.inline.includes(this.model[key].type)) {
            item[key] = this.marked.parseInline(item[key])
          }
        }
      }
      return item
    } catch (err) {
      console.error(err)
    }
  }

  md = data => {
    try {
      if (Array.isArray(data)) {
        const out = Promise.all(data.map(obj => this.parse(obj)))
        return out
      } else {
        const out = this.parse(data)
        return out
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = StrapiMarkdown
