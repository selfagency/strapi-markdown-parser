const { flatten, unflatten } = require('safe-flat')

const defaults = {
  options: {
    smartypants: true,
    headerIds: false,
    breaks: true
  }
}

class StrapiMarkdown {
  constructor(standardFields, inlineFields, options = defaults.options) {
    try {
      this.fields = {}
      this.fields.std = standardFields && Array.isArray(standardFields) ? standardFields : []
      this.fields.inline = inlineFields && Array.isArray(inlineFields) ? inlineFields : []

      if (!this.fields.std.length && !this.fields.inline.length) {
        throw new Error('StrapiMarkdown: No fields to parse')
      }

      if (options && options.constructor === Object) {
        this.marked = require('marked')
        this.marked.setOptions(options)
      } else {
        throw new Error('StrapiMarkdown: `options` must be valid object')
      }
    } catch (err) {
      console.error(err)
    }
  }

  parse = async data => {
    try {
      const item = flatten(await data)

      for (let key in item) {
        const repeatable = `${key.split('.')[0]}[i].${key.split('.')[2]}`

        if (item[key]) {
          if (
            this.fields.std.includes(key) ||
            this.fields.std.includes(repeatable) ||
            (this.fields.std.includes('caption') && key.endsWith('caption'))
          ) {
            item[key] = this.marked(item[key])
          } else if (
            this.fields.inline.includes(key) ||
            this.fields.inline.includes(repeatable) ||
            (this.fields.inline.includes('caption') && key.endsWith('caption'))
          ) {
            item[key] = this.marked.parseInline(item[key])
          }
        }
      }

      return unflatten(item)
    } catch (err) {
      console.error(err)
    }
  }

  md = data => {
    try {
      if (Array.isArray(data)) {
        return Promise.all(data.map(obj => this.parse(obj)))
      } else {
        return this.parse(data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

function fieldsByType(model, types) {
  if (!model || (model.constructor !== Object && !Array.isArray(model)))
    throw new Error('StrapiMarkdown: `model` must be object or array')
  if (!types || !Array.isArray(types)) throw new Error('StrapiMarkdown: `types` must be array')

  let fields = []

  if (!Array.isArray(model)) {
    model = model.attributes

    for (let key in model) {
      const current = model[key]
      const attrType = current.type

      if (types.includes(attrType)) {
        fields.push(key)
      }
    }
  } else {
    const components = model.slice(1, model.length)
    model = model[0].attributes

    for (let key in model) {
      const current = model[key]
      const attrType = current.type

      if (attrType === 'component') {
        const repeatable = current.repeatable
        let name = current.component
        let componentModel = components.filter(c => c.collectionName.includes(name.replace(/\./g, '_')))

        if (componentModel.length) {
          name = componentModel[0].collectionName.replace(`components_${name.replace(/\..+$/, '')}_`, '')
          componentModel = componentModel[0].attributes

          for (let componentKey in componentModel) {
            const componentAttrType = componentModel[componentKey].type

            if (types.includes(componentAttrType)) {
              fields.push(repeatable ? `${name}[i].${componentKey}` : `${name}.${componentKey}`)
            }
          }
        }
      } else if (types.includes(attrType)) {
        fields.push(key)
      }
    }
  }

  return fields
}

module.exports = { StrapiMarkdown, fieldsByType }
