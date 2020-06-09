const svgr = require("@svgr/core");
require("@svgr/plugin-svgo");
require("@svgr/plugin-prettier");
require("@svgr/plugin-jsx");

function template({ template }, opts, { componentName, props, jsx, exports }) {
  const plugins = ["jsx"];
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`
    import { useIdentifier } from '~/lib/hooks'
    
    function ${componentName}({id, ...props}) {
      const identifier = useIdentifier(id)
      return ${jsx};
    }
    ${exports}
  `;
}

const StringToJSX = (domString, componentName = "Icon") => {
  return svgr.default.sync(
    domString,
    {
      template: template,
      replaceAttrValues: {
        ["#000"]: "currentColor",
      },
      svgProps: {
        id: "{identifier}",
      },
      icon: true,
      plugins: [
        "@svgr/plugin-svgo",
        "@svgr/plugin-jsx",
        "@svgr/plugin-prettier",
      ],
    },
    { componentName }
  );
};

module.exports = StringToJSX;
