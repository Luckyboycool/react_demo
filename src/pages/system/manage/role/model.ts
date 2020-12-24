export default {
  namespace: 'system_role',
  state: {
    roleModalVisible: false,
  },
  reducers: {
    roleModalVisible(state: any, action: { type: string; payload: any }) {
      return { ...state, roleModalVisible: action.payload };
    },
  },
};

export interface Role {
  id?: string;
  roleName?: string;
  roleKey?: string;
  sortNo?: number;
  status?: '0' | '1';
  createTm?: string;
  resourceIds?: any[] | null;
  resources?: any[] | null;
}
