import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button,
  Input,
  Form,
  Col,
  Row,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Transfer,
  Tree,
  Table,
  Space,
  Modal,
  Divider,
  Switch,
  message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, UserOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import PlanformIMG from '@/assets/images/planform.jpeg';
import SelectPeople from '@/components/selectPeople';
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
import { BASE_FORM_LAYOUT, BASE_FORM_LAYOUT_SINGLE } from '@/utils/constant';
import DICT from '@/utils/dictionary';

const { RangePicker } = DatePicker;

const BaseForm = () => {
  const dispatch = useDispatch();
  const system_config = useSelector((state: any) => state.system_config);
  const { configModalVisible } = system_config;

  const initVisible = false;
  const [visible, setVisible] = useState(initVisible);
  const [form] = Form.useForm();

  const onChange = (value: any) => {
    console.log('value', value);
  };
  const onFinish = (value: any) => {
    console.log('value', value);
  };
  const closeSelectPeopleModal = (value: any) => {
    setVisible(false);
  };
  const sureSelectPeopleModal = (value: any) => {
    console.log(value, 'value');
    setVisible(false);
  };
  const plainOptions = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const isChecked = (selectedKeys: any, eventKey: any) => selectedKeys.indexOf(eventKey) !== -1;
  const generateTree = (treeNodes: any = [], checkedKeys: any = []) =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key),
      children: generateTree(children, checkedKeys),
    }));
  const filterOption = (inputValue: any, option: any) => {
    console.log(option.title.indexOf(inputValue) > -1);
    return option.title.indexOf(inputValue) > -1;
  };

  const treeData = [
    { key: '0-0', title: '王五' },
    // {
    //   key: '0-1',
    //   title: '0-1',
    //   children: [
    //     { key: '0-1-0', title: '0-1-0' },
    //     { key: '0-1-1', title: '0-1-1' },
    //   ],
    // },
    { key: '0-1', title: '张三' },
    { key: '0-2', title: '李四' },
    { key: '0-3', title: '陈狗' },
    { key: '0-4', title: '麻子' },
  ];
  const [targetKeys, setTargetKeys] = useState([]);
  const onSelectChange = (keys: any) => {
    setTargetKeys(keys);
  };
  const handleSearch = (dir: any, value: any) => {
    const newDeptList = treeData.filter(item => item.title.indexOf(value) > -1);
    console.log('search:', dir, value);
  };
  const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: { dataSource: any; targetKeys: any }) => {
    const transferDataSource: any = [];
    function flatten(list = []) {
      list.forEach((item: any) => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    }
    flatten(dataSource);

    return (
      <Transfer
        {...restProps}
        className="tree-transfer"
        dataSource={transferDataSource}
        titles={['未选人员', '已选人员']}
        showSearch
        targetKeys={targetKeys}
        onChange={onSelectChange}
        render={(item: any) => item.title}
        locale={{ itemUnit: '人', itemsUnit: '人' }}
      >
        {({ direction, onItemSelect, selectedKeys }: { direction: any; onItemSelect: any; selectedKeys: any }) => {
          if (direction === 'left') {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
              />
            );
          }
        }}
      </Transfer>
    );
  };
  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} />
          {/* <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            title={DICT.table.delete}
            onClick={() => onRemoveRect()}
          /> */}
          {/* <Radio.Group
            style={{ marginLeft: 16 }}
            buttonStyle="solid"
            optionType="button"
            value={mode}
            options={['Move', 'Resize']}
            onChange={e => setMode(e.target.value)}
          /> */}
        </StyleFunctional>
      </StyleToolbar>

      <StyleMain>
        <Form
          {...BASE_FORM_LAYOUT}
          size="small"
          form={form}
          initialValues={{ name: '', checked: 'Apple' }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Name:" name="name" rules={[{ required: true, message: 'Name is required.' }]}>
                <Input style={{ width: '79%', marginRight: 10 }} />

                <Button
                  type="primary"
                  shape="circle"
                  icon={<UserOutlined />}
                  onClick={() => {
                    setVisible(true);
                  }}
                ></Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Select:" name="status" rules={[{ required: true, message: 'Name is required.' }]}>
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Redio:" name="redio" rules={[{ required: true, message: 'redio is required.' }]}>
                <Radio.Group onChange={onChange}>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Checkbox:" name="checked" rules={[{ required: true, message: 'Name is required.' }]}>
                <Checkbox.Group options={plainOptions} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="datePicker"
                label="DatePicker"
                rules={[{ required: true, message: 'DatePicker is required.' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTimePicker"
                label="DatePicker[showTime]"
                rules={[{ required: true, message: 'DatePicker[showTime] is required.' }]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="rangePicke"
                label="RangePicke"
                rules={[{ required: true, message: 'RangePicke is required.' }]}
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTimePicker"
                label="DatePicker[showTime]"
                rules={[{ required: true, message: 'datePicker is required.' }]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...BASE_FORM_LAYOUT_SINGLE}
                label="TextArea:"
                name="textArea"
                rules={[{ required: true, message: 'TextArea is required.' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Name:" name="name" rules={[{ required: true, message: 'Name is required.' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select:" name="status" rules={[{ required: true, message: 'Name is required.' }]}>
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select:" name="status" rules={[{ required: true, message: 'Name is required.' }]}>
                <Select>
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="0">Available</Select.Option>
                  <Select.Option value="1">Forbidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}></Col>
            <Col span={20}>
              <Form.Item name="name">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button type="dashed">Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyleMain>

      {visible ? <SelectPeople closeUploadModal={closeSelectPeopleModal} onOk={sureSelectPeopleModal} /> : null}
    </StyleContent>
  );
};

export default BaseForm;
