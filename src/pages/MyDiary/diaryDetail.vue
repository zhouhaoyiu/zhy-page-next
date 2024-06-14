<template>
  <!-- flex和一个水平垂直居中 h1 -->
  <q-page class="row items-center justify-evenly">
    <h1 class="text-bold">这是日记详情页，id为 {{ id }}</h1>
  </q-page>
</template>

<script lang="ts" setup>
// 从vue-router中获取参数
import { useRoute } from 'vue-router';
const $route = useRoute();
// 从$route中获取参数
const { params } = $route;
// 从params中获取id
const { id } = params;
// 打印id
console.log('id', id);
</script>

<style lang="scss" scoped></style>
