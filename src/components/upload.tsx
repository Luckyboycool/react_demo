import logo from '@/assets/images/asmclogo.png';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal, Upload, Button } from 'antd';

const UploadFile = (ele: any) => {
  const { closeUploadModal } = ele;
  const initFile: Array<any> = [];
  const [fileList, setFileList] = useState(initFile);
  const onChange = ({ file, fileList }: { file: any; fileList: any }) => {
    console.log(file, fileList);
    setFileList(fileList);
  };
  const onBeforeunload = (file: any) => {
    setFileList([...fileList, file]);
    console.log('value', file);
    return false;
  };

  const onStartUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      console.log(file);
      formData.append('file', file);
      console.log(formData.get('file'));
    });
    //   fetchImageMax(formData).then(res => {

    //   })
    console.log(formData);
  };

  return (
    <Modal visible={true} title="上传附件" onCancel={closeUploadModal} footer={[]}>
      <div style={{ border: '1px solid #ccc', height: 150, marginBottom: 10 }}>
        <Upload beforeUpload={onBeforeunload} fileList={fileList} onChange={onChange}></Upload>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Upload style={{ display: 'inline-block' }} showUploadList={false} beforeUpload={onBeforeunload}>
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
        <Button onClick={closeUploadModal} style={{ marginRight: 10 }}>
          关闭
        </Button>
      </div>
    </Modal>
  );
};

export default UploadFile;
