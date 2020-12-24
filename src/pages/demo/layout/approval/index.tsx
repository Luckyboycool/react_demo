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
import { StyleTableBox } from './style';
import UploadFile from '@/components/upload';
import PlanformIMG from '@/assets/images/planform.jpeg';
import { useMount } from '@umijs/hooks';
import {
  StyleFunctional,
  StyleFilter,
  StyleContent,
  StyleToolbar,
  StyleBody,
  StyleSider,
  StyleMain,
} from '@/pages/demo/style';
import { BASE_FORM_LAYOUT, BASE_FORM_LAYOUT_SINGLE, BASE_FORM_LAYOUT_SINGLE_ALONG } from '@/utils/constant';
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
  const onChange = (e: any) => {
    console.log(e);
  };
  const dataSource: Array<any> = [
    {
      id: 1,
      type: 'QQQQQQQQQQQQQ',
      code: 'WPSJQ Test001,门户测试(200001)	',
      year: 'Submit',
      num: '2013-04-01 12:00:12',
      info: 'Create',
    },
    {
      id: 2,
      type: 'TELFDControlManager',
      code: 'WPSJQ Test001,门户测试(200001)	',
      year: 'approve',
      num: '2013-04-01 12:00:12',
      info: 'Create',
    },
  ];
  const dataSource1: Array<any> = [
    {
      id: 1,
      type: 'Create',
      code: 'WPSJQ Test001,门户测试(200001)	',
      year: 'Submit',
      num: '2013-04-01 12:00:12',
      info: 'Create',
    },
    {
      id: 2,
      type: 'ERExpenseAudit',
      code: 'WPSJQ Test001,门户测试(200001)	',
      year: 'approve',
      num: '2013-04-01 12:00:12',
      info: 'Create',
    },
  ];
  const columns = [
    {
      title: '节点',
      dataIndex: 'type',
      key: 'type',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'code',
      key: 'code',
      width: 240,
    },
    {
      title: '动作',
      dataIndex: 'year',
      key: 'year',
      width: 80,
    },
    {
      title: '时间',
      dataIndex: 'num',
      key: 'num',
      width: 180,
    },
    {
      title: '备注',
      dataIndex: 'info',
      key: 'info',
    },
  ];

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  // const plainOptions = [
  //   { label: 'Apple', value: 'Apple' },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  // ];
  const plainOptions = [
    { label: ' New Tapeout', value: '1' },
    { label: 'MPW', value: '2' },
  ];
  return (
    <StyleContent>
      <Header title="档案借阅/复印申请" form={applyForm} />
      <StyleMain>
        <Form
          {...BASE_FORM_LAYOUT_SINGLE_ALONG}
          size="small"
          form={form}
          initialValues={{ name: '', checked: '' }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={24}>
              <Form.Item label="Device Name:" name="name" rules={[{ required: true, message: 'Name is required.' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Technology Node:"
                name="status"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
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
                label="Technology Type:"
                name="status"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Characterization:"
                name="status"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
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
              <Form.Item label="Core Voltage:" name="status" rules={[{ required: true, message: 'Name is required.' }]}>
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="ID Device Voltage:"
                name="status"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
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
                label="GTA Design Rule Spec:"
                name="status"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tapeout Plan:"
                name="checked"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
                <Checkbox.Group options={plainOptions} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>

          <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="Market&Application:(Click for Reference Table) Start" key="1">
              <Row>
                <Col span={24}>
                  <Form.Item
                    label=" Will you device/product be used in loT application?"
                    name="radioCheke"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Radio.Group>
                      <Radio value={1}>YES</Radio>
                      <Radio value={2}>NO</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Primary Market:"
                    name="checked"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Select>
                      <Select.Option value="Automotive">Automotive</Select.Option>
                      <Select.Option value="Communication">Communication</Select.Option>
                      <Select.Option value="Computer">Computer</Select.Option>
                      <Select.Option value="Consumer">Consumer</Select.Option>
                      <Select.Option value="Industrial">Industrial</Select.Option>
                      <Select.Option value="Memory Storage">Memory Storage</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Primary Application:"
                    name="checked"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Select>
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="0">Available</Select.Option>
                      <Select.Option value="1">Forbidden</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={
                      <span>
                        is your device/product designed for <br></br>any other markets or application?
                      </span>
                    }
                    name="radioCheke"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Radio.Group onChange={onChange}>
                      <Radio value={1}>YES</Radio>
                      <Radio value={2}>NO</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="Market&Application:(Click for Reference Table) End" key="2">
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Device Segment:(Click for Reference Table)"
                    name="segment"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Select>
                      <Select.Option value="Discretes">Discretes</Select.Option>
                      <Select.Option value="Interposer">Interposer</Select.Option>
                      <Select.Option value="Intergrated Passive Device">Intergrated Passive Device</Select.Option>
                      <Select.Option value="loT-SoC（non-SIP）">loT-SoC（non-SIP）</Select.Option>
                      <Select.Option value="Logic IC">Logic IC</Select.Option>
                      <Select.Option value="Memory">Memory</Select.Option>
                      <Select.Option value="Micro Processor">Micro Processor</Select.Option>
                      <Select.Option value="Mixed Signal/RF">Mixed Signal/RF</Select.Option>
                      <Select.Option value="Optoelectronice">Optoelectronice</Select.Option>
                      <Select.Option value="Power IC">Power IC</Select.Option>
                      <Select.Option value="Probe">Probe</Select.Option>
                      <Select.Option value="Card">Card</Select.Option>
                      <Select.Option value="Sensore and Actuators">Sensore and Actuators</Select.Option>
                      <Select.Option value="Test Device">Test Device</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Device:" name="checked" rules={[{ required: true, message: 'Name is required.' }]}>
                    <Select>
                      <Select.Option value="Diodes">Diodes</Select.Option>
                      <Select.Option value="Power Transistor-Bipolar Transistors">
                        Power Transistor-Bipolar Transistors
                      </Select.Option>
                      <Select.Option value="Power Transistor-IGBT">Power Transistor-IGBT</Select.Option>
                      <Select.Option value="Power Transistor-Power MOSFETs">
                        Power Transistor-Power MOSFETs
                      </Select.Option>
                      <Select.Option value="Rectifiers（Power Diodes）">Rectifiers（Power Diodes）</Select.Option>
                      <Select.Option value="Small Signal& Switch Transistors">
                        Small Signal& Switch Transistors
                      </Select.Option>
                      <Select.Option value="Thyristors">Thyristors</Select.Option>
                      <Select.Option value="Others">Others</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Remark:" name="Remark" rules={[{ required: true, message: 'Name is required.' }]}>
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="Account CE:" key="3">
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Technology Information"
                    name="TechnologyInformation"
                    rules={[{ required: true, message: 'Name is required.' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Row style={{ textAlign: 'center' }}>
            <Col span={24}>
              <Form.Item name="name" {...BASE_FORM_LAYOUT_SINGLE}>
                <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button type="dashed">Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyleMain>
    </StyleContent>
  );
};

export default BaseForm;
