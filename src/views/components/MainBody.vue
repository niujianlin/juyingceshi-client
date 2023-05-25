<template>
  <div class="features-main">
    <div class="main-title">
      <p>农业温室大棚</p>
      <img class="main-p1" src="../../../static/img/矢量智能对象拷贝3.png" />
      <img class="main-p2" src="../../../static/img/矢量智能对象拷贝2.png" />
    </div>
    <div class="main-info">
      <p>AI输入</p>
      <div class="box1">
        <div class="info-list" v-for="value in infoList">
          <p class="info-list-p1">{{ value.name }}</p>
          <img
            class="info-list-p2"
            src="../../../static/img/矢量智能对象拷贝13.png"
            alt=""
          />
          <p class="info-list-p3">{{ value.value }}</p>
          <!-- <p class="info-list-p4">{{ value.level }}</p> -->
        </div>
      </div>
      <p>DI输入</p>
      <div class="box2">
        <div class="box2-1">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
        <div class="box2-2">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
        <div class="box2-3">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
        <div class="box2-4">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
        <div class="box2-5">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
        <div class="box2-6">
          <img class="DI-img" src="../../../static/img/图层17拷贝.png" alt="" />
          <p class="DI-p">DI-1未连接</p>
        </div>
      </div>
      <p>DO输入</p>
      <div class="box3">
        <div class="box3-1">
          <p>DO-1</p>
        </div>
        <div class="box3-2">
          <p>DO-1</p>
        </div>
        <div class="box3-3">
          <p>DO-1</p>
        </div>
        <div class="box3-4">
          <p>DO-1</p>
        </div>
        <div class="box3-5">
          <p>DO-1</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const infoList = ref([]);

// 路由
const router = useRouter();
const route = useRoute();

const axios = inject("axios");

onMounted(() => {
  loadInfo();
});

const loadInfo = async () => {
  let res = await axios.get("http://localhost:8080/state/greenhouse");
  console.log("infolist -> res = ", res);
  infoList.value = res.data;
  // console.log("infoList = ", infoList);
};
</script>
  
  <style>
.features-main {
  /* height: 628px; */
  margin: 5px;
  background-color: aliceblue;
}

.main-title {
  display: grid;
  grid-template-areas: "main-p main-tools main-amplifier";
  grid-template-columns: 94% auto auto;
  padding: 5px 15px;
  background-color: #647df4;
}
.main-title p {
  grid-area: main-p;
  color: aliceblue;
  font-weight: bold;
}

.main-title .main-p1 {
  grid-area: main-tools;
  cursor: pointer;
  padding-top: 2px;
  height: 17px;
  color: white;
}

.main-title .main-p2 {
  grid-area: main-amplifier;
  padding-top: 3px;
  cursor: pointer;
  height: 15px;
}

.main-info {
  background-color: rgba(0, 128, 255, 0.042);
}
.main-info > p {
  padding: 10px;
  font-weight: bold;
  color: cornflowerblue;
}

.main-info .box1 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* border-bottom: 1px solid #a9a9a9; */
}

.box1 .info-list:not(:last-child) {
  padding-left: 5px;
  display: grid;
  grid-template-areas:
    "region pic"
    "num num";
  grid-template-columns: 50% auto;
  grid-template-rows: 60% auto;

  /* width: 15%; */
  border-right: 1px solid #a9a9a9;
}

.box1 .info-list:last-child {
  padding-left: 5px;
  display: grid;
  grid-template-areas:
    "region pic"
    "num num";
  grid-template-columns: 50% auto;
  grid-template-rows: 60% auto;
}

.info-list-p1 {
  grid-area: region;
  font-weight: bold;
  font-size: small;
}
.info-list-p2 {
  grid-area: pic;
}
.info-list-p3 {
  grid-area: num;
  color: #ff7f00;
  font-weight: bold;
  font-size: large;
  grid-column: span 2; /* 元素跨越两列 */
  justify-self: center;
}

.main-info .box2 {
  display: grid;
  grid-template-areas: "box2-1 box2-2 box2-3 box2-4 box2-5 box2-6";
  padding: 10px;
}

.main-info .box2 img {
  height: 60%;
}

.box2-1 {
  grid-area: box2-1;
  border-right: 1px solid #a9a9a9;

  justify-content: center;
  display: inherit;
  align-items: center;
}
.box2-2 {
  grid-area: box2-2;
  border-right: 1px solid #a9a9a9;
  justify-content: center;
  display: inherit;
  align-items: center;
}
.box2-3 {
  grid-area: box2-3;
  border-right: 1px solid #a9a9a9;
  justify-content: center;
  display: inherit;
  align-items: center;
}
.box2-4 {
  grid-area: box2-4;
  border-right: 1px solid #a9a9a9;

  justify-content: center;
  display: inherit;
  align-items: center;
}
.box2-5 {
  grid-area: box2-5;
  border-right: 1px solid #a9a9a9;
  justify-content: center;
  display: inherit;
  align-items: center;
}
.box2-6 {
  grid-area: box2-6;
  /* border-right: 1px solid #a9a9a9; */
  justify-content: center;
  display: inherit;
  align-items: center;
}

.main-info .box3 {
  display: grid;
  grid-template-areas: "box3-1 box3-2 box3-3 box3-4 box3-5 box3-6";
  grid-template-rows: repeat(5, 1fr);
  justify-content: space-around;
}

.box3-1 {
  grid-area: box3-1;
}
.box3-2 {
  grid-area: box3-2;
}
.box3-3 {
  grid-area: box3-3;
}
.box3-4 {
  grid-area: box3-4;
}
.box3-5 {
  grid-area: box3-5;
}
.box3-6 {
  grid-area: box3-6;
}
</style>