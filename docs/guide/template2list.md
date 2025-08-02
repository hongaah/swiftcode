# 📋 Template2List

This package is a powerful scaffolding tool that generates feature-rich list and table pages from a simple JavaScript template object. It's designed to dramatically speed up the development of admin panels and data-driven views.

## ✨ How It Works

::: info
1.  **Define a Template**: You create a `template.js` file to define the structure and behavior of your page (filters, columns, etc.).
2.  **Run the Command**: Use the `swiftcode gen-list` command, pointing it to your template file.
3.  **Generate Code**: The package reads your template and generates a complete Vue Single File Component (`.vue`).
:::

## 🚀 Usage

Using this package is a two-step process: first, create a template, then generate the page.

### 1. Get a Sample Template

To get started, you can generate a sample `template.js` file in your current directory.

```bash [Terminal]
swiftcode gen-list-template
```

::: tip Pro Tip
The generated `template.js` is the best documentation. It contains examples of all available options and data types you can use.
:::

### 2. Generate the List Page

Once you have customized your `template.js` file, run the generator.

```bash [Terminal]
# Generate from the default ./template.js
swiftcode gen-list

# Specify a path to a different template file
swiftcode gen-list ./src/templates/user-list.js
```
The generated files will be placed in the `.lists/` directory by default.

## ⚙️ Template File Structure

The `template.js` file exports a configuration object. Here is a breakdown of its main properties:

```javascript [template.js]
const defineListConfig = {
  // The output directory for the generated files.
  dir: '.lists',

  // An object containing definitions for one or more pages.
  pages: {
    // Each key is a page name.
    "UserList": {
      template: {
        cn: '用户列表', // Chinese name/title
        en: 'userList',  // English name, used for file names
        top: true,       // Include top action bar
        bottom: true,    // Include bottom pagination
        select: true,    // Enable row selection
        btn: ['Add', 'Delete'], // Buttons in the top action bar
      },
      // Defines the filter fields above the table.
      filter: {
        "Username": "input",
        "Status": "select",
        "CreationDate": "daterange",
      },
      // Defines the columns in the data table.
      table: {
        "Checkbox": "selection",
        "ID": "index",
        "Username": "text",
        "Email": "link",
        "LastLogin": "datetime",
        "Actions": {
          type: "operate",
          fixed: "right",
          render: ['Edit', 'Delete'],
        },
      },
    }
  },
};

export default defineListConfig;
```

::: warning Important
You can define multiple pages within the `pages` object. The tool will generate a file for each one, allowing you to scaffold an entire section of an admin panel with a single command.
:::
