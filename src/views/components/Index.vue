<template>
  <div class="features-index">
    <div class="index-title">
      <p>用户终端</p>
      <img src="../../../static/img/矢量智能对象拷贝2.png" alt="" />
    </div>
    <div class="categolary">
      <div class="nav_list">
        <div class="nav_link" @click="toggleMenu">
          <div class="nav_head">
            <span class="nav_name">门头沟产业园区</span>
            <span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
            <span v-if="!isOpen">></span>
            <img
              v-else
              src="../../../static/img/矢量智能对象.png"
              style="height: 5px"
            />
          </div>

          <ul v-if="isOpen" @click.stop>
            <!-- <a href="#" class="collapse__sublink"
              >日常大棚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线</a
            >
            <a href="#" class="collapse__sublink"
              >日常大棚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线</a
            >
            <a href="#" class="collapse__sublink"
              >日常大棚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线</a
            > -->
            <div class="jyinfo" v-for="info in jyinfoList" :key="info.fEquipID">
              <a href="#">{{ info.fEquipName }}</a>
            </div>
          </ul>
        </div>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
        <a href="#" class="nav_link">
          <span class="nav_name">门头沟产业园区</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { AdminStore } from "../../stores/AdminStore";

const jyinfoList = ref([]);

// 路由
const router = useRouter();
const route = useRoute();
const adminStore = AdminStore();

const axios = inject("axios");

onMounted(() => {
  loadInfo();
});

const isOpen = ref(false);

const loadInfo = async () => {
  console.log("adminStore=", adminStore);
  let res = await axios.get(
    "https://cloudapi.juyingiot.com/api/v1/equip/equip-type",
    { headers: { Authorization: "Bearer " + adminStore.token } }
  );
  console.log("jylist -> res = ", res);
  jyinfoList.value = res.data.data;
  console.log("jyinfoList = ", jyinfoList);
};

const toggleMenu = () => {
  // console.log("点到了");
  isOpen.value = !isOpen.value;
  // console.log("isOpen = ", isOpen);
};
</script>

<style>
ul a {
  display: block;
}

.features-index {
  /* height: 628px; */
  margin: 5px;
  background-color: aliceblue;
}

.index-title {
  display: grid;
  grid-template-areas: "index-p index-amplifier";
  grid-template-columns: 93% auto;
  padding: 5px 15px;
  background-color: #647df4;
}
.index-title p {
  grid-area: index-p;
  color: aliceblue;
  font-weight: bold;
}

.index-title img {
  grid-area: index-amplifier;
  padding-top: 3px;
  cursor: pointer;
  height: 14px;
}

.categolary {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: rgba(0, 128, 255, 0.042);
}

/* 可能有问题 */

.l-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 92px;
  /* 100%的窗口高度 */
  height: 100vh;
  background-color: #12192c;
  color: blue;
  padding: 1.5rem 1.5rem 2rem;
  /* padding: 1.5rem 1,5rem 2rem; */
  transition: 0.5s;
  z-index: 100;
}

.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 溢出隐藏 */
  overflow: hidden;
}

.nav_toggle {
  font-size: 1.25rem;
  padding: 0.75rem;
  /* 鼠标放上变小手 */
  cursor: pointer;
}

.nav_logo {
  color: blue;
  font-weight: 600;
}

.nav_link {
  display: grid;
  /* grid-template-columns: max-content max-content; */
  align-items: center;
  column-gap: 0.75rem;
  padding: 0.75rem;
  color: blue;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: 0.3s;
  cursor: pointer;
}
.nav_head .fold {
}

.nav_link ul {
  padding: 10px;
}
.nav_link ul a {
  font-size: smaller;
}

/* .nav_name {
  color: #647df4;
  font-weight: bold;
  font-size: 0.9rem;
} */

.nav_link .nav_head .nav_name {
  color: #647df4;
  font-weight: bold;
  font-size: 0.9rem;
}

.nav_link .nav_name {
  color: #12192c;
  font-size: small;
  font-weight: bold;
}

.body-pd {
  padding: 2rem 0 0 16rem;
}

/* .active {
  background-color: #0c5df4;
} */

.collapse__link {
  justify-self: flex-end;
  transition: 0.5s;
}

.collapse_menu {
  /* display: none; */
  padding: 0.75rem 2.25rem;
}

.collapse__sublink {
  color: black;
  font-size: 0.8rem;
  padding: 7px;
  display: list-item;
  text-indent: -8px;
  margin-left: 17px;
}
.collapse__sublink:hover {
  color: #647df4;
  font-weight: bolder;
  background-color: rgba(115, 152, 244, 0.362);
}
</style>