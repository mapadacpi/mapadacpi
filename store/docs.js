export const state = () => ({
  dict: [],
  text: '',
  ocr: '',
})

export const mutations = {
  set_dict(state, data) {
    state.dict = data;
  },
  set_text(state, data) {
    state.text = data;
  },
  set_ocr(state, data) {
    state.ocr = data;
  },
}

export const actions = {
  async dict({commit}) {
    await this.$axios.get('/api/dict')
      .then((res) => {if (res.status === 200) {commit('set_dict', res.data) }})
  },
  async text({commit}, id) {
    await this.$axios.get('/api/text', {params: {id: id}})
      .then((res) => {if (res.status === 200) {commit('set_text', res.data) }})
  },
  async ocr({commit}, id) {
    await this.$axios.get('/api/ocr', {params: {id: id}})
      .then((res) => {if (res.status === 200) {commit('set_ocr', res.data) }})
  },
}
