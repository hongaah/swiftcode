```js
types: ['number', 'integer', 'string', 'array', undefined, 'boolean', 'object']

/** $ref 传一个 model */
"properties": {
  "apps": {
    "type": "array",
    "description": "授权的应用",
    "allowEmptyValue": false,
    "items": {
      "$ref": "#/definitions/AppDTO"
    }
  }
}
// 等价于
"apps": [
  {
    "appId": "string",
    "appName": "string"
  }
]


/** 字符串数组 */
"resourceCodeList": {
  "type": "array",
  "description": "用户拥有的资源Code列表",
  "allowEmptyValue": false,
  "items": {
    "type": "string"
  }
},
// 等价于
"resourceCodeList": [
  "string"
],


/** properties 直接来一个 $ref */
"properties": {
  "parentFile": {
    "$ref": "#/definitions/File"
  },
}


/** 'object'的为全局定义 */
"properties": {
  "code": {
    "type": "integer",
    "format": "int32",
    "example": "null",
    "allowEmptyValue": false
  },
  "data": {
    "type": "object",
    "example": "null",
    "allowEmptyValue": false
  },
  "message": {
    "type": "string",
    "example": "null",
    "allowEmptyValue": false
  },
  "success": {
    "type": "boolean",
    "example": false,
    "allowEmptyValue": false
  }
}
```