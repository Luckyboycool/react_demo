import { get, post, del, put } from '@/utils/request';
import axios from 'axios';
import { Dict, DictData } from './model';

// 字典列表
export const queryDicts = (query: any) => {
  const { current, pageSize, field, order, dictName, dictType, status } = query;
  return get(`/system/dict/type/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_EQ_status: status,
    filter_LK_dictName: dictName,
    filter_LK_dictType: dictType,
  });
};

// 添加字典
export const insertDict = (dict: Dict) => post('/system/dict/type/insert', dict);

// 批量删除字典
export const deleteDicts = (ids: string[]) => del(`/system/dict/type/delete/${ids.join(',')}`);

// 修改字典
export const updateDict = (dict: Dict) => put(`/system/dict/type/update/${dict.id}`, dict);

// 字典数据列表
export const queryData = (query: any) => {
  const { current, pageSize, field, order, dictType } = query;
  return get(`/system/dict/data/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_EQ_dictType: dictType,
  });
};

// 添加字典数据
export const insertData = (data: DictData) => post('/system/dict/data/insert', data);

// 批量删除字典数据
export const deleteData = (ids: string[]) => del(`/system/dict/data/delete/${ids.join(',')}`);

// 修改字典数据
export const updateData = (data: DictData) => put(`/system/dict/data/update/${data.id}`, data);


export const queryUser = (query: any) => {
  const { pageNum, pageSize, id, sex, age, address, username, remark, createDate, updateData } = query;
  return axios.post('http://localhost:8080/user/query', query);
};
