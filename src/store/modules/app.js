const app = {
  state: {
    loaded: false,
    origin: '',
    force: '',
    tabTop: '',
    tabInner: '',
    tabData: '',
    selects: ''
  },
  mutations: {
    SET_LOADED(state, loaded) {
      state.loaded = loaded;
    },
    SET_ORIGIN(state, origin) {
      state.origin = origin;
    },
    SET_FORCE(state, force) {
      state.force = force;
    },
    SET_TABTOP(state, tabTop) {
      state.tabTop = tabTop
    },
    SET_TABINNER(state, tabInner) {
      state.tabInner = tabInner
    },
    SET_TABDATA(state, tabData) {
      state.tabData = tabData
    },
    SET_SELECTS(state, selects) {
      state.selects = selects
    }
  },
  actions: {}
}
export default app