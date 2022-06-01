import "@patternfly/react-core/dist/styles/base.css";

const NewHeader = ({ children }) => (
  <h1 style={{ color: "red" }}>TEST {children}</h1>
)

const NewCanvas = ({ children }) => (
  <div style={{ backgroundColor: "red" }}>{children}</div>
)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    components: { 
      h1: NewHeader,
      Canvas: NewCanvas
    },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}