<template>
  <q-item clickable @click="goLink(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const $router = useRouter();
defineOptions({
  name: 'EssentialLink',
});

const goLink = (link: string) => {
  console.log('link', link);
  // 如果不是github链接，就跳转到对应的页面 (如果是github链接，就在新标签页打开)
  if (link.includes('github')) {
    window.open(link, '_blank');
    return;
  }

  $router.push(link);
};

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
