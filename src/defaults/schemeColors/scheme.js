class ColorScheme {

  constructor(id) {
    this.itemId = id
    this.items = {}
    this.itemDefault = {}
    this.global = {}
  }

  getGlobalScheme() {
    return this.global
  }

  getItemScheme() {
    return {
      ...this.itemDefault,
      ...(this.items[this.itemId] || {})
    }
  }

  getScheme() {
    return {
      item: this.getItemScheme(),
      global: this.getGlobalScheme(),
    }
  }
}

export default ColorScheme
