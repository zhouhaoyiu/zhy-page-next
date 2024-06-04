<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

defineOptions({
  name: 'MyBlog',
});

onMounted(async () => {
  await getBlogs();
});
// 登录时候获取所有的博客
async function getBlogs() {
  // const res = await fetch('http://localhost:3001/blog/getAllBlogs', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   },
  // });
  // const data = await res.json();
  // console.log(data);
  console.log('getBlogs');
}
</script>

<style lang="scss" scoped></style>
