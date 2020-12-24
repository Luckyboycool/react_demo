import Cookies from 'js-cookie';
import { Effect, ImmerReducer, Subscription, history } from 'umi';
import { login, getUser, logout } from '@/pages/login/service';
import { getCookieDomain } from '@/utils/web';

interface ModelState {
  loading: number;
  user: { id: string; nickName?: string } | null;
  permissions: any[];
  tabs: any[];
  activeKey: string;
  shiftMultipleMode: boolean;
  config: any;
  enlargement: string | null;
  drawerVisible: boolean;
}

interface ModelType {
  namespace: string;
  state: ModelState;
  effects?: {
    getUser: Effect;
    onLogin: Effect;
    onLogout: Effect;
  };
  reducers?: {
    loading: ImmerReducer<ModelState>;
    user: ImmerReducer<ModelState>;
    tabs: ImmerReducer<ModelState>;
    addTabs: ImmerReducer<ModelState>;
    activeKey: ImmerReducer<ModelState>;
    shiftMultipleMode: ImmerReducer<ModelState>;
    config: ImmerReducer<ModelState>;
    enlargement: ImmerReducer<ModelState>;
    drawerVisible: ImmerReducer<ModelState>;
  };
  subscriptions?: { setup: Subscription };
}

const GlobalModel: ModelType = {
  namespace: 'global',
  state: {
    loading: 0,
    user: null,
    permissions: [],
    // user: {
    //   id: '9999',
    //   nickName: 'Admin'
    // },
    // permissions: ['adc:config:group', 'adc:classification:view', 'system:user:view'],
    tabs: [],
    activeKey: '',
    shiftMultipleMode: false,
    config: {
      PATH_ADMIN_WEB: 'http://admin.xiaozhazha.com',
      PATH_S3_BUCKET: 'http://161.189.56.38:7480',
      PATH_IMAGE_BUCKET: '/images-bucket/',
      PATH_ICON_BUCKET: '/webtools-bucket/tool-icon/',
    },
    enlargement: null,
    drawerVisible: false,
  },
  effects: {
    *getUser({ payload }, { call, put }) {
      const user = yield call(getUser);
      yield put({ type: 'user', payload: user });
    },
    *onLogin({ payload }, { call, put }) {
      const res = yield call(login, payload);
      Cookies.set('AI_YEI_TOKEN', res.token, {
        path: '/',
        domain: getCookieDomain(),
      });
      yield put({ type: 'getUser' });
    },
    *onLogout({ payload }, { call, put }) {
      const res = yield call(logout, payload);
      Cookies.remove('AI_YEI_TOKEN', {
        path: '/',
        domain: getCookieDomain(),
      });
      yield put({ type: 'user', payload: null });
      history.replace('/login');
    },
  },
  reducers: {
    loading(state, action) {
      let loading = state.loading;
      if (action.payload === 'CREATE') loading += 1;
      if (action.payload === 'REMOVE' && loading > 0) loading -= 1;
      return { ...state, loading };
    },
    user(state, action) {
      const user = action.payload;
      return { ...state, user, permissions: user ? user.buttons : [] };
    },
    tabs(state, action) {
      return { ...state, tabs: action.payload };
    },
    addTabs(state, action) {
      return { ...state, tabs: [...state.tabs, ...action.payload] };
    },
    activeKey(state, action) {
      return { ...state, activeKey: action.payload };
    },
    shiftMultipleMode(state, action) {
      return { ...state, shiftMultipleMode: action.payload };
    },
    config(state, action) {
      return { ...state, config: action.payload };
    },
    enlargement(state, action) {
      return { ...state, enlargement: action.payload };
    },
    drawerVisible(state, action) {
      return { ...state, drawerVisible: action.payload };
    },
  },
};

export default GlobalModel;
