const getters = {
  loaded: state => state.app.loaded,
  origin: state => state.app.origin,
  force: state => state.app.force,
  tabTop: state => state.app.tabTop,
  tabInner: state => state.app.tabInner,
  tabData: state => state.app.tabData,
  selects: state => state.app.selects,
}

export default getters