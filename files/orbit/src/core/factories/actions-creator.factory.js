function actionsCreator(actions) {
  let symbolActions = {};

  for (let action in actions) {
    symbolActions[action] = Symbol(actions[action]);
  }

  return symbolActions;
}

export default actionsCreator;
