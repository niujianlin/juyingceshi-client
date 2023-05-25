<template>
  <div class="features-video">
    <div class="video-title">
      <p>视频监控</p>
      <img class="video-p1" src="../../../static/img/矢量智能对象拷贝3.png" />
      <img class="video-p2" src="../../../static/img/矢量智能对象拷贝2.png" />
    </div>
    <div class="container-video">
      <img src="../../../static/img/图层15.png" />
    </div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style>
.features-video {
  /* height: 300px; */
  background-color: aliceblue;
}

.video-title {
  display: grid;
  grid-template-areas: "video-p video-tools video-amplifier";
  grid-template-columns: 83% auto auto;
  padding: 5px 15px;
  background-color: #647df4;
}
.video-title p {
  grid-area: video-p;
  color: aliceblue;
  font-weight: bold;
}

.video-title .video-p1 {
  grid-area: video-tools;
  cursor: pointer;
  padding-top: 2px;
  height: 17px;
  color: white;
}

.video-title .video-p2 {
  grid-area: video-amplifier;
  padding-top: 3px;
  cursor: pointer;
  height: 15px;
}

.container-video {
  /* grid-area: video; */
  overflow: hidden;
  /* object-fit: contain; */
  border-radius: 3%;
  justify-content: center;
  align-items: center;
}

.container-video img {
  margin: 3rem 3rem;
  height: 15rem;
  width: 13rem;
  border-radius: 10px;
}
</style>