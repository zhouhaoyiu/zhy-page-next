<template>
  <div>
    <!-- 最大高度 -->
    <q-list no-border padding v-if="DiaryArr" class="q-mb-md text-weight-bold">
      <!-- 日记列表 -->
      <q-item
        v-for="diary in DiaryArr"
        :key="(diary as any).id"
        clickable
        @click="$router.push('/diaryDetail/' + (diary as any).id)"
      >
        <q-item-section>
          <q-item-label class="text-h5">{{
            (diary as any).title
          }}</q-item-label>
          <q-item-label caption>{{ (diary as any).date }}</q-item-label>
        </q-item-section>
        >
      </q-item>
    </q-list>

    <q-pagination
      v-model="current"
      max="5"
      direction-links
      flat
      color="grey"
      active-color="primary"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'MyDiary',
});
interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}
let current = ref(1);
let DiaryArr = ref([]) as { value: Diary[] };

onMounted(() => {
  // 模拟数据 重复100条
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
