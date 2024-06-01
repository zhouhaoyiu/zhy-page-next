<template>
  <div>
    <q-list>
      <!-- 日记列表 -->
      <q-item
        v-for="diary in DiaryArr"
        :key="(diary as any).id"
        clickable
        @click="$router.push('/myDiary/' + (diary as any).id)"
      >
        <q-item-section>
          <q-item-label>{{ (diary as any).title }}</q-item-label>
          <q-item-label caption>{{ (diary as any).date }}</q-item-label>
        </q-item-section>
        ></q-item
      >
    </q-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'MyDiary',
});
type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};
let DiaryArr = ref([]) as { value: Diary[] };
onMounted(() => {
  DiaryArr.value = [
    {
      id: 1,
      title: '周浩宇的第一篇日记',
      content: '今天天气不错，我很开心',
      date: '2021-10-01',
    },
    {
      id: 2,
      title: '周浩宇的第二篇日记',
      content: '今天天气不错，我很开心',
      date: '2021-10-02',
    },
    {
      id: 3,
      title: '周浩宇的第三篇日记',
      content: '今天天气不错，我很开心',
      date: '2021-10-03',
    },
  ];
});
</script>

<style lang="scss" scoped></style>
