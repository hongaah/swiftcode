import { getInput, renderDefinitionFile, renderInterfaceFile } from './transformers/index'
import { removeDir } from '@quickcode/utils'

export type OptionsType = {
  type?: 'json' | 'url'
  source: string
  isDev?: boolean
  dir?: string
}

export type SwaggerDefinitionsStuctType = Record<
  string,
  {
    type: string
    properties: Record<
      string,
      {
        type?: string
        format?: string
        description?: string
        allowEmptyValue?: boolean
        items: Record<string, any>
        $ref?: string
      }
    >
    title: string
    description?: string
    required?: string[]
    definition?: Record<string, any>
  }

>

export type DefinitionsValueType = SwaggerDefinitionsStuctType[keyof SwaggerDefinitionsStuctType]

export type SwaggerStuctType = {
  swagger: string
  info: Record<string, any>
  host: string
  basePath: string
  tags: {
    name: string
    description: string
  }[]
  paths: Record<string, any>
  securityDefinitions: SwaggerDefinitionsStuctType
  definitions: Record<string, any>
}

async function Swagger2InterfaceOutput(options: OptionsType) {
  // json | url
  const { type = 'json', source, isDev = false, dir = 'dist' } = options || {}

  removeDir(dir)
  const api = await getInput({
    type,
    source,
  })
  const { definitionsContent: definitions, beforeTransformTs } = await renderDefinitionFile({
    target: api,
    dir,
    isDev,
  })
  // @ts-ignore
  await renderInterfaceFile({ target: api, definitions, beforeTransformTs, dir, isDev })

  setTimeout(() => {
    !isDev && removeDir('temp')
  }, 300)
}

// process.on('uncaughtException', function (err) {
//   console.log(`${err.message}`)
// })

// Swagger2InterfaceOutput({
//   type: 'url',
//   source: 'http://192.168.153.146:8080/erp/api.json?group=webapi',
//   isDev: true,
//   dir: 'dist',
// })

export { Swagger2InterfaceOutput }