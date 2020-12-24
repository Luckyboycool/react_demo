// 分页配置
export const TABLE_PAGE_CONFIG = {
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30, 50],
  showTotal: (total: number) => `Total: ${total}`,
};

export const FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

export const BASE_FORM_LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const BASE_FORM_LAYOUT_SINGLE = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const BASE_FORM_LAYOUT_SINGLE_ALONG = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

export const PRESE_COLORS = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#DDDDDD',
  '#FFFFFF',
];

export const SYSTEM_TAB_TABLE_SCROLL = { y: 'calc(100vh - 40px - 8px - 30px - 8px - 30px - 30px - 28px)' };
