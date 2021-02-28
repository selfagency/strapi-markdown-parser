class StrapiMarkdown {
  constructor(
    model,
    types = {
      standard: ['richtext'],
      inline: ['string']
    },
    options = {
      smartypants: true,
      headerIds: false,
      breaks: true
    }
  ) {
    if (types && types.constructor === Object) {
      this.types = types
    } else if (types && Array.isArray(types)) {
      this.types = { standard: types }
    } else {
      throw new Error('`types` must be object or array')
    }

    if (model && model.constructor === Object) {
      this.model = model.attributes
    } else {
      throw new Error('`model` must be object')
    }

    if (options && options.constructor === Object) {
      this.marked = require('marked')
      this.marked.setOptions(options)
    } else {
      throw new Error('`options` must be object')
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
