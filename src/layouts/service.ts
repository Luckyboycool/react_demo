import { put } from '@/utils/request';
import { Password } from './component/account';

// 修改密码
export const updatePassword = (data: Password) =>
  put(`/system/user/update/password/${data.id}`, {
    newPwd: data.newPassword,
    oldPwd: data.oldPassword,
  });
