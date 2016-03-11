var SimpleExample = Orbit({
  title: 'Orbit',
  actions: {
    GET_TITLE: 'GET_TITLE'
  },
  [actions.GET_TITLE]: function(data) {
    return data + ' ' + this.title;
  }
}).createModule();
