import { useState } from 'react';
import { queryConfigs, insertConfig, updateConfig, deleteConfigs } from './service';
import { Config } from './model';

export default (): any => {
  const [configs, setConfigs] = useState([]);
  const [total, setTotal] = useState(0);

  const loadConfigs = async (params: any) => {
    const { total, data }: any = await queryConfigs(params);
    setTotal(total);
    setConfigs(data);
  };

  const addConfig = async (config: Config) => {
    await insertConfig(config);
  };

  const modConfig = async (config: Config) => {
    await updateConfig(config);
  };

  const delConfigs = async (configIds: string[]) => {
    await deleteConfigs(configIds);
  };

  return [configs, { total, loadConfigs, addConfig, modConfig, delConfigs }];
};
