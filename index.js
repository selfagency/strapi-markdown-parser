class StrapiMarkdown {
  constructor(model, types, options) {
    if (types.constructor === Object) {
      this.types.standard = types.standard
      this.types.inline = types.inline
    } else if (Array.isArray(types)) {
      this.types.standard = types
    } else {
      this.types.standard = ['richtext']
      this.types.inline = ['string', 'text']
    }

    this.marked = require('marked')

    options.markdown
      ? this.marked.setOptions(options.marked)
      : this.marked.setOptions({
          smartypants: true,
          headerIds: false,
          breaks: true
        })
  }

  parse(data) {
    for (let key in this.model) {
      let out

      if (this.types.standard.includes(this.model[key].type)) {
        out = this.marked(data[key] || '')
        data[key] = out.length ? out : null
      } else if (this.types.inline.includes(this.model[key].type)) {
        out = this.marked.parseInline(data[key] || '')
        data[key] = out.length ? out : null
      }
    }

    return data
  }

  md(data) {
    model = model.attributes

    if (Array.isArray(data)) {
      return data.map(obj => this.parse(obj))
    } else {
      return this.parse(data)
    }
  }
}

module.exports = StrapiMarkdown
