import React, { useState } from 'react';
import {
              Button, Input, Form, Select, Table,
              Row, Col, Checkbox, Divider,
              DatePicker, Space, List
} from 'antd';
import { queryData } from './service';
import { Moment } from 'moment';

const { Option } = Select;

let body = {
              existsImg: "Y",
              keywords: "",
              scanTimeBegin: "",
              scanTimeEnd: "",
              productIds: [],
              stepIds: [],
              lotIds: [],
              waferIds: [],
              targetField: "PRODUCT_ID"
}

//let dataResponse:any = {};

const DataQuery = () => {

              const { RangePicker } = DatePicker;

              const query = { current: "1", pageSize: "1000" }

              const [productId, setProductId] = useState([]);
              const [stepId, setStepId] = useState([]);
              const [lotId, setLotId] = useState([]);
              const [waferId, setWaferId] = useState([]);
              const [groupId, setGroupId] = useState([]);

              const onOk = async () => {
                            const result: any = await queryData(query, body);
                            setProductId(result);
                            console.log("----" + productId);
              }

              const onCheckbox = (checkedValue: any) => {
                            body.existsImg = checkedValue.target.checked ? "Y" : "N";
              }


              const onDateChange: any = (display: React.SetStateAction<string[]>, dateTime: string[]) => {
                            console.log(dateTime);
                            body.scanTimeBegin = dateTime[0];
                            body.scanTimeEnd = dateTime[1];
              }

              const selProductId: any = async (value: []) => {
                            console.log(value);
                            body.targetField = "STEP_ID";
                            body.productIds = value;
                            const result: any = await queryData(query, body);
                            //setProductId(result)
                            setStepId(result);
              }

              const selStepId: any = async (value: []) => {
                            body.targetField = "LOT_ID";
                            body.stepIds = value;
                            //body = { ...oldBody, targetField: 'LOTID', stepIds: value }

                            //onOk();
                            const result: any = await queryData(query, body);
                            setLotId(result);
              }

              const selLotId: any = async (value: []) => {
                            body.targetField = "WAFER_NO";
                            body.lotIds = value;
                            //onOk();
                            const result: any = await queryData(query, body);
                            setWaferId(result);
              }

              const selWaferId: any = async (value: []) => {
                            body.targetField = "GROUP_ID";
                            body.waferIds = value;
                            const result: any = await queryData(query, body);
                            setGroupId(result);
              }

              const selGroupId: any = async (value: []) => {
                            body.targetField = "PRODUCT_ID";
                            body.waferIds = value;
                            const result: any = await queryData(query, body);

              }




              return (

                            <>
                                          <Row>
                                                        <Col span={3}>
                                                                      <Checkbox onChange={onCheckbox} checked>
                                                                                    有照片
                    </Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                                      <RangePicker showTime onChange={onDateChange} />
                                                        </Col>
                                                        <Col span={3}>
                                                                      <Button type="primary" onClick={onOk}>OK</Button>
                                                        </Col>
                                          </Row>
                                          <Row>
                                                        <Divider orientation="left" plain>Product Id</Divider>
                                                        <Select mode="multiple" style={{ width: "160px" }} id="productId" onChange={selProductId}>
                                                                      {
                                                                                    productId.map(item => (
                                                                                                  <Select.Option key={item} value={item}>
                                                                                                                {item}
                                                                                                  </Select.Option>
                                                                                    ))
                                                                      }
                                                        </Select>
                                          </Row>
                                          <Row>
                                                        <Divider orientation="left" plain>Step Id</Divider>
                                                        <Select mode="multiple" style={{ width: "160px" }} id="stepId" onChange={selStepId}>
                                                                      {
                                                                                    stepId.map(item => (
                                                                                                  <Select.Option key={item} value={item}>
                                                                                                                {item}
                                                                                                  </Select.Option>
                                                                                    ))
                                                                      }
                                                        </Select>
                                          </Row>
                                          <Row>
                                                        <Divider orientation="left" plain>Lot Id</Divider>
                                                        <Select mode="multiple"
                                                                      style={{ width: "160px" }} id="lotId" onChange={selLotId}>
                                                                      {
                                                                                    lotId.map(item => (
                                                                                                  <Select.Option key={item} value={item}>
                                                                                                                {item}
                                                                                                  </Select.Option>
                                                                                    ))
                                                                      }
                                                        </Select>
                                          </Row>
                                          <Row>
                                                        <Divider orientation="left" plain>Wafer Id</Divider>
                                                        <Select mode="multiple" style={{ width: "160px" }} id="waferId" onChange={selWaferId}>
                                                                      {
                                                                                    waferId.map(item => (
                                                                                                  <Select.Option key={item} value={item}>
                                                                                                                {item}
                                                                                                  </Select.Option>
                                                                                    ))
                                                                      }
                                                        </Select>
                                          </Row>
                                          <Row>
                                                        <Divider orientation="left" plain>Group Id</Divider>
                                                        <Select mode="multiple" style={{ width: "160px" }} id="groupId" onChange={selGroupId}>
                                                                      {
                                                                                    groupId.map(item => (
                                                                                                  <Select.Option key={item} value={item}>
                                                                                                                {item}
                                                                                                  </Select.Option>
                                                                                    ))
                                                                      }
                                                        </Select>
                                          </Row>
                            </>
              );
}

export default DataQuery;