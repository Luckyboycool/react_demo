export default {
  namespace: 'system_operation',
  state: {
    operationModalVisible: false,
  },
  reducers: {
    operationModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, operationModalVisible: action.payload };
    },
  },
};

export interface Operation {
  id?: string;
  title?: string;
  operName?: string;
  operIp?: string;
  operLocation?: string;
  status?: 0 | 1;
  operTime?: string;
  requestMethod?: string;
  operUrl?: string;
  operatorType?: 1 | 0;
  method?: string;
  operParam?: string;
}
