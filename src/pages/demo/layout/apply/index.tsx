import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import {
  Button,
  Input,
  Form,
  Col,
  Row,
  Select,
  Collapse,
  Upload,
  Radio,
  Checkbox,
  DatePicker,
  Table,
  Space,
  Modal,
  Divider,
  Switch,
  message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import Header from '@/components/header';
import UploadFile from '@/components/upload';
import PlanformIMG from '@/assets/images/planform.jpeg';
import { useMount } from '@umijs/hooks';
import { fetchImageMax } from './service';
import {
  StyleFunctional,
  StyleFilter,
  StyleContent,
  StyleToolbar,
  StyleBody,
  StyleSider,
  StyleMain,
} from '@/pages/demo/style';
import { BASE_FORM_LAYOUT, BASE_FORM_LAYOUT_SINGLE } from '@/utils/constant';
import DICT from '@/utils/dictionary';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const BaseForm = () => {
  const dispatch = useDispatch();

  const initFile: Array<any> = [];
  const [fileList, setFileList] = useState(initFile);

  const apply_config = useSelector((state: any) => state.layout_apply);
  const { uploadVisible } = apply_config;

  const applyForm = {
    applyCode: 'BC-20180212-01',
    applyTime: '2018-10-25',
    draftsman: 'Test01,(000001)',
    theme: '借阅-章维,Steven Zhang(100917)',
  };

  const [form] = Form.useForm();

  const showUploadModal = (value: any) => {
    dispatch({ type: 'layout_apply/uploadVisible', payload: true });
  };
  const closeUploadModal = (value: any) => {
    dispatch({ type: 'layout_apply/uploadVisible', payload: false });
  };

  const onFinish = (value: any) => {
    console.log('value', value);
  };

  const baseInfo = {
    name: 'N/A',
    name1: 'N/A',
    name2: 'N/A',
    name3: 'N/A',
  };
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  };
  const onChange = ({ file, fileList }: { file: any; fileList: any }) => {
    console.log(file, fileList);
    setFileList(fileList);
  };
  const dataSource: Array<any> = [
    {
      id: 1,
      type: '会计凭证册',
      code: 'SH01',
      year: '2018',
      num: '201803SH01BK19-01',
      info: '2018 SH01 会计凭证册19第1本',
      status: '已归档',
    },
    {
      id: 2,
      type: '会计凭证册',
      code: 'SH01',
      year: '2018',
      num: '201803SH01BK19-01',
      info: '2018 SH01 会计凭证册19第1本',
      status: '已归档',
    },
  ];
  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '公司代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '年度',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '会计档案号码',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '会计档案号描述',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <StyleContent>
      <Header title="档案借阅/复印申请" form={applyForm} />
      <StyleMain>
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header="基本信息/Basic Information" key="1">
            <Form
              {...BASE_FORM_LAYOUT}
              size="small"
              form={form}
              initialValues={{ name: '1111', checked: 'Apple' }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={12}>
                  <Form.Item label="申请人:">{baseInfo.name}</Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="部门:">{baseInfo.name1}</Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="类型:" name="type" rules={[{ required: true, message: 'type is required.' }]}>
                    <Select>
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="0">Available</Select.Option>
                      <Select.Option value="1">Forbidden</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    {...BASE_FORM_LAYOUT_SINGLE}
                    label="内容:"
                    name="content"
                    rules={[{ required: true, message: 'content is required.' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div>
              <Button style={{ float: 'right', marginBottom: 10 }} type="primary">
                选择会计文档
              </Button>
            </div>
            <Table bordered key="id" dataSource={dataSource} columns={columns} />
          </Panel>
          <Panel header="备注/Remark" key="2">
            <Form {...BASE_FORM_LAYOUT} size="small" form={form} initialValues={{ name: '1111', checked: 'Apple' }}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    {...BASE_FORM_LAYOUT_SINGLE}
                    label="备注:"
                    name="remake"
                    rules={[{ required: true, message: 'remake is required.' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item {...BASE_FORM_LAYOUT_SINGLE} label="附件:">
                    <span onClick={showUploadModal}>上传</span>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </StyleMain>
      {uploadVisible ? <UploadFile closeUploadModal={closeUploadModal} /> : null}
      {/* <Modal
        title="上传附件"
        visible={uploadVisible}
        onCancel={() => {
          dispatch({ type: 'layout_apply/uploadVisible', payload: false });
        }}
        footer={[]}
      >
        <div style={{ border: '1px solid #ccc', height: 150, marginBottom: 10 }}>
          <Upload
            beforeUpload={onBeforeunload}
            fileList={fileList}
            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
            onChange={onChange}
          ></Upload>
        </div>
        <Upload
          style={{ display: 'inline-block' }}
          showUploadList={false}
          beforeUpload={onBeforeunload}
          action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
        >
          <Button style={{ marginRight: 10 }} type="primary">
            浏览文件
          </Button>
        </Upload>
        <Button onClick={onStartUpload} style={{ marginRight: 10 }} type="primary">
          开始上传
        </Button>
        <Button style={{ marginRight: 10 }} type="primary">
          取消上传
        </Button>
        <Button onClick={() =>  dispatch({ type: 'layout_apply/uploadVisible', payload: false })}  style={{ marginRight: 10 }}>关闭</Button>
      </Modal> */}
    </StyleContent>
  );
};

export default BaseForm;
