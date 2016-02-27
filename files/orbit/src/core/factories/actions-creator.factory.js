function actionsCreator(actions) {
  let symbolActions = {};

  for (let action in actions) {
    symbolActions[action] = Symbol(action);
  }

  return symbolActions;
}

export default actionsCreator;
