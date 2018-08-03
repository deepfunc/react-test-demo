const Router = require('koa-router');

const bizRouter = new Router();

bizRouter.post('/lines/get-list', ctx => {
    const {paging} = ctx.request.body;
    const items = [];

    for (let i = 1; i <= paging.max; i++) {
        const item = {
            id: i,
            code: `编码${i}`,
            name: `名称${i}`,
            wholeName: `完整名称${i}`,
            distance: i % 2 === 0 ? 200 : 100,
            timeCost: i % 2 === 0 ? 400 : 300,
            remark: `备注${i}`,
            lastModificationTime: '2018-03-19 17:21:24',
            lastModifierUserId: '某某'
        };
        items.push(item);
    }

    ctx.body = ctx.responseHelper.returnSuccess({items, total: 100});
});

bizRouter.post('/material/get-list', ctx => {
    const {paging} = ctx.request.body;
    const items = [];

    for (let i = 1; i <= paging.max; i++) {
        const item = {
            id: i,
            code: `编码${i}`,
            name: `名称${i}`,
            helpCode: i,
            nameEnglish: `英文名${i}`,
            materialTypeId: `类型${i}`,
            model: `规格型号${i}`,
            volume: i,
            grossWeight: i,
            weight: i,
            unit: `单位${i}`,
            barCode: i,
            remark: `备注${i}`,
            lastModificationTime: '2018-03-19 17:21:24',
            lastModifierUserId: '某某'
        };
        items.push(item);
    }

    ctx.body = ctx.responseHelper.returnSuccess({items, total: 100});
});

bizRouter.post('/material/add', async ctx => {
    ctx.body = await new Promise((resolve) => {
        setTimeout(() => resolve(ctx.responseHelper.returnSuccess({})), 1000);
    });
});

bizRouter.get('/material/get', async ctx => {
    const item = {
        id: 1,
        code: '编码1',
        name: '物料1',
        helpCode: 1,
        nameEnglish: '英文名1',
        materialTypeId: '类型1',
        model: '规格型号1',
        volume: 1,
        grossWeight: 2,
        weight: 1,
        unit: '单位1',
        barCode: 1,
        remark: '备注1',
        timestamp: '123456'
    };

    ctx.body = await new Promise((resolve) => {
        setTimeout(() => resolve(ctx.responseHelper.returnSuccess(item)), 1000);
    });
});

bizRouter.post('/material/modify', async ctx => {
    ctx.body = await new Promise((resolve) => {
        setTimeout(() => resolve(ctx.responseHelper.returnSuccess({})), 1000);
    });
});

/**
 * 关于特殊组件传递给服务器端的 value 值
 * 1.dynamicSelector
 * 单选是 string，多选是 string[]
 *
 * 2.tableSelector 和 treeSelector
 * 单选是 {value: '14F0DBDB-0E68-454F-93DE-18C499ECF0CF', text: 'DAP沈阳-海拉尔'}，多选就是数组
 *
 * 3.regionPicker
 * {codes: '420000/420100/420104', addresses: '湖北/武汉/硚口'}
 * 中间用"/"分隔，注意如果城市没有区县有街道，就会有两个分隔，如："湖北/潜江//某某街道"
 *
 * 4.dateRangeSelector
 * 返回值是 ['2018-xxxxxxx', '2018-xxxxxxx']，如果开始或结束时间没有，对应的地方就是 '' 空字符串
 */

// bizRouter.get('/services/MetaColumn/GetFilterColumns', ctx => {
//     let filterDescriptions: Array<filterColDescription> = [
//         {
//             fieldName: 'code',
//             displayName: 'Code',
//             uiType: 'text'
//         },
//         {
//             fieldName: 'validDate',
//             displayName: '生效日期',
//             uiType: 'dateRangeSelector'
//         },
//         {
//             fieldName: 'state',
//             displayName: '状态',
//             uiType: 'staticSelector',
//             options: [
//                 {name: '所有', value: '-1'},
//                 {name: '未审核', value: '1'},
//                 {name: '已审核', value: '2'}
//             ],
//             defaultValue: '-1'
//         },
//         {
//             fieldName: 'metaTableId',
//             displayName: '数据表',
//             uiType: 'dynamicSelector',
//             optionsUrl: '/api/mdm/services/Meta/GetTables',
//             optionValueFieldName: 'id',
//             optionDisplayFieldName: 'aliasName',
//             mode: 'multiple',
//         },
//         {
//             fieldName: 'weight',
//             displayName: '净重',
//             uiType: 'number'
//         },
//         {
//             fieldName: 'lineStationId',
//             displayName: '线路站点',
//             uiType: 'tableSelector',
//             tableName: 'MdmLines',
//             valueFieldName: 'id',
//             textFieldName: 'name',
//             placeholder: '请选择 线路',
//         },
//         {
//             fieldName: 'materialGroupId',
//             displayName: '物料类型',
//             uiType: 'treeSelector',
//             tableName: 'MdmMaterialGroup',
//             valueFieldName: 'code',
//             textFieldName: 'name',
//             valueFieldColTitle: '编码',
//             textFieldColTitle: '名称',
//             placeholder: '请选择 物料类型',
//             multiple: true,
//         },
//         {
//             fieldName: 'region',
//             displayName: '区域',
//             uiType: 'regionPicker',
//             level: 'street',
//             placeholder: '请选择 省/市/县区/街道'
//         },
//         {
//             fieldName: 'singleDate',
//             displayName: '单选日期',
//             uiType: 'datePicker'
//         },
//         {
//             fieldName: 'singleTime',
//             displayName: '单选时间',
//             uiType: 'timePicker'
//         },
//     ];
//
//     ctx.body = ctx.responseHelper.returnSuccess(filterDescriptions);
// });

// bizRouter.get('/services/Meta/GetTableDescForApplicationList', ctx => {
//     let result = {
//         rowKey: 'id',
//         columns: [
//             {key: 'state', name: '状态'},
//             {key: 'code', name: 'Code'},
//             {key: 'name', name: '名称'},
//             {key: 'remark', name: '备注'},
//         ]
//     };
//     for (let i = 1; i <= 4; i++) {
//         result.columns.push({key: `bizField${i}`, name: `业务字段${i}`});
//     }
//     result.columns = result.columns.concat([
//         {key: 'applicationUserName', name: '申请人'},
//         {key: 'applyTime', name: '申请时间'},
//         {key: 'auditorUserName', name: '审核人'},
//         {key: 'auditTime', name: '审核时间'},
//     ]);
//
//     ctx.body = ctx.responseHelper.returnSuccess(result);
// });

bizRouter.get('/services/Meta/GetTableDescForImportPreview', ctx => {
    let result = {
        rowKey: 'code',
        columns: [
            {key: 'code', name: 'Code'},
            {key: 'name', name: '名称'},
            {key: 'remark', name: '备注'},
        ]
    };
    for (let i = 1; i <= 8; i++) {
        result.columns.push({key: `bizField${i}`, name: `业务字段${i}`});
    }

    ctx.body = ctx.responseHelper.returnSuccess(result);
});

// bizRouter.post('/services/MetaData/GetDatas', ctx => {
//     const {tableName} = ctx.request.body;
//     const items = [];
//     for (let i = 1; i <= 10; i++) {
//         const item = {
//             id: i,
//             state: 0,
//             code: `代码${i}`,
//             name: `${tableName} 名称${i}`,
//             remark: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField1: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField2: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField3: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField4: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             applicationUserName: '某某某',
//             applyTime: '2018-03-19 17:21:24',
//             auditorUserName: undefined,
//             auditTime: undefined
//         };
//         if (i % 2 === 0) {
//             item.state = 2;
//             item.auditorUserName = '某某某';
//             item.auditTime = '2018-03-19 17:26:06';
//         }
//         items.push(item);
//     }
//
//     ctx.body = ctx.responseHelper.returnSuccess({items, totalCount: 456});
// });

// bizRouter.post('/services/MetaData/GetDatasForApplication', ctx => {
//     const {tableName} = ctx.request.body;
//     const items = [];
//     for (let i = 1; i <= 15; i++) {
//         const item = {
//             id: i,
//             state: 0,
//             code: `代码${i}`,
//             name: `${tableName} 名称${i}`,
//             remark: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField1: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField2: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField3: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField4: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             applicationUserName: '某某某',
//             applyTime: '2018-03-19 17:21:24',
//             auditorUserName: undefined,
//             auditTime: undefined
//         };
//         if (i % 2 === 0) {
//             item.state = 2;
//             item.auditorUserName = '某某某';
//             item.auditTime = '2018-03-19 17:26:06';
//         }
//         items.push(item);
//     }
//
//     ctx.body = ctx.responseHelper.returnSuccess({items, totalCount: 456});
// });

// bizRouter.get('/services/MetaData/GetColumnsOfEditor', ctx => {
//     let ColDescriptions: Array<filterColDescription> = [
//         {
//             fieldName: 'code',
//             displayName: 'Code',
//             uiType: 'text',
//             rules: [{required: true}]
//         },
//         {
//             fieldName: 'name',
//             displayName: '名称',
//             uiType: 'text',
//             rules: [{required: true}]
//         },
//         {
//             fieldName: 'validDate',
//             displayName: '生效日期',
//             uiType: 'dateRangeSelector',
//             // showTime: true
//         },
//         {
//             fieldName: 'weight',
//             displayName: '净重',
//             uiType: 'number'
//         },
//         {
//             fieldName: 'bizKind',
//             displayName: '业务类型',
//             uiType: 'staticSelector',
//             options: [
//                 {name: '类型一', value: '1'},
//                 {name: '类型二', value: '2'}
//             ],
//             defaultValue: '1',
//             rules: [{required: true}]
//         },
//         {
//             fieldName: 'materialGroupId',
//             displayName: '物料类型',
//             uiType: 'treeSelector',
//             tableName: 'MdmMaterialGroup',
//             valueFieldName: 'code',
//             textFieldName: 'name',
//             searchDataUrl: '/api/mdm/services/MetaData/GetTreeDatasWhenSearch',
//             valueFieldColTitle: '编码',
//             textFieldColTitle: '名称'
//         },
//         {
//             fieldName: 'testDate',
//             displayName: '测试日期',
//             uiType: 'datePicker'
//         }
//     ];
//
//     ctx.body = ctx.responseHelper.returnSuccess({
//         rowKey: 'id',
//         columns: ColDescriptions
//     });
// });

// bizRouter.post('/services/MetaData/ApplyAdd', ctx => {
//     ctx.body = ctx.responseHelper.returnSuccess({});
// });

// bizRouter.get('/services/MetaData/Get', ctx => {
//     const row = {
//         id: 1,
//         // timestamp: 123456,
//         code: '666',
//         name: '测试物料',
//         validDate: ['2018-03-26', '2018-04-26'],
//         weight: 18,
//         bizKind: '2',
//         materialGroupId: {value: '04.17.01.01.01', text: '电子产品类/AKG/数码/耳机/入耳式耳机'},
//         testDate: '2018-04-08'
//     };
//     ctx.body = ctx.responseHelper.returnSuccess(row);
// });

// bizRouter.post('/services/MetaData/ApplyModify', ctx => {
//     ctx.body = ctx.responseHelper.returnSuccess({});
// });

// bizRouter.get('/services/MetaData/GetNeedAuditList', ctx => {
//     const items = [];
//
//     for (let i = 1; i <= 10; i++) {
//         const item = {
//             id: i,
//             tableName: `abc${i}`,
//             tableAliasName: `表${i}`,
//             applicationKind: i % 2 === 0 ? '修改' : '新增',
//             applicationUserName: '某某某',
//             applyTime: '2018-03-19 17:21:24',
//             applicationContent: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//         };
//         items.push(item);
//     }
//
//     ctx.body = ctx.responseHelper.returnSuccess({items, totalCount: 456});
// });

// bizRouter.get('/services/MetaData/GetNeedAudit', ctx => {
//     const {id} = ctx.query;
//     const auditData: any = {
//         tableName: 'MdmMaterial',
//         tableAliasName: '物料',
//         applicationUserName: '某某某',
//         applyTime: '2018-03-19 17:21:24',
//         timestamp: '123456',
//     };
//     if (id % 2 === 1) {
//         auditData.applicationKind = '新增';
//         auditData.dataContent = [
//             {name: 'code', displayName: 'Code', value: '1'},
//             {name: 'name', displayName: '名称', value: '名称1'},
//             {name: 'materialType', displayName: '物料类型', value: '物料类型1'},
//             {name: 'field1', displayName: '字段1', value: '值1'},
//             {name: 'field2', displayName: '字段2', value: '值2'}
//         ];
//
//     } else {
//         auditData.applicationKind = '修改';
//         auditData.dataContent = [
//             {name: 'code', displayName: 'Code', value: '1'},
//             {name: 'name', displayName: '名称',  value: '名称1'},
//             {name: 'materialType', displayName: '物料类型', value: '物料类型1'},
//             {name: 'field1', displayName: '字段1', value: '值1'},
//             {name: 'field2', displayName: '字段2', value: '值1'},
//             {name: 'field3', displayName: '字段3', value: '值3'},
//             {name: 'field4', displayName: '字段4', value: '值44'},
//             {name: 'field5', displayName: '字段5', value: '值5'},
//             {name: 'field6', displayName: '字段6', value: '值66'}
//         ];
//         auditData.originalDataContent = [
//             {name: 'code', displayName: 'Code', value: '1'},
//             {name: 'name', displayName: '名称',  value: '名称11'},
//             {name: 'materialType', displayName: '物料类型', value: '物料类型11'},
//             {name: 'field1', displayName: '字段1', value: '值11'},
//             {name: 'field2', displayName: '字段2', value: '值1'},
//             {name: 'field3', displayName: '字段3', value: '值33'},
//             {name: 'field4', displayName: '字段4', value: '值444'},
//             {name: 'field5', displayName: '字段5', value: '值55'},
//             {name: 'field6', displayName: '字段6', value: '值66'}
//         ];
//     }
//
//     ctx.body = ctx.responseHelper.returnSuccess(auditData);
// });

// bizRouter.post('/services/MetaData/AcceptApply', ctx => {
//     ctx.body = ctx.responseHelper.returnSuccess({});
// });

// bizRouter.post('/services/MetaData/RefuseApply', ctx => {
//     ctx.body = ctx.responseHelper.returnSuccess({});
// });

// bizRouter.get('/services/MetaData/Import/GetTemplateUrl', ctx => {
//     ctx.body = ctx.responseHelper.returnSuccess({
//         url: 'http://10.1.100.251:9010/fms/file/DownloadByFDFS/root%2Fetms%2F%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97_%E8%B0%A2%E5%87%AF.xlsx'
//     });
// });
//
// bizRouter.get('/services/MetaData/Import/GetPreviewList', ctx => {
//     const {tableName} = ctx.query;
//     const items = [];
//     for (let i = 1; i <= 10; i++) {
//         const item = {
//             code: `代码${i}`,
//             name: `${tableName} 名称${i}`,
//             remark: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField1: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField2: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField3: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField4: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField5: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField6: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField7: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//             bizField8: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
//         };
//
//         items.push(item);
//     }
//
//     ctx.body = ctx.responseHelper.returnSuccess({items, totalCount: 456});
// });
//
// bizRouter.post('/services/MetaData/Import/ConfirmImport', ctx => {
//
//     ctx.body = ctx.responseHelper.returnSuccess({});
// });

module.exports = bizRouter;