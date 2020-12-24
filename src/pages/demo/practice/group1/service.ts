import { get, post, del, put } from '@/utils/request';

// 获取 group 列表
export const fetchGroups = (data: any) => {
  const { existsImg, keyword, productIds, stepIds, scanTimeBegin, scanTimeEnd, targetField } = data;
  return post('adc/manual/classify/page/filter/params/1/1000', {
    //adc/classify/type/list
    existsImg: data.existsImg,
    keyword: data.keyword,
    scanTimeBegin: data.keyword,
    productIds: data.productIds,
    stepIds: data.stepIds,
    scanTimeEnd: data.scanTimeEnd,
    targetField: data.targetField
  });
};