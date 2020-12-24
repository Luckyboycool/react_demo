export default {
  namespace: 'system_permission',
  state: {
    permissionModalVisible: false,
  },
  reducers: {
    permissionModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, permissionModalVisible: action.payload };
    },
  },
};

export interface Permission {
  id?: string;
  resName?: string;
  resKey?: string;
  component?: string;
  sortNo?: string | number;
  resType?: 'M' | 'C' | 'F';
  visible?: '0' | '1';
  perms?: string;
}
