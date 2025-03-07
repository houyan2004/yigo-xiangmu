<template>
  <div class="echarts">
    <div class="zhuxingtu"></div>
    <div class="bingtu"></div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import http from "@/utils/api";
import {ElMessage, ElNotification} from "element-plus";
import * as echarts from 'echarts';

// 定义生成随机颜色的函数
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default {
  name: "ProductClassify",
  setup() {
    // 数据
    const Data = ref([
      {cateid: 1, cateName: "蔬菜豆品", prostock: 885},
      {cateid: 3, cateName: "肉禽蛋", prostock: 302},
      {cateid: 4, cateName: "料油调味", prostock: 100},
      {cateid: 5, cateName: "冻品面点", prostock: 60},
      {cateid: 6, cateName: "水产海鲜", prostock: 120},
      {cateid: 7, cateName: "水果鲜花", prostock: 400}
    ]);

    // 获取数据函数
    const getData = () => {
      http.get("/getEcharts").then(res => {
        console.log(res);
        if (res.code === 1) {
          ElMessage({
            message: `获取数据成功`,
            type: 'success',
            duration: 1000
          });
          Data.value = res.data;
          drawCharts();
        } else {
          console.log(res);
        }
      }).catch(
          err => {
            console.log(err);
            ElNotification({
              title: '请求失败',
              message: '请联系管理员',
              type: 'error',
            });
          }
      );
    };

    // 绘制图表函数
    const drawCharts = () => {
      // 绘制柱形图
      const barChart = echarts.init(document.querySelector('.zhuxingtu'));
      const xAxisData = Data.value.map(item => item.cateName);
      const yAxisData = Data.value.map(item => item.prostock);
      const barOption = {
        title: {
          text: '商品库存数量',
          left: 'center',
          textStyle: {
            color: getRandomColor(),
            textShadowColor: 'rgba(0, 0, 0, 0.5)',  // 添加文字阴影颜色
            textShadowOffsetX: 2,  // 阴影水平偏移量
            textShadowOffsetY: 2,  // 阴影垂直偏移量
            textShadowBlur: 3  // 阴影模糊程度
          }
        },
        xAxis: {
          type: 'category',
          name: '商品类别',
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          name: '库存数量',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        },
        series: [
          {
            type: 'bar',
            data: yAxisData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#87CEFA'},
                {offset: 1, color: '#00BFFF'}
              ])
            },
            label: {
              show: true,
              position: 'top',
              color: '#fff'
            }
          }
        ]
      };
      barChart.setOption(barOption);

      // 绘制饼图
      const pieChart = echarts.init(document.querySelector('.bingtu'));
      const pieOption = {
        title: {
          text: '商品库存比例',
          subtext: '按类别',
          left: 'center',
          textStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            color: getRandomColor(),
            textShadowColor: 'rgba(0, 0, 0, 0.5)',  // 添加文字阴影颜色
            textShadowOffsetX: 2,  // 阴影水平偏移量
            textShadowOffsetY: 2,  // 阴影垂直偏移量
            textShadowBlur: 3  // 阴影模糊程度
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#ccc',
            fontSize: 12
          },
          itemGap: 10,
          itemWidth: 15,
          itemHeight: 15
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: Data.value.map(item => ({
              name: item.cateName,
              value: item.prostock
            })),
            itemStyle: {
              color: function (params) {
                const colorList = ['#FFA500', '#FFC0CB', '#90EE90', '#FFFF00', '#87CEFA', '#FF69B4'];
                return colorList[params.dataIndex];
              },
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              show: true,
              formatter: '{b}: {d}%',
              color: '#fff'
            }
          }
        ]
      };
      pieChart.setOption(pieOption);
      document.querySelector('.echarts').appendChild(pieChart.getDom());
    };

    onMounted(() => {
      getData();
    });

    return {
      Data
    };
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: calc(100vh - 130px);
  background: #333;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.zhuxingtu {
  width: 50%;
  height: 100%;
}

.bingtu {
  width: 50%;
  height: 100%;
}
</style>