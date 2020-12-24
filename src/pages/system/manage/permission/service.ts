import { get, post, del, put } from '@/utils/request';
import { Permission } from './model';

// 权限列表
export const queryPermissions = ({ field, order, resKey, resName, visible }: any) =>
  get(`/system/resources/list`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_LK_resKey: resKey,
    filter_LK_resName: resName,
    filter_EQ_visible: visible,
  });

// 添加权限
export const insertPermission = (permission: Permission) => post('/system/resources/insert', permission);

// 删除权限
export const deletePermission = (id: string) => del(`/system/resources/delete/${id}`);

// 修改权限
export const updatePermission = (permission: Permission) =>
  put(`/system/resources/update/${permission.id}`, permission);

// APP CODE
export const queryAppCode = () => get('/system/application/get/appCode');
