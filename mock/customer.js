const Mock = require('mockjs')

var Random = Mock.Random

Random.extend({
  cabinet: function(data){
    var arr = ['防火防磁柜','电源柜','监控柜','屏蔽柜','安全柜','多媒体控制台','文件柜','壁挂柜'];
    return this.pick(arr)
  }
});

const data = Mock.mock({
  'items|10': [{
    'id': '@id',
    'customerNo|1-1000': 100,
    'customerName': '@cname',
    'customerContactInformation': '17671756211',
    'customerLevel|1-10': 1
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/customer/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/cabinet/list',
    type: 'get',
    response: config => {
      const items = Mock.mock({
        'items|10':[{
          'id':'@id',
          'cabinetNo|1-1000':100,
          'powerRate':200,
          'cabinetType':'@cabinet',
          'cabinetCapacity':'100L',
          'pduId':111
        }]
      }).items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]