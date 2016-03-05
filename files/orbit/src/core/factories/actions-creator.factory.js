import Logger from '../logger/logger';

function actionsCreator(actions) {
  let symbolActions = {};

  Logger.log({ message: '[ActionsCreator] Trying to create actions.', level: 'ALL' });

  for (let action in actions) {
  	Logger.log({ message: `[ActionsCreator] Creating action ${action}.`, level: 'ALL' });
    symbolActions[action] = Symbol(action);
  }

  return symbolActions;
}

export default actionsCreator;
