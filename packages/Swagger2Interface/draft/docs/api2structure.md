## 返回参数类型

```json
// 返回参数类型 1
"responses": {
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/UserServerResultVo"
    }
  }
}

// 返回参数类型 2
"responses": {
  "200": {
    "description": "successful operation",
    "schema": {
      "type": "string",
    },
  }
}
```

## 请求参数类型

```json
// 请求参数类型 1
"parameters": [
  {
    "name": "accessId",
    "in": "query",
    "description": "accessId",
    "required": false,
    "type": "string"
  }
],

// 请求参数类型 2
"parameters": [
  {
    "in": "body",
    "name": "request",
    "description": "request",
    "required": true,
    "schema": {
      "$ref": "#/definitions/SsoLoginRequest"
    }
  }
],

// 请求参数类型 3
"parameters": [
  {
    "in": "body",
    "name": "userDepartmentAccessIdList",
    "description": "userDepartmentAccessIdList",
    "required": true,
    "schema": {
      "type": "array",
    }
  }
],

// 请求参数类型 4
"parameters": [
  {
    "in": "body",
    "name": "userDepartmentAccessIdList",
    "description": "userDepartmentAccessIdList",
    "required": true,
    "schema": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
],

// 请求参数类型 5
"parameters": [
  {
    "in": "body",
    "name": "userDepartmentAccessIdList",
    "description": "userDepartmentAccessIdList",
    "required": true,
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/SsoLoginRequest"
      }
    }
  }
],

// 请求参数类型 6
"parameters": [
  {
    "name": "file",
    "in": "formData",
    "description": "file",
    "required": false,
    "type": "file"
  }
],

// int64 转 string
"UserDepartmentFeeInfoResponseVo": {
  "type": "object",
  "properties": {
    "createUserId": {
      "type": "integer",
      "format": "int64",
      "example": "null",
      "description": "创建人ID",
      "allowEmptyValue": false
    },
  }
}
```