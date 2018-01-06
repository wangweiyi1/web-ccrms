function randomData() {
  return Math.round(Math.random()*1000);
}

let option = {
  title: {
    text: '客户地域分布情况',
    left: 'left'
  },
  visualMap: {
    min: 0,
    max: 2500,
    left: 'left',
    top: 'bottom',
    text: ['高','低'],           // 文本，默认为数值文本
    calculable: false,
    show:false,
  },
  series: [
    {
      name: 'iphone3',
      type: 'map',
      mapType: 'china',
      roam: false,

      data:[
        {name: '北京',value: 36175 },
        {name: '上海',value: 12876 },
        {name: '广州',value: 10864 },
        {name: '深圳',value: 8766 },
        {name: '河北',value: 5123 },
        {name: '天津',value: 4316 },
        {name: '重庆',value: randomData() },
        {name: '河南',value: randomData() },
        {name: '辽宁',value: randomData() },
        {name: '黑龙江',value: randomData() },
        {name: '湖南',value: randomData() },
        {name: '安徽',value: randomData() },
        {name: '山东',value: randomData() },
        {name: '江苏',value: randomData() },
        {name: '浙江',value: randomData() },
        {name: '江西',value: randomData() },
        {name: '湖北',value: randomData() },
        {name: '广西',value: randomData() },
        {name: '甘肃',value: randomData() },
        {name: '山西',value: randomData() },
        {name: '内蒙古',value: randomData() },
        {name: '陕西',value: randomData() },
        {name: '吉林',value: randomData() },
        {name: '福建',value: randomData() },
        {name: '贵州',value: randomData() },
        {name: '广东',value: randomData() },
        {name: '青海',value: randomData() },
        {name: '西藏',value: randomData() },
        {name: '四川',value: randomData() },
        {name: '宁夏',value: randomData() },
        {name: '海南',value: randomData() },
        {name: '香港',value: randomData() },
        {name: '澳门',value: randomData() }
      ]
    }
  ]
};
export default option;
