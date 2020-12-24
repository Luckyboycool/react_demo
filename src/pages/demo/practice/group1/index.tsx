import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Select, Form, Checkbox, Divider, DatePicker } from 'antd';
import { useMount, useResponsive } from '@umijs/hooks';
import { fetchGroups } from './service';

const Option = Select.Option;

let initQuery = {
    //初始化
    existsImg: "Y",
    keywords: "",
    scanTimeBegin: "",
    scanTimeEnd: "",
    productIds: [],
    stepIds: [],
    lotIds: [],
    groupIds: [],
    slotIds: [],
    inspectors: [],
    scanDates: [],
    testIds: [],
    recipeIds: [],
    waferIds: [],
    targetField: ""
};
const pro = {
    id: "pro",
    name: "Product Id",
    type: "PRODUCT_ID",
    checked: true,
    val: "Y",
    num: 0
};
let step = {
    id: "step",
    name: "Step Id",
    type: "STEP_ID",
    checked: true,
    val: "Y",
    num: 1
};
let wafer = {
    id: "wafer",
    name: "Wafer Id",
    type: "WAFER_NO",
    checked: true,
    val: "Y",
    num: 2
};
let lot = {
    id: "lot",
    name: "Lot Id",
    type: "LOT_ID",
    checked: true,
    val: "Y",
    num: 3
};
let group = {
    id: "group",
    name: "Group Id",
    type: "GROUP_ID",
    checked: true,
    val: "Y",
    num: 4
};
let scan = {
    id: "scan",
    name: "Scan Time/Date",
    type: "SCAN_TM",
    checked: false,
    val: "N",
    num: 5
};
let equip = {
    id: "equip",
    name: "Inspect Equip Id ",
    type: "EQP_ID",
    checked: false,
    val: "N",
    num: 6
};
let recipe = {
    id: "recipe",
    name: "Recipe id",
    type: "RECIPE_ID",
    checked: false,
    val: "N",
    num: 7
};
let test = {
    id: "test",
    name: "Test id",
    type: "TEST_NO",
    checked: false,
    val: "N",
    num: 8
};
let slot = {
    id: "slot",
    name: "Slot Id",
    type: "SLOT_NUM",
    checked: false,
    val: "N",
    num: 9
};

let arr = [pro, step, lot, wafer, group];

const PracticeGroup1 = () => {
    var currentNode = 0;

    const [coulmn, setCoulmn] = useState([pro, step, lot, wafer, group, scan, equip, recipe, test, slot]);  //所有复选框

    // const [checkedCoulmn, setCheckedCoulmn] = useState(arr);

    const [query, setQuery] = useState(initQuery);
    const [times, setTimes] = useState({ beginTime: '', endTime: '' });
    const [dataQuery0, setData0] = useState([]);
    const [dataQuery1, setData1] = useState([]);
    const [dataQuery2, setData2] = useState([]);
    const [dataQuery3, setData3] = useState([]);
    const [dataQuery4, setData4] = useState([]);
    const [dataQuery5, setData5] = useState([]);
    const [dataQuery6, setData6] = useState([]);
    const [dataQuery7, setData7] = useState([]);
    const [dataQuery8, setData8] = useState([]);
    const [dataQuery9, setData9] = useState([]);

    async function loadGroups(query: any) {
        //调用接口
        const data: any = await fetchGroups(query);

        //将查询的值给第一个复选框
        if (query.targetField === "PRODUCT_ID") {
            setData0(data)
        } else if (query.targetField === "STEP_ID") {
            setData1(data)
        } else if (query.targetField === "WAFER_NO") {
            setData2(data)
        } else if (query.targetField === "LOT_ID") {
            setData3(data)
        } else if (query.targetField === "GROUP_ID") {
            setData4(data)
        } else if (query.targetField === "SCAN_TM") {
            setData5(data)
        } else if (query.targetField === "EQP_ID") {
            setData6(data)
        } else if (query.targetField === "RECIPE_ID") {
            setData7(data)
        } else if (query.targetField === "TEST_NO") {
            setData8(data)
        } else if (query.targetField === "SLOT_NUM") {
            setData9(data)
        }
    }
    //页面刷新的时候设置数据
    useMount(() => {
        //设置初始值
        query.targetField = arr[0].type;
        var data = loadGroups(query);
    });

    const [form] = Form.useForm();

    const newDict = {};
    const onFinish = async (values: any) => {
        query.scanTimeBegin += times.beginTime;
        query.scanTimeEnd += times.endTime;
        loadGroups(query)
    }

    //日历控件
    const [date, setDate] = useState<any>(['', '']);

    //将日期控件的值保存到全局变量
    const onDateChange: any = (monent: React.SetStateAction<string[]>, dateTime: string[]) => {
        setDate(monent);
        times.beginTime = dateTime[0];
        times.endTime = dateTime[1];
        setTimes(times);
    };

    //复选框
    const changeValue = (obj: any, e: any) => {
        // currentNode = obj.num;
        // console.log(currentNode + "-------")
        //当前对象被选中
        if (obj.checked == true) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === obj.id) {
                    arr.splice(i, 1);
                }
            }
            obj.val = "N";
            obj.checked = e.target.checked
        } else {
            arr[arr.length] = obj;
            obj.val = "Y";
            obj.checked = e.target.checked
        }
        //修改每一个复选框的值
        if (obj.id === "pro") {
            setCoulmn([obj, step, lot, wafer, group, scan, equip, recipe, test, slot]);
        } else if (obj.id === "step") {
            setCoulmn([pro, obj, lot, wafer, group, scan, equip, recipe, test, slot]);
        } else if (obj.id === "lot") {
            setCoulmn([pro, step, obj, wafer, group, scan, equip, recipe, test, slot]);
        } else if (obj.id === "wafer") {
            setCoulmn([pro, step, lot, obj, group, scan, equip, recipe, test, slot]);
        } else if (obj.id === "group") {
            setCoulmn([pro, step, lot, wafer, obj, scan, equip, recipe, test, slot]);
        } else if (obj.id === "scan") {
            setCoulmn([pro, step, lot, wafer, group, obj, equip, recipe, test, slot]);
        } else if (obj.id === "equip") {
            setCoulmn([pro, step, lot, wafer, group, scan, obj, recipe, test, slot]);
        } else if (obj.id === "recipe") {
            setCoulmn([pro, step, lot, wafer, group, scan, equip, obj, test, slot]);
        } else if (obj.id === "test") {
            setCoulmn([pro, step, lot, wafer, group, scan, equip, recipe, obj, slot]);
        } else if (obj.id === "slot") {
            setCoulmn([pro, step, lot, wafer, group, scan, equip, recipe, test, obj]);
        }

        // setCheckedCoulmn(arr);
        query.targetField = arr[0].type;
        loadGroups(query);
    };

    const [imgState, setImgState] = useState({ checked: true, value: "Y", type: "Img" });

    const handleChange = (obj: any, data: any) => {

        if (data != null) {

        } else {




        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === obj.id && i + 1 < arr.length) {
                query.targetField = arr[i + 1].type;
                currentNode = arr[i].num;
            }
        }
        query.existsImg = "Y";
        if (obj.type === "PRODUCT_ID") {
            query.productIds = data;
        } else if (obj.type === "STEP_ID") {
            query.stepIds = data;
        } else if (obj.type === "LOT_ID") {
            query.lotIds = data;
        } else if (obj.type === "WAFER_NO") {
            query.waferIds = data;
        } else if (obj.type === "GROUP_ID") {
            query.groupIds = data;
        } else if (obj.type === "SCAN_TM") {
            query.scanDates = data;
        } else if (obj.type === "EQP_ID") {
            query.inspectors = data;
        } else if (obj.type === "RECIPE_ID") {
            query.recipeIds = data;
        } else if (obj.type === "TEST_NO") {
            query.testIds = data;
        } else if (obj.type === "SLOT_NUM") {
            query.slotIds = data;
        }
        loadGroups(query)
    }

    return (
        <Form form={form} initialValues={newDict} onFinish={onFinish}>
            <Form.Item id="KeysValue">
                <Checkbox
                    checked={imgState.checked}
                    onChange={changeValue.bind(this, "ifImg")}
                    value={imgState.value}
                >
                    有照片
          </Checkbox>
                <DatePicker.RangePicker value={date} onChange={onDateChange} />
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="submit">OK</Button>
            </Form.Item>

            <Form.Item id="checkValues">
                {
                    coulmn.map((item, index) => (
                        <Checkbox
                            checked={item.checked}
                            onChange={changeValue.bind(this, item)}
                            value={item.val}
                        >
                            {item.name}
                        </Checkbox>
                    ))
                }
            </Form.Item>

            {arr.map((obj, index) => (
                obj.val === "Y" ?
                    <Form.Item>
                        <Divider orientation="left" plain>{obj.name}</Divider>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '10%' }}
                            placeholder="Please select"
                            onChange={handleChange.bind(this, obj)}
                        >
                            {
                                obj.num === 0 ?
                                    dataQuery0.map((data0, index) => (
                                        <Option key={index} value={data0}>{data0}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 1 ?
                                    dataQuery1.map((data1, index) => (
                                        <Option key={index} value={data1}>{data1}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 2 ?
                                    dataQuery2.map((data2, index) => (
                                        <Option key={index} value={data2}>{data2}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 3 ?
                                    dataQuery3.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }

                            {
                                obj.num === 4 ?
                                    dataQuery4.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 5 ?
                                    dataQuery5.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 6 ?
                                    dataQuery6.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 7 ?
                                    dataQuery7.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 8 ?
                                    dataQuery8.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null
                            }
                            {
                                obj.num === 9 ?
                                    dataQuery9.map((data, index) => (
                                        <Option key={index} value={data}>{data}</Option>
                                    )) : null

                            }
                        </Select>
                    </Form.Item> : null
            ))
            }

        </Form>
    );

}
export default PracticeGroup1;


