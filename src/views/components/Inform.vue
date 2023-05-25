<template>
  <div class="features-inform">
    <div class="inform-title">
      <p>通知消息</p>
      <img class="inform-p1" src="../../../static/img/矢量智能对象拷贝3.png" />
      <img class="inform-p2" src="../../../static/img/矢量智能对象拷贝2.png" />
    </div>
    <div class="inform-content">
      <div class="inform-list" v-for="value in warnList">
        <p class="inform-content-title">AI报警</p>
        <p class="inform-content-time">{{ value.time }}</p>
        <p class="inform-content-content">{{ value.content }}</p>
        <p class="inform-content-value">{{ value.current }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const warnList = ref([]);

// 路由
const router = useRouter();
const route = useRoute();

const axios = inject("axios");

onMounted(() => {
  loadWarns();
});

const loadWarns = async () => {
  let res = await axios.get("http://localhost:8080/notice/warn");
  console.log("res = ", res);
  warnList.value = res.data;
  console.log("warnlist = ", warnList);
};
</script>
  
  <style>
.inform-title {
  display: grid;
  grid-template-areas: "inform-p inform-tools inform-amplifier";
  grid-template-columns: 83% auto auto;
  padding: 5px 15px;
  background-color: #647df4;
}
.inform-title p {
  grid-area: inform-p;
  color: aliceblue;
  font-weight: bold;
}

.inform-title .inform-p1 {
  grid-area: inform-tools;
  cursor: pointer;
  padding-top: 2px;
  height: 17px;
  color: white;
}

.inform-title .inform-p2 {
  grid-area: inform-amplifier;
  padding-top: 3px;
  cursor: pointer;
  height: 15px;
}

.inform-content {
  background-color: white;
  /* border: 1px solid black; */
  padding-bottom: 40px;
}

.inform-content > div:first-child > p:first-child {
  color: red;
}

.inform-list {
  display: grid;
  grid-template-areas:
    "title time"
    "content content"
    "xxx value";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 40% auto;
  padding: 10px;
}
.inform-content {
  background-color: rgba(230, 250, 255, 0.8);
}

.inform-content-title {
  grid-area: title;
  /* color: red; */
  font-size: small;
  font-weight: 500;
}

.inform-content-time {
  grid-area: time;
  font-size: smaller;
  color: darkgrey;
  justify-self: end;
}
.inform-content-content {
  grid-area: content;
  font-size: small;
}
.inform-content-value {
  grid-area: value;
  font-size: small;
  justify-self: end;
}
</style>