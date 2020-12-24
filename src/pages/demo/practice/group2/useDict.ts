import { useState } from 'react';
import { queryDicts, insertDict, updateDict, deleteDicts } from './service';
import { Dict } from './model';

export default (): any => {
  const [dicts, setDicts] = useState([]);
  const [total, setTotal] = useState(0);

  const loadDicts = async (params: any) => {
    const { total, data }: any = await queryDicts(params);
    setTotal(total);
    setDicts(data);
  };

  const addDict = async (dict: Dict) => {
    await insertDict(dict);
  };

  const modDict = async (dict: Dict) => {
    await updateDict(dict);
  };

  const delDicts = async (dictIds: string[]) => {
    await deleteDicts(dictIds);
  };

  return [dicts, { total, loadDicts, addDict, modDict, delDicts }];
};
