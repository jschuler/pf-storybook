module.exports = {
  "stories": [
    "../react/**/*.stories.mdx",
    "../react/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react",
  features: {
    storyStoreV7: false, // true breaks mdx extraction
  },
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
      title: "Quick starts",
      // url: "https://storybook--628d3236ca8321003af9e284.chromatic.com",
      url: "https://quickstarts-docs.surge.sh",
      // url: "https://patternfly-quickstarts-jschuler.vercel.app",
      expanded: true // optional, true by default
    },
    'form-wizard': {
      title: "Form wizard",
      url: "https://form-wizard-docs.surge.sh",
      expanded: true
    }
  }
}