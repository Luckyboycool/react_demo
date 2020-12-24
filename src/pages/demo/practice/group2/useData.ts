import { useState } from 'react';
import { queryData, insertData, updateData, deleteData } from './service';
import { delay } from '@/utils/web';
import { DictData } from './model';

export default (): any => {
  const [data, setDatas] = useState([]);
  const [total, setTotal] = useState(0);

  const loadData = async (params: any) => {
    const { total, data }: any = await queryData(params);
    setDatas([]);
    await delay(1);
    setTotal(total);
    setDatas(data);
  };

  const addData = async (data: DictData) => {
    await insertData(data);
  };

  const modData = async (data: DictData) => {
    await updateData(data);
  };

  const delData = async (dataIds: string[]) => {
    await deleteData(dataIds);
  };

  return [data, { total, loadData, addData, modData, delData }];
};
