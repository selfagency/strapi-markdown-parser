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
    if (types && (types.constructor === Object || Array.isArray(types))) {
      this.types = types
    }

    if (model) {
      this.model = this.model.attributes
    } else {
      throw new Error('StrapiMarkdown requires `model`')
    }

    this.marked = require('marked')
    this.marked.setOptions(options)
  }

  parse(data) {
    for (let key in this.model) {
      if (this.types.standard && this.types.standard.includes(this.model[key].type)) {
        const out = this.marked(data[key] || '')
        data[key] = out.length ? out : null
      } else if (this.types.inline && this.types.inline.includes(this.model[key].type)) {
        const out = this.marked.parseInline(data[key] || '')
        data[key] = out.length ? out : null
      }
    }

    return data
  }

  md(data) {
    if (Array.isArray(data)) {
      return data.map(obj => this.parse(obj))
    } else {
      return this.parse(data)
    }
  }
}

module.exports = StrapiMarkdown
