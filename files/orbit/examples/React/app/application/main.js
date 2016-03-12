var actions = {
  GET_TITLE: 'GET_TITLE'
};

var SimpleExample = Orbit({
  title: 'Orbit',
  actions: actions,
  [actions.GET_TITLE]: function(data) {
    return data + ' ' + this.title;
  }
}).createModule();
