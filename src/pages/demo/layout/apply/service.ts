import { post, put } from '@/utils/request';

export const fetchImageMax = (data: any) => post(`cp/data-query/get/enlarge-picture`, data);

export const addToDB = (data: any) => put('cp/analysis-group/add-to-db', data);

export const fetchPictureCp = (
  { groupId, pageNo, pageSize }: { groupId: string | number; pageNo: number; pageSize: number },
  data: any,
) => post(`cp/analysis-group/page/${groupId}/${pageNo}/${pageSize}`, data);
