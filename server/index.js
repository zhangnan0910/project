import axios from 'axios'
import mockAdapter from 'axios-mock-adapter'
import data from './data.json'
import group from './group.json'
import mockList from './mockList.json'
import tree from './tree.json'
let mock = new mockAdapter(axios)

mock.onGet('/getdata').reply(200,data)
mock.onGet("/getGroup").reply(200,group)
mock.onGet("/getTable").reply(200, mockList)
mock.onGet("/gettree").reply(200, tree)
