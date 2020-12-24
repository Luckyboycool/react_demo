import { get, post, del, put } from '@/utils/request';
import { Role } from './model';

// 角色列表
export const queryRoles = (query: any) => {
  const { current, pageSize, field, order, roleName, status } = query;
  return get(`/system/role/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_LK_roleName: roleName,
    filter_EQ_status: status,
  });
};

// 权限列表
export const queryPermissions = () => get('/system/resources/list');

// 添加角色
export const insertRole = (role: Role) => post('/system/role/insert', role);

// 批量删除用户
export const deleteRoles = (ids: string[]) => del(`/system/role/delete/${ids.join(',')}`);

// 修改用户
export const updateRole = (role: Role) => put(`/system/role/update/${role.id}`, role);
