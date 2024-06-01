<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header fixed-top header text-dark" elevated>
      <q-toolbar class="">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-bold">
          {{ title }}
        </q-toolbar-title>

        <div>Create By Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Code changes the world </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRoute } from 'vue-router';
defineOptions({
  name: 'MainLayout',
});

let title = ref('周浩宇的个人网站');
let $route = useRoute();
watch(
  () => $route.path,
  (newVal) => {
    if (newVal === '/myDiary') {
      title.value = "ZHY's 日记";
    } else if (newVal === '/myBlog') {
      title.value = "ZHY's 博客";
    } else {
      title.value = '周浩宇的个人网站';
    }
  },
  { immediate: true },
);

const linksList: EssentialLinkProps[] = [
  {
    title: "ZHY's  日记",
    caption: "ZHY's Diary",
    icon: 'book',
    link: 'myDiary',
  },

  {
    title: "ZHY's 博客",
    caption: "ZHY's Blog",
    icon: 'rss_feed',
    link: 'myBlog',
  },
  {
    title: 'Github',
    caption: "ZHY's Github",
    icon: 'code',
    link: 'https://github.com/zhouhaoyiu',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style lang="scss">
.header {
  background: transparent; /* fallback for old browsers */
  overflow: hidden;
  backdrop-filter: blur(7px);
}
</style>
