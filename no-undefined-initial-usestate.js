module.exports = {
  rules: {
    "no-undefined-initial-usestate": {
      create(context) {
        return {
          CallExpression(node) {
            if (isHook(node.callee) && isCalledWithUndefined(node)) {
              context.report({
                node,
                message: "Do not initialise useState with undefined",
              });
            }
          },
        };
      },
    },
  },
};

function isCalledWithUndefined(node) {
  if (node.arguments.length === 0) return true;

  if (
    node.arguments[0].type === "Identifier" &&
    node.arguments[0].name === "undefined"
  ) {
    return true;
  }
}

function isHook(node) {
  if (node.type === "Identifier") {
    return node.name === "useState";
  }
  if (
    node.type === "MemberExpression" &&
    !node.computed &&
    isHook(node.property)
  ) {
    const obj = node.object;
    const isPascalCaseNameSpace = /^[A-Z].*/;
    return obj.type === "Identifier" && isPascalCaseNameSpace.test(obj.name);
  }
}
