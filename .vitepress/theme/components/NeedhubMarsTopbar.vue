<script setup lang="ts">
import { withBase } from 'vitepress'

const props = defineProps<{
  active: 'home' | 'learn' | 'code'
}>()

const links = [
  { key: 'site', text: '首页', href: withBase('/') },
  { key: 'learn', text: '学习中心', href: withBase('/needhub-nav/learn') },
  { key: 'project', text: '项目实战', href: withBase('/needhub-nav/#orders') },
  { key: 'code', text: '编程导航', href: withBase('/needhub-nav/code-nav') },
  { key: 'private', text: '私教学习', href: withBase('/needhub-nav/learn#courses') },
  { key: 'more', text: '更多产品', href: withBase('/blog/') }
]
</script>

<template>
  <header class="nh-mars-topbar">
    <a class="nh-mars-logo" :href="withBase('/needhub-nav/')" aria-label="NeedHub 编程导航首页">
      <span class="nh-mars-planet">🪐</span>
      <span>NeedHub 编程导航</span>
    </a>

    <nav class="nh-mars-nav" aria-label="NeedHub 编程导航">
      <a
        v-for="link in links"
        :key="link.key"
        :href="link.href"
        :class="['nh-mars-nav-link', { active: (props.active === 'home' && link.key === 'site') || (props.active === 'learn' && link.key === 'learn') || (props.active === 'code' && link.key === 'code') }]"
      >
        {{ link.text }}
      </a>
    </nav>

    <div class="nh-mars-actions">
      <div class="nh-mars-search-pill">⌕ 搜索编程导航教程...</div>
      <span class="nh-mars-vip">VIP 会员</span>
      <span class="nh-mars-theme">☼</span>
      <a class="nh-mars-login" :href="withBase('/about/')">登录</a>
    </div>
  </header>
</template>
