<template>
  <div v-if="pageShow == 1" id="page1">
    <h1>Hello.</h1>
    <p style="font-weight: 500; font-size: 2.2em">My name is Haoyu Zhou.</p>
    <p>
      I am an independent software developer currently based in Taiyuan, Shanxi,
      China.
    </p>
    <p>
      my Chinese name is 周浩宇 (
      <a
        name=""
        href="https://fanyi.baidu.com/translate?aldtype=16047&query=%E5%91%A8%E6%B5%A9%E5%AE%87&keyfrombaidu&smartresult=dict&lang=auto2zh#zh/en/%E5%91%A8%E6%B5%A9%E5%AE%87"
        target="_blank"
        >zhōu hào yǔ</a
      >).
    </p>
    <p>
      You can visit my
      <span style="font-weight: 400; font-size: 1.2em">github</span> through
      this <a href="https://github.com/zhouhaoyiu/" target="_blank">link</a>.
    </p>
    <p>
      You can <span style="font-weight: 400; font-size: 1.2em">contact</span> me
      through this
      <a href="mailto:knight9z@vip.qq.com" target="_blank">email</a>.
    </p>
    <p>
      <!-- 谢谢你的来访 -->
      Thank you for your visit.
    </p>
  </div>
  <div v-if="pageShow == 2">
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-section>
        <div class="text-h6">Radwimps</div>
        <div class="text-subtitle2">Japanese Rock Band</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ RadWimps }}
      </q-card-section>
    </q-card>
  </div>
  <dock-wrapper id="dock">
    <dock-item v-for="i in 2" :key="i">
      <div class="item" @click="goHomePage(i)">
        {{ i }}
      </div>
    </dock-item>
  </dock-wrapper>
</template>

<script lang="ts" setup>
import 'dockbar';
import { ref } from 'vue';

let pageShow = ref(1);
const goHomePage = (i: number) => {
  pageShow.value = i;
  console.log('pageShow', pageShow);
};
const RadWimps = ref('');
RadWimps.value =
  'Radwimps (Japanese: ラッドウインプス, stylized as RADWIMPS) is a Japanese rock band, who debuted independently in 2003 and later on major label Toshiba EMI in 2005. The band\'s name, Radwimps, was formed from two English language slang terms, rad and wimp. According to the band, the coined word had several meanings, including "excellent weakling" and "superlative coward".';
</script>
<style scoped lang="scss">
#page1 {
  text-align: center;
  padding: 20px;
}
#dock {
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #ffffff 0%, #fefefe 100%);
  border-radius: 999px;
  border: 1px solid #e5e5e5;
}
.item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
}
.my-card {
  img {
    border-radius: 10 10 0 0;
    width: 100%;
    height: 200px;
  }
  width: 350px;
  height: 490px;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
