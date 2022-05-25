module.exports = {
  "stories": [
    "../react/**/*.stories.mdx",
    "../react/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  refs: {
    'quickstarts': {
      title: "QuickStarts",
      url: "https://storybook--628d3236ca8321003af9e284.chromatic.com",
      expanded: true // optional, true by default
    }
  }
}