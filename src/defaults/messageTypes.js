import { getToKeys, getFromKeys } from './allowedChats'

const form = {
  "type": "object",
  "format": "grid",
  "required": [
    "from",
    "to",
    "title",
  ],
  "properties": {
    "from": {
      "type": "string",
      "enum": getFromKeys()
    },
    "to": {
      "type": "string",
      "enum": getToKeys()
    },
    "title": {
      "type": "string",
      "description": "Title for this message"
    }
  }
}

const properties = [
  {
    "scheme": "height",
    "title": "PersonHeight",
    "properties": {
      "height": {
        "type": "integer",
        "default": 12
      }
    }
  },
  {
    "scheme": "weight",
    "title": "PersonWeight",
    "properties": {
      "weight": {
        "type": "integer",
        "default": 12
      }
    }
  },
  {
    "scheme": "color",
    "title": "PersonColor",
    "properties": {
      "color": {
        "type": "string",
        "format": "color"
      }
    }
  },
  {
    "scheme": "name",
    "title": "PersonName",
    "properties": {
      "name": {
        "type": "string",
        "format": "string",
      }
    }
  }
]

const getMessageTypes = () => {
  return properties.map(prop => {
    return {
      ...form,
      scheme: prop.scheme,
      title: prop.title,
      properties: {
        ...form.properties,
        ...prop.properties
      },
      required: [
        ...form.required,
        prop.scheme
      ]
    }
  })
}

export default getMessageTypes
