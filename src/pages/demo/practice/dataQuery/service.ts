import { get, post } from '@/utils/request';

export const queryData = (query: any, data: any) => {
              const { current, pageSize } = query;
              // existsImg,
              //keywords, scanTimeBegin, scanTimeEnd,
              //    productIds: [], stepIds: [], lotIds: [],
              //       waferIds: [], targetField
              return post(`/adc/manual/classify/page/filter/params/${current}/${pageSize}`, data)
}