let Mock = require('mockjs')
let fs = require("fs")
let Random = Mock.Random;
// let mockList = Mock.mock({
//     "mockList|10":[
//         {
//             'name': () => Random.cname(),
//             'id|10000-60000': 1,
//             'code|10000-6000000':1,
//             'data': () => Random.date(),
//             'email': () => Random.email(),
//             'phone': /^1[39785]\d{9}/,
//             'org|1': ["工程维护部本部",
//                 "黄永璋组",
//                 "企业营销",
//                 "专网事业部",
//                 "资产管理部",
//                 "电信通行政部",
//                 "人事行政部",
//                 "财务部",
//                 "电信通帐务部",
//                 "法务部"],
//             'forg|1':[
//                 "电信通后台2部",
//                 "教育业务部",
//                 "北京电信通电信工程有限公司",
//                 "北京电信通电信工程有限公司",
//                 "电信通后台1部",
//                 "北京电信通电信工程有限公司",
//                 "电信通后台1部",
//                 "电信通后台1部",
//                 "北京电信通电信工程有限公司",
//                 "电信通后台1部"
//             ]
//         }
//     ]
// })
// fs.writeFile('mockList.json', JSON.stringify(mockList))
let tree = Mock.mock({
    "tree|5": [
        {
            'label|1': [
                "应用菜单树",
                "我的工作",
                "客户管理",
                "计费账务",
                "考核"
            ],
            children: [{
                label: '组织权限管理',
                children: [{
                    'label|1': [
                        "员工账号管理",
                        "工作组菜单",
                        "菜单管理",
                        "角色管理",
                        "用户管理"
                    ]
                }]
            }]
        }
    ]
})
fs.writeFile('tree.json', JSON.stringify(tree))