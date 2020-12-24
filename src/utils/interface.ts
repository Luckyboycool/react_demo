import { Effect, Reducer } from 'umi';

export interface globalModelState {
  cardList?: Array<string | number>;
  loading: boolean;
  user: any;
  permissions: string[];
  tabs: any[];
  activeKey: string;
  shiftMultipleMode: false;
  config: any;
  enlargement: string | null;
}

export interface globalModelType {
  namespace: string;
  state: globalModelState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    save: Reducer<globalModelState>;
  };
}
