import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SwiftCode',
  description: 'Project Documentation',
  base: process.env.NODE_ENV === 'production' ? '/swiftcode/' : '',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${process.env.NODE_ENV === 'production' ? '/swiftcode/logo.svg' : '/logo.svg'}`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: `${process.env.NODE_ENV === 'production' ? '/swiftcode/logo.png' : '/logo.png'}`
      }
    ],
    ['meta', { name: 'keywords', content: 'swagger, vue, template, automatic' }],
    ['meta', { name: 'author', content: 'Hazel Wei' }]
  ],

  themeConfig: {
    logo: '/logo.svg', // You might need to add a logo file
    siteTitle: 'SwiftCode',

    socialLinks: [{ icon: 'github', link: 'https://github.com/hongaah/swiftcode' }],

    search: {
      provider: 'local'
    }
  },

  // Internationalization (i18n)
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/swagger2interface' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Introduction',
              items: [{ text: 'Project Architecture', link: '/guide/architecture' }]
            },
            {
              text: 'Packages',
              items: [
                { text: 'API: Swagger to Interface', link: '/guide/swagger2interface' },
                { text: 'UI: Template to List Page', link: '/guide/template2list' },
                { text: 'Core: Shared Utilities', link: '/guide/utils' }
              ]
            },
            {
              text: 'MCP Server',
              collapsed: false,
              items: [
                { text: 'Introduction', link: '/guide/mcp/index' },
                { text: 'Getting Started', link: '/guide/mcp/getting-started' },
                { text: 'Tools Reference', link: '/guide/mcp/tools-reference' }
              ]
            }
          ]
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2024-present Hazel Wei'
        },
        editLink: {
          pattern: 'https://github.com/your-repo/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/swagger2interface' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '介绍',
              items: [{ text: '项目架构', link: '/zh/guide/architecture' }]
            },
            {
              text: '核心包',
              items: [
                { text: 'API: Swagger 转接口', link: '/zh/guide/swagger2interface' },
                { text: 'UI: 模板生成列表', link: '/zh/guide/template2list' },
                { text: '核心: 共享工具库', link: '/zh/guide/utils' }
              ]
            },
            {
              text: 'MCP 服务器',
              collapsed: false,
              items: [
                { text: '介绍', link: '/zh/guide/mcp/index' },
                { text: '快速入门', link: '/zh/guide/mcp/getting-started' },
                { text: '工具参考', link: '/zh/guide/mcp/tools-reference' }
              ]
            }
          ]
        },
        footer: {
          message: '基于 MIT 许可发布。',
          copyright: '版权所有 © 2024-至今 Hazel Wei'
        },
        editLink: {
          pattern: 'https://github.com/your-repo/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },
        outlineTitle: '本页目录',
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        }
      }
    }
  }
})
