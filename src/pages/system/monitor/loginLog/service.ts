import { get, post, del, put } from '@/utils/request';

// 操作日志列表
export const queryLoginLogs = (query: any) => {
  const { current, pageSize, field, order, beginTime, endTime, ipAddr, status } = query;
  return get(`/system/loginInfo/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_EQ_ipAddr: ipAddr,
    filter_EQ_status: status,
    filter_GE_loginTime: beginTime || '',
    filter_LE_loginTime: endTime || '',
  });
};

// 批量删除操作日志
export const deleteLoginLogs = (ids: string[]) => del(`/system/loginInfo/delete/${ids.join(',')}`);
