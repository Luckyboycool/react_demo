import { get, post, del, put } from '@/utils/request';

// 获取 group 列表
export const fetchGroups = (data: any) => {
  const { order, current, field, pageSize, keywords } = data;
  return post('/adc/adc-group/find/list', {
    pageSize,
    keywords,
    pageNo: current,
    orderField: field,
    orderBy: order === 'ascend' ? 'asc' : 'desc',
  });
};