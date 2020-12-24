import { useState } from 'react';
import { getTreeData } from '@/utils/web';
import { Permission } from './model';
import { queryPermissions, insertPermission, updatePermission, deletePermission } from './service';

export default (): any => {
  const [permissions, setPermissions] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const loadPermissions = async (params: any) => {
    const list: any = await queryPermissions(params);
    // tableData
    const permissions = getTreeData(list, 'id');
    setPermissions(permissions);
    // treeData
    const treeData: any = [];
    buildtree(list, treeData, '000000');
    treeData.unshift({ key: '000000', value: '000000', title: '无' });
    setTreeData(treeData);

    function buildtree(list: any, treeData: any, parentId: string) {
      list.forEach((item: any) => {
        if (item.parentId === parentId) {
          const child = {
            key: item.id,
            value: item.id + '',
            title: item.resName,
            children: [],
          };
          buildtree(list, child.children, item.id);
          treeData.push(child);
        }
      });
    }
  };

  const addPermission = async (permission: Permission) => {
    await insertPermission(permission);
  };

  const modPermission = async (permission: Permission) => {
    await updatePermission(permission);
  };

  const delPermission = async (permissionId: string) => {
    await deletePermission(permissionId);
  };

  return [permissions, { treeData, loadPermissions, addPermission, modPermission, delPermission }];
};
