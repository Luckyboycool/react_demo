export default {
  namespace: 'layout_apply',
  state: {
    uploadVisible: false,
  },
  effects: {},
  reducers: {
    uploadVisible(state: any, action: ReducerAction) {
      return { ...state, uploadVisible: action.payload };
    },
  },
};

interface ReducerAction {
  type: string;
  payload: any;
}
