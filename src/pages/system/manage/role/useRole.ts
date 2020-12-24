import { useState } from 'react';
import { queryRoles, insertRole, updateRole, deleteRoles } from './service';
import { Role } from './model';

export default (): any => {
  const [roles, setRoles] = useState<Array<Role>>([]);
  const [total, setTotal] = useState<number>(0);

  const loadRoles = async (params: any) => {
    const { total, data }: any = await queryRoles(params);
    data.forEach((role: Role) => {
      role.resourceIds = role.resources ? role.resources.map(r => r.id) : [];
      role.resources = [];
    });
    setTotal(total);
    setRoles(data);
  };

  const addRole = async (role: Role) => {
    await insertRole(role);
  };

  const modRole = async (role: Role) => {
    await updateRole(role);
  };

  const delRoles = async (roleIds: string[]) => {
    await deleteRoles(roleIds);
  };

  return [roles, { total, loadRoles, addRole, modRole, delRoles }];
};
