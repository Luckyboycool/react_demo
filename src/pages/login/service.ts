import { get, post, put } from '@/utils/request';

/**
 * 登录
 */
export const login = (data = {}) => post('/auth/login', data);
/**
 * 登出
 */
export const logout = () => post('/auth/logout');
/**
 * 获取用户信息
 */
export const getUser = () => get('/system/user/get/info/SYSTEM');
/***
 * 修改用户密码
 */
export const updatePassword = (id: string, data = {}) => put(`/system/user/update/password/${id}`, data);
