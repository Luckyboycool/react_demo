import { get, post, del, put } from '@/utils/request';
import { Config } from './model';

// 配置列表
export const queryConfigs = (query: any) => {
  const { current, pageSize, field, order, configName, configKey, configType } = query;
  return get(`/system/config/page/${current}/${pageSize}`, {
    sortField: field,
    sortOrder: order === 'ascend' ? 'asc' : 'desc',
    filter_LK_configName: configName,
    filter_LK_configKey: configKey,
    filter_EQ_configType: configType,
  });
};

// appCode: "appCode"
// configKey: "configKey"
// configName: "configName"
// configType: "Y"
// configValue: "configValue"
// remark: "remark"
// 添加配置
export const insertConfig = (config: Config) => post('/system/config/insert', config);

// 批量删除配置
export const deleteConfigs = (ids: string[]) => del(`/system/config/delete/${ids.join(',')}`);

// 修改配置
export const updateConfig = (config: Config) => put(`/system/config/update/${config.id}`, config);
