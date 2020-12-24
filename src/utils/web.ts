import moment from 'moment';
import { PRODUCT_MODULE_PAGE } from '@/utils/router';

const math = require('mathjs');

// 延时
export const delay = (timeout: number) => new Promise(reslove => setTimeout(reslove, timeout));

// 互换
export const reorder = (list: [], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// 字符串排序
export const sortBy = (key: number) => {
  return (a: string, b: string) => {
    const nameA = a[key].toUpperCase();
    const nameB = b[key].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
};

export const getTimeString = () => {
  return parseInt((Date.parse(`${new Date()}`) / 1000).toString().substr(4)).toString(32);
};

// permissions => routes
export const getPermissionRoutes = (permissions: string[]) => {
  const REACT_APP_NAME = (process.env.REACT_APP_NAME || '').toLowerCase();
  const routes: string[] = [];
  for (const s of permissions) {
    const perm: string[] = s.split(':');
    if (perm[0] === REACT_APP_NAME && perm[2] === 'view' && !routes.includes(perm[1])) {
      routes.push(perm[1]);
    }
  }
  return routes.map(r => `/${r}`);
};

// 打印当前时间(微秒)
export const printTime = (sign: string) => {
  console.log(sign, `${moment(new Date()).second()}-${moment(new Date()).millisecond()}`);
};

// 数学运算 精确相减
export const subtract = (a: any, b: any) => {
  return math.number(math.subtract(math.bignumber(a), math.bignumber(b)));
};

// 数学运算 精确相除
export const divide = (a: any, b: any) => {
  if (b === 0) return 0;
  return math.number(math.divide(math.bignumber(a), math.bignumber(b)));
};

// 转换成百分数 保留2位小数
export const toPercent = (point: number) => {
  let str = Number(point * 100).toFixed(2);
  str += '%';
  return str;
};

// COOKIE DOMAIN
export const getCookieDomain = () => {
  const host = window.location.host;
  if (host.indexOf(':') >= 0) return host.split(':')[0];
  const arr = host.split('.');
  if (arr.length > 2) arr.shift();
  return `.${arr.join('.')}`;
};

/**
 * 构造树型结构数据
 * @param {*} source 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function getTreeData(source: any[], id: string, parentId: any, children?: any, rootId?: string) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId = rootId || '000000';
  const cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
  return cloneData.filter((father: any) => {
    const branchArr = cloneData.filter((child: any) => father[id] === child[parentId]); // 返回每一项的子级数组
    branchArr.length > 0 ? (father[children] = branchArr) : delete father[children]; // 如果存在子级，则给父级添加一个children属性，并赋值
    return father[parentId] === rootId; // 返回第一层
  });
}

// adc config group
export const selectKeywordFilter = (input: string, option: any) => {
  const { children } = option.props;
  return children.toLowerCase ? children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
};

// 生成系统初始化的 tabs & activeKey
export const generateSystemTabs = (
  systemName: string,
  modulePage: string | undefined,
): { key: string; title: string; component: any } | null => {
  const product = PRODUCT_MODULE_PAGE.filter(p => p.key === systemName);
  const modules: any[] = product[0] ? product[0].modules : [];
  if (modules.length === 0) return null;
  let defaultTabPane = null;
  if (modulePage) {
    const [moduleKey, pageKey] = modulePage.split('_');
    const m: any = modules.filter(module => module.key === moduleKey)[0];
    if (m.component) {
      defaultTabPane = { ...m, key: `/${m.key}` };
    } else {
      const p: any = m.pages.filter((page: { key: string }) => page.key === pageKey)[0];
      defaultTabPane = { ...p, key: `/${m.key}/${p.key}` };
    }
  } else {
    const m = modules[0];
    if (m.component) {
      defaultTabPane = { ...m, key: `/${m.key}` };
    } else {
      const p = m.pages[0];
      defaultTabPane = { ...p, key: `/${m.key}/${p.key}` };
    }
  }
  return defaultTabPane;
};
