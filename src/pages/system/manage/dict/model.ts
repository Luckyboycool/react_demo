export default {
  namespace: 'system_dict',
  state: {
    dictModalVisible: false,
    dictTableVisible: false,
    dataModalVisible: false,
  },
  reducers: {
    dictModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, dictModalVisible: action.payload };
    },
    dictTableVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, dictTableVisible: action.payload };
    },
    dataModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, dataModalVisible: action.payload };
    },
  },
};

export interface Dict {
  id?: string;
  dictType?: string;
}
export interface DictData {
  id?: string;
}
