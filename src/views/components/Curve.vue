<template>
  <div class="features-curve">
    <div class="curve-title">
      <p>农业温室大棚</p>
      <img class="curve-p1" src="../../../static/img/矢量智能对象拷贝3.png" />
      <img class="curve-p2" src="../../../static/img/矢量智能对象拷贝2.png" />
    </div>
    <div class="curve-info" ref="chartContainer">
      <div class="my-chart" ref="chart" />
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive, onMounted } from "vue";
import ECharts from "vue-echarts";
import * as echarts from "echarts";

let chart = ref();
// let chartInstance = reactive({});

const screenAdapter = (chartInstance) => {
  // let myChart = echarts.init(chart.value);

  console.log("窗口改变");
  console.log("chartInstance = ", chartInstance);
  chartInstance.resize();
};

onMounted(() => {
  // this.getData()
  let chartInstance = echarts.init(chart.value);
  initChart(chartInstance);
  window.addEventListener("resize", () => chartInstance.resize());
});

const initChart = (chartInstance) => {
  console.log("chart = ", chart);
  console.log("chartInstance = ", chartInstance);
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    visualMap: {
      type: "piecewise",
      show: false,
      dimension: 0,
      // seriesIndex: 0,
      pieces: [
        {
          gt: 0,
          lt: 7,
          color: "rgba(0, 0, 180, 0.2)",
        },
      ],
    },
    series: [
      {
        // markLine: {
        //   symbol: ["none", "none"],
        //   label: { show: false },
        //   data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        // },
        areaStyle: {},
        data: [150, 230, 110, 21, 123, 221, 123],
        type: "line",
        smooth: true,
      },
    ],
  };
  chartInstance.setOption(option);

  // return { chartInstance };
};
</script>
  
  <style>
.features-curve {
  /* height: 300px; */
  display: grid;
  grid-template-areas:
    "curve-title"
    "curve-info";
  grid-template-rows: 1fr 6fr;
  margin: 5px;
  background-color: azure;
}

.curve-title {
  display: grid;
  grid-area: curve-title;
  grid-template-areas: "curve-p curve-tools curve-amplifier";
  grid-template-columns: 94% auto auto;
  padding: 5px 15px;
  background-color: #647df4;
}
.curve-title p {
  grid-area: curve-p;
  color: aliceblue;
  font-weight: bold;
}

.curve-title .curve-p1 {
  grid-area: curve-tools;
  cursor: pointer;
  padding-top: 2px;
  height: 17px;
  color: white;
}

.curve-title .curve-p2 {
  grid-area: curve-amplifier;
  padding-top: 3px;
  cursor: pointer;
  height: 15px;
}
.curve-info {
  grid-area: curve-info;
  /* display: grid; */
  display: flex;
  background-color: rgba(0, 128, 255, 0.042);
}
.my-chart {
  /* grid-area: 1 / 1 / 2 / 2; */
  flex: 1;
}
</style>