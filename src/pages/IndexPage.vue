<template>
  <q-page class="row items-center justify-evenly">
    <example-component active></example-component>
  </q-page>
</template>

<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
