import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Radio, Table, Space, Modal, Switch, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import PlanformIMG from '@/assets/images/planform.jpeg';
import { useMount } from '@umijs/hooks';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar, StyleBody, StyleSider } from '@/pages/demo/style';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import DICT from '@/utils/dictionary';

const zrender = require('zrender');

const COLORS = {
  DEFAULT: '#DDD',
  NORMAL: '#0F0',
  WARNING: 'orange',
  ERROR: '#F00',
  STROKE: '#F00',
};

interface Rect {
  id?: string;
  tempId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status?: 'DEFAULT' | 'NORMAL' | 'WARNING' | 'ERROR';
}

const Planform = () => {
  const dispatch = useDispatch();
  const system_config = useSelector((state: any) => state.system_config);
  const { configModalVisible } = system_config;

  const [form] = Form.useForm();
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', configName: '', configKey: '', configType: '' };
  const [query, setQuery] = useState(initQuery);
  const [visible, setVisible] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null); // id || tempID
  const [activeInfo, setActiveInfo] = useState<Rect | undefined>();
  const [mode, setMode] = useState<'Move' | 'Resize'>('Move');
  // const [canvas, setCanvas] = useState<any>(initCanvas)
  const [group, setGroup] = useState<any>(null);
  let zr: any = null;
  let resizeFlag = false;
  // let moveFlag = false;
  let initCoo = { x: 0, y: 0, width: 0, height: 0 };
  let prevCoo = { x: 0, y: 0 };

  const onFinish = (values: any) => {
    setQuery({ ...query, ...values, current: 1 });
  };

  const onCancel = () => {
    setVisible(false);
  };

  const [configRect, setConfigRect] = useState<Rect | undefined>();

  const INIT_RECT: Rect[] = [
    { id: 'abc123', x: 20, y: 80, width: 80, height: 40, status: 'NORMAL' },
    { id: 'abc124', x: 155, y: 80, width: 80, height: 40, status: 'ERROR' },
    { id: 'abc125', x: 20, y: 130, width: 80, height: 40, status: 'WARNING' },
    { id: 'abc126', x: 155, y: 130, width: 80, height: 40, status: 'DEFAULT' },
  ];
  const [rectData, setRectData] = useState<Rect[]>(INIT_RECT);

  useMount(() => {
    const dom = document.getElementById('canvas');
    zr = zrender.init(dom);
    const group = new zrender.Group();
    // image
    const img = new zrender.Image({
      style: { image: 'https://xiaozhazha.com/public/img/planform.jpeg', x: -60, y: -50, width: 1200, height: 687 },
      cursor: 'default',
    });
    zr.add(img);
    zr.add(group);
    setGroup(group);
  });

  useEffect(() => {
    if (group) group.removeAll();
    const draggable = mode === 'Move';
    for (const i in rectData) {
      const fill = COLORS[rectData[i].status || 'DEFAULT'];
      // const initShape = _.cloneDeep(shape)
      const rect = new zrender.Rect({
        shape: rectData[i],
        style: { fill },
        draggable,
        cursor: draggable ? 'pointer' : 'crosshair',
      });
      rect.on('click', (e: any) => {
        setActive(rectData[i].id || rectData[i].tempId || '');
        setActiveInfo(e.target.shape);
      });
      rect.on('dblclick', (e: any) => {
        const shape = e.target.shape;
        // console.log('dblclick', shape)
        // setConfigRect(shape)
        form.setFieldsValue(shape.id ? shape : { ...shape, id: shape.tempId });
        setVisible(true);
      });
      if (draggable) {
        rect.on('mouseup', function(e: any) {
          // console.log(e.target.position, rectData[i].x, rectData[i].y)
          // moveFlag
          rectData[i] = {
            ...rectData[i],
            x: rectData[i].x + e.target.position[0],
            y: rectData[i].y + e.target.position[1],
          };
          setRectData(_.cloneDeep(rectData));
        });
      } else {
        rect.on('mousedown', function(e: any) {
          resizeFlag = true;
          initCoo = { x: e.offsetX, y: e.offsetY, width: rectData[i].width, height: rectData[i].height };
        });
        rect.on('mousemove', function(e: any) {
          const { offsetX: x, offsetY: y } = e;
          if (resizeFlag && (x !== prevCoo.x || y !== prevCoo.y)) {
            // console.log('mousewheel', e)
            prevCoo = { x, y };
            const xInc = x - initCoo.x;
            const yInc = y - initCoo.y;
            // console.log(rectData[i].width, xInc, yInc, '||', x, prevCoo.x, y, prevCoo.y)
            rect.attr('shape', {
              ...rectData[i],
              width: initCoo.width + xInc,
              height: initCoo.height + yInc,
            });
          }
        });
        rect.on('mouseup', function(e: any) {
          resizeFlag = false;
          const { offsetX: x, offsetY: y } = e;
          const xInc = x - initCoo.x;
          const yInc = y - initCoo.y;
          rectData[i] = { ...rectData[i], width: initCoo.width + xInc, height: initCoo.height + yInc };
          setRectData(_.cloneDeep(rectData));
          prevCoo = { x: 0, y: 0 };
        });
      }
      // active 边框
      if (rectData[i].id === active || rectData[i].tempId === active) {
        rect.attr('style', { fill, stroke: COLORS.STROKE, lineDash: [4] });
      }
      if (group) group.add(rect);
    }
  }, [mode, rectData, group, active]);

  const onCreateArea = () => {
    const newRect = { tempId: `temp_${new Date().getTime()}`, x: 10, y: 10, width: 80, height: 40 };
    rectData.push(newRect);
    setRectData(rectData);
    setActive(newRect.tempId);
  };

  const onRemoveRect = () => {
    const newRectData = rectData.filter(r => r.id !== active && r.tempId !== active);
    setRectData(newRectData);
    setActive(null);
  };

  const onReloadRect = () => {
    setRectData(INIT_RECT);
    setActive(null);
  };

  const onFinishRectConfig = () => {
    message.success('Saved.');
  };

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={() => onCreateArea()} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} onClick={() => onReloadRect()} />
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            title={DICT.table.delete}
            onClick={() => onRemoveRect()}
          />
          <Radio.Group
            style={{ marginLeft: 16 }}
            buttonStyle="solid"
            optionType="button"
            value={mode}
            options={['Move', 'Resize']}
            onChange={e => setMode(e.target.value)}
          />
        </StyleFunctional>
        {/* <StyleFilter layout="inline" form={form} initialValues={initQuery} onFinish={onFinish}>
          <Form.Item name="configType">
            <Select style={{ width: 110 }}>
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0">Available</Select.Option>
              <Select.Option value="1">Forbidden</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="configName">
            <Input placeholder="input config name" />
          </Form.Item>
          <Form.Item name="configKey">
            <Input.Search placeholder="input config key" enterButton onSearch={form.submit} />
          </Form.Item>
        </StyleFilter> */}
      </StyleToolbar>

      <StyleBody>
        <div id="canvas" className="canvas"></div>
        <StyleSider>
          <table className="info">
            {activeInfo && (
              <tbody>
                <tr>
                  <td>No:</td>
                  <td>{activeInfo.id || activeInfo.tempId}</td>
                </tr>
                <tr>
                  <td>System:</td>
                  <td>{activeInfo.x}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{activeInfo.y}</td>
                </tr>
                <tr>
                  <td>Fab:</td>
                  <td>{activeInfo.width}</td>
                </tr>
                <tr>
                  <td>Machine:</td>
                  <td>{activeInfo.height}</td>
                </tr>
                <tr>
                  <td>Owner:</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{activeInfo.status}</td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td>2020-12-12 12:12:12</td>
                </tr>
                <tr>
                  <td>Remark:</td>
                  <td>This machine has been specially adapted for underwater use.</td>
                </tr>
              </tbody>
            )}
          </table>
          <table>
            <tbody>
              <tr>
                <td>Default:</td>
                <td>
                  <div style={{ width: '100%', height: 20, background: COLORS.DEFAULT }}></div>
                </td>
              </tr>
              <tr>
                <td>Normal:</td>
                <td>
                  <div style={{ width: '100%', height: 20, background: COLORS.NORMAL }}></div>
                </td>
              </tr>
              <tr>
                <td>Warning:</td>
                <td>
                  <div style={{ width: '100%', height: 20, background: COLORS.WARNING }}></div>
                </td>
              </tr>
              <tr>
                <td>Error:</td>
                <td>
                  <div style={{ width: '100%', height: 20, background: COLORS.ERROR }}></div>
                </td>
              </tr>
            </tbody>
          </table>
        </StyleSider>
      </StyleBody>

      <Modal getContainer={false} title="Config" visible={visible} onOk={form.submit} onCancel={onCancel}>
        <Form form={form} {...FORM_ITEM_LAYOUT} onFinish={() => onFinishRectConfig()}>
          <Form.Item label="id" name="id">
            <Input placeholder="id" />
          </Form.Item>
          <Form.Item label="X" name="x" rules={[{ required: true, message: 'Please input x!' }]}>
            <Input placeholder="X" />
          </Form.Item>
          <Form.Item label="Y" name="y" rules={[{ required: true, message: 'Please input y!' }]}>
            <Input placeholder="Y" />
          </Form.Item>
          <Form.Item label="width" name="width" rules={[{ required: true, message: 'Please input width!' }]}>
            <Input placeholder="width" />
          </Form.Item>
          <Form.Item label="height" name="height" rules={[{ required: true, message: 'Please input height!' }]}>
            <Input placeholder="height" />
          </Form.Item>
          <Form.Item label="status" name="status">
            <Input placeholder="status" />
          </Form.Item>
        </Form>
      </Modal>
    </StyleContent>
  );
};

export default Planform;
