import { get, del } from '@/utils/request';

// 操作日志列表
export const queryOperLogs = (query: any) => {
  const { current, pageSize, field, order, beginTime, endTime, operName, status } = query;
  return get(`/system/operLog/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_EQ_operName: operName,
    filter_EQ_status: status,
    filter_GE_operTime: beginTime || '',
    filter_LE_operTime: endTime || '',
  });
};

// 批量删除操作日志
export const deleteOperLogs = (ids: string[]) => del(`/system/operLog/delete/${ids.join(',')}`);
