执行命令：
node json2JsFile.js; node api2DefinitionFile.js; node json2tsFile.js; node api2Files.js

- json 文件转 js 文件

```js
const API_PRE = {

}

const output = {
  ['tags.name']: {
    desc: 'tags.description'
  }
}
```

- tags -> 文件
- paths ->

type:
将类型转为 json，然后将类型通过插件转为 ts

```json
{
  "apps": [
    {
      "appId": "string",
      "appName": "string"
    }
  ],
  "individualization": "string",
  "isProjectTestFlag": false,
  "message": "string",
  "projectTestFlag": true,
  "resourceCodeList": ["string"],
  "result": "string",
  "userAccount": 0,
  "userName": "string"
}
```

```ts
export interface Result {
  apps: App[]
  individualization: string
  isProjectTestFlag: boolean
  message: string
  projectTestFlag: boolean
  resourceCodeList: string[]
  result: string
  userAccount: number
  userName: string
}

export interface App {
  appId: string
  appName: string
}
```