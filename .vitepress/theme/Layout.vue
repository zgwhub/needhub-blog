<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <HomeCodePanel v-if="page.relativePath === 'index.md'" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomeCodePanel from './components/HomeCodePanel.vue'

const { page } = useData()
</script>
