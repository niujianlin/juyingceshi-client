<template>
  <header class="header">
    <div class="header-logo">
      <img src="../../../static/img/logo3.png" alt="" style="height: 40px" />
    </div>
    <div class="header-title">
      <p>智能大棚控制系统</p>
    </div>
    <div class="header-nav">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">监控地图</a></li>
        <li><a href="#">系统总览</a></li>
        <li><a href="#">设备监控</a></li>
        <li><a href="#">控制台</a></li>
      </ul>
    </div>
    <div class="header-weather">
      <img src="../../../static/img/天气.png" alt="" />
      <p>北京，25°C |</p>
    </div>
    <div class="header-time">
      <p>2021年8月18日 9:49</p>
    </div>
    <div class="header-user">
      <div class="renyuan">
        <img src="../../../static/img/人员(3).png" alt="" />
      </div>
      <p>张某某</p>
      <a href="#">&lt;</a>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  width: 100vw;
  height: 65px;
  display: grid;
  grid-template-areas: "logo title nav weather time user";
  padding: 0 40px;
  grid-template-columns: 1fr 2fr 3fr 1fr 1fr auto;
  align-items: center;
  /* position: relative; */
  z-index: 200;
  background-color: blue;
  /* background-image: url("../../../static/img/图层4拷贝.png"); */
  background-position: center; /* 将图片在容器中居中对齐 */
}
ul {
  flex: 1;
  height: inherit;
}

ul > li {
  display: inline-grid;
  padding: 5px;
  height: inherit;
  align-items: center;
}
ul > li > a {
  color: aliceblue;
}
.header-logo {
  grid-area: logo;
  font-size: 24px;
  font-weight: bold;
}

.header-title {
  grid-area: title;
  padding-left: 20px;
  color: aliceblue;
}
.header-title p {
  font-size: 25px;
  font-weight: 700;
}
.header-nav {
  grid-area: nav;
  /* flex: 1; */
  display: flex;
  height: 100%;
}

.header-weather {
  display: grid;
  grid-template-areas: "weather-img weather-p";
  grid-template-rows: 20% auto;
  grid-area: weather;
}

.header-weather p {
  grid-area: weather-p;
  color: aliceblue;
  font-weight: bold;
  padding-top: 10px;
}

.header-weather img {
  grid-area: weather-img;
  height: 35px;
}

.header-time {
  grid-area: time;
  padding-top: 5px;
}
.header-time p {
  color: aliceblue;
  font-size: small;
  font-weight: bold;
}

.header-user {
  grid-area: user;
  display: grid;
  grid-template-areas: "user-img user-p user-jiantou";
  /* grid-template-rows: 95% auto auto;*/
}

.header-user .renyuan {
  grid-area: user-img;
  display: flex;
  height: 25px;
  justify-content: center;
  align-items: center;
  width: 28px;
  /* padding-top: 5px; */
  background-color: aliceblue;
  border-radius: 30px;
}
.header-user img {
  height: 16px;
}
.header-user p {
  grid-area: user-p;
  display: inline-block;
  color: aliceblue;
  padding-top: 5px;
}
.header-user a {
  grid-area: user-jiantou;
  padding: 5px;
  color: aliceblue;
  /* padding-left: 20px; */
  transform: rotate(-90deg);
}

.header-nav ul li:hover {
  background-color: #647df4;
}
</style>