import React from 'react';
import DICT from '@/utils/dictionary';
import System_manage_role from '@/pages/system/manage/role';
import System_manage_permission from '@/pages/system/manage/permission';
import System_manage_dict from '@/pages/system/manage/dict';
import System_manage_config from '@/pages/system/manage/config';
import System_moniter_operation from '@/pages/system/monitor/operation';
import System_moniter_loginLog from '@/pages/system/monitor/loginLog';

import Demo_planform from '@/pages/demo/planform';
import Demo_layout_baseForm from '@/pages/demo/layout/baseForm';
import Demo_layout_apply from '@/pages/demo/layout/apply';
import Demo_layout_approval from '@/pages/demo/layout/approval';
import Demo_practice_group from '@/pages/demo/practice/group';
import Demo_practice_group1 from '@/pages/demo/practice/group1';
import Demo_practice_group2 from '@/pages/demo/practice/group2';
import Demo_practice_dataQuery from '@/pages/demo/practice/dataQuery';
import Demo_practice_myTest from '@/pages/demo/practice/myTest';


import System from '@/assets/images/admin.jpeg';

import {
  UnorderedListOutlined,
  BugOutlined,
  SmileOutlined,
  UserOutlined,
  VerifiedOutlined,
  SolutionOutlined,
  ReadOutlined,
  FileDoneOutlined,
  ToolOutlined,
} from '@ant-design/icons';

export const PRODUCT_MODULE_PAGE = [
  {
    key: 'system',
    title: DICT.apps.system,
    image: System,
    desc: '向视频监控设备提供统一开放的音视频流接入、存储、分发、录制回放的服务',
    modules: [
      {
        key: 'manage',
        title: 'Manage',
        icon: <UnorderedListOutlined />,
        pages: [
          {
            key: 'role',
            title: 'Role',
            icon: <SmileOutlined />,
            component: <System_manage_role />,
          },
          {
            key: 'permission',
            title: 'Permission',
            icon: <VerifiedOutlined />,
            component: <System_manage_permission />,
          },
          {
            key: 'dict',
            title: 'Dictionary',
            icon: <ReadOutlined />,
            component: <System_manage_dict />,
          },
          {
            key: 'config',
            title: 'Config',
            icon: <ToolOutlined />,
            component: <System_manage_config />,
          },
        ],
      },
      {
        key: 'monitor',
        title: 'Monitor',
        icon: <BugOutlined />,
        pages: [
          {
            key: 'operation',
            title: 'Operation Log',
            icon: <FileDoneOutlined />,
            component: <System_moniter_operation />,
          },
          {
            key: 'loginLog',
            title: 'Login Log',
            icon: <SolutionOutlined />,
            component: <System_moniter_loginLog />,
          },
        ],
      },
    ],
  },
  // demo
  {
    key: 'demo',
    title: 'Demo',
    image: System,
    desc: '向视频监控设备提供统一开放的音视频流接入、存储、分发、录制回放的服务',
    modules: [
      {
        key: 'planform',
        title: 'Planform',
        icon: <UnorderedListOutlined />,
        component: <Demo_planform />,
      },
      {
        key: 'practice',
        title: 'Practice',
        icon: <UserOutlined />,
        pages: [
          {
            key: 'Group2',
            title: 'Group2',
            icon: <SolutionOutlined />,
            component: <Demo_practice_group2 />,
          },
          {
            key: 'group',
            title: 'Group',
            icon: <SolutionOutlined />,
            component: <Demo_practice_group />,
          },
          {
            key: 'group1',
            title: 'Group1',
            icon: <SolutionOutlined />,
            component: <Demo_practice_group1 />,
          },
          {
            key: 'dataQuery',
            title: 'DataQuery',
            icon: <SolutionOutlined />,
            component: <Demo_practice_dataQuery />,
          },
          {
            key: 'myTest',
            title: 'MyTest',
            icon: <SolutionOutlined />,
            component: <Demo_practice_myTest />,
          },
        ]
      },
      {
        key: 'layout',
        title: 'Layout',
        icon: <BugOutlined />,
        pages: [
          {
            key: 'baseForm',
            title: 'Base Form',
            icon: <SolutionOutlined />,
            component: <Demo_layout_baseForm />,
          },
          {
            key: 'approval',
            title: 'Approval',
            icon: <SolutionOutlined />,
            component: <Demo_layout_approval />,
          },
          {
            key: 'apply',
            title: 'Apply',
            icon: <SolutionOutlined />,
            component: <Demo_layout_apply />,
          },
        ],
      },
    ],
  },
];
