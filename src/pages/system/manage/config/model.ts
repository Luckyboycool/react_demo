export default {
  namespace: 'system_config',
  state: {
    configModalVisible: false,
  },
  reducers: {
    configModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, configModalVisible: action.payload };
    },
  },
};

export interface Config {
  id?: string;
}
