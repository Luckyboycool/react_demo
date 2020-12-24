import React, { useState } from 'react';
import _ from 'lodash';
import { Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMount } from '@umijs/hooks';
import { StyleNotice } from '@/assets/styles/component';
import GlobalDrawer from '@/layouts/component/drawer';
import DICT from '@/utils/dictionary';

const StyleDrawerHeader = styled.div`
  padding: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  background-color: #f5f5f5;
  h4 {
    margin: 0;
    color: #333;
  }
  .mark-all {
    color: #1890ff;
    cursor: pointer;
    font-size: 12px;
  }
`;
const StyleNoticeGroup = styled.ul`
  display: block;
  padding: 0;
  margin: 0;
  li {
    display: block;
    padding: 8px 16px;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }
    h5 {
      color: #333;
    }
    .time {
      text-align: right;
    }
    &.MARK {
      h5,
      p {
        color: #bbb;
      }
    }
    &.DANGER {
      h5 {
        color: #ff4d4f;
      }
    }
  }
`;

const Notice = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { user }: { user: any } = global;

  const onOpenMessage = () => {
    dispatch({ type: 'global/drawerVisible', payload: true });
  };

  const NOTICE_COLORS = ['MARK', 'NORMAL', 'DANGER'];

  const [notices, setNotices] = useState<any[]>([]);

  useMount(() => {
    setNotices([
      {
        id: 1,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Task: 1315843534179115008, Module: 1315466248381640704, Running Type: ABORT, Task Type: PRODUCTION',
        time: '2020-11-19 20:37:20',
        status: 1,
      },
      {
        id: 2,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject模型预测开始',
        time: '2020-11-18 20:37:20',
        status: 1,
      },
      {
        id: 3,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Task: 1315843534179115008, Module: 1315466248381640704, Running Type: ABORT, Task Type: PRODUCTION',
        time: '2020-11-19 20:37:20',
        status: 1,
      },
      {
        id: 4,
        title: '1012_LXYtest1 模型训练异常',
        desc: 'Reject预测完毕，本次预测43条',
        time: '2020-11-17 20:37:20',
        status: 2,
      },
      {
        id: 5,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Task: 1315843534179115008, Module: 1315466248381640704, Running Type: ABORT, Task Type: PRODUCTION',
        time: '2020-11-19 20:37:20',
        status: 1,
      },
      {
        id: 6,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject模型预测开始',
        time: '2020-11-18 20:37:20',
        status: 0,
      },
      {
        id: 7,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject预测完毕，本次预测43条',
        time: '2020-11-17 20:37:20',
        status: 0,
      },
      {
        id: 8,
        title: '1012_LXYtest1 模型训练异常',
        desc: 'Task: 1315843534179115008, Module: 1315466248381640704, Running Type: ABORT, Task Type: PRODUCTION',
        time: '2020-11-19 20:37:20',
        status: 2,
      },
      {
        id: 9,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject模型预测开始',
        time: '2020-11-18 20:37:20',
        status: 0,
      },
      {
        id: 10,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject预测完毕，本次预测43条',
        time: '2020-11-17 20:37:20',
        status: 0,
      },
      {
        id: 11,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject模型预测开始',
        time: '2020-11-18 20:37:20',
        status: 0,
      },
      {
        id: 12,
        title: '1012_LXYtest1 模型训练完成',
        desc: 'Reject预测完毕，本次预测43条',
        time: '2020-11-17 20:37:20',
        status: 0,
      },
    ]);
  });

  const onMark = (id: number) => {
    console.log('onMark ', id);
    for (const n of notices) {
      if (n.id === id) n.status = 0;
    }
    setNotices(_.cloneDeep(notices));
  };

  const onMarkAll = () => {
    setNotices(
      notices.map(n => {
        return { ...n, status: 0 };
      }),
    );
  };

  const count = notices.filter(n => n.status).length;

  return user ? (
    <div>
      <StyleNotice>
        <li>
          <Badge size="small" count={count}>
            <div className="item" onClick={onOpenMessage}>
              {DICT.account.message}
            </div>
          </Badge>
        </li>
      </StyleNotice>
      <GlobalDrawer
        title={
          <StyleDrawerHeader>
            <h4>Model Information</h4>
            <span className="mark-all" onClick={onMarkAll}>
              Mark all as read
            </span>
          </StyleDrawerHeader>
        }
      >
        <StyleNoticeGroup>
          {notices.map(n => (
            <li key={n.id} className={NOTICE_COLORS[n.status]} onClick={() => onMark(n.id)}>
              <h5>{n.title}</h5>
              <p>{n.desc}</p>
              <p className="time">{n.time}</p>
            </li>
          ))}
        </StyleNoticeGroup>
      </GlobalDrawer>
    </div>
  ) : null;
};

export default Notice;
