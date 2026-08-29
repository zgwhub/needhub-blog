<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { needhubNavData } from '../data/needhubNavData'

const tutorialId = ref<number | null>(null)
const allTutorials = computed(() => needhubNavData.sections.flatMap((section) => section.tutorials.map((tutorial) => ({ ...tutorial, sectionName: section.name, sectionSlug: section.slug }))))
const tutorial = computed(() => allTutorials.value.find((item) => item.id === tutorialId.value) || allTutorials.value[0])
const related = computed(() => allTutorials.value.filter((item) => item.sectionSlug === tutorial.value.sectionSlug && item.id !== tutorial.value.id).slice(0, 10))
const iconFor = (title: string) => {
  if (/AI|Agent|智能|Claude|Codex|OpenCode/i.test(title)) return 'AI'
  if (/Python|NumPy|Pandas|SciPy|Matplotlib/i.test(title)) return 'Py'
  if (/JavaScript|Vue|React|HTML|CSS|前端/i.test(title)) return 'JS'
  if (/Java|Spring|后端/i.test(title)) return '☕'
  if (/MySQL|Redis|数据库/i.test(title)) return 'DB'
  if (/Docker|Kubernetes|Git|DevOps/i.test(title)) return '⚙'
  return '⌘'
}
const detailHref = (id: number) => withBase(`/code-nav/tutorial.html?id=${id}`)
const syncTutorialFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  const id = Number(params.get('id'))
  tutorialId.value = Number.isFinite(id) && id > 0 ? id : allTutorials.value[0]?.id || null
}
const selectTutorial = (id: number) => {
  tutorialId.value = id
  window.history.pushState({}, '', detailHref(id))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  syncTutorialFromUrl()
  window.addEventListener('popstate', syncTutorialFromUrl)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', syncTutorialFromUrl)
})
</script>

<template>
  <div class="nh-code-nav-shell nh-tutorial-shell">
    <main class="nh-tutorial-layout">
      <aside class="nh-tutorial-sidebar">
        <a class="nh-back-link" :href="withBase('/code-nav/')">← 全部教程</a>
        <div class="nh-tutorial-menu-title">☰ {{ tutorial.sectionName }}</div>
        <a
          v-for="item in related"
          :key="item.id"
          class="nh-tutorial-menu-link"
          :href="detailHref(item.id)"
          @click.prevent="selectTutorial(item.id)"
        >
          <span></span>{{ item.title.replace(/[【】]/g, '') }}
        </a>
      </aside>

      <section class="nh-tutorial-content">
        <div class="nh-tutorial-breadcrumb">
          <a :href="withBase('/code-nav/')">编程导航</a>
          <span>/</span>
          <span>{{ tutorial.sectionName }}</span>
          <span>/</span>
          <strong>{{ tutorial.title.replace(/[【】]/g, '') }}</strong>
        </div>

        <article class="nh-tutorial-intro">
          <span class="nh-tutorial-big-icon">{{ iconFor(tutorial.title) }}</span>
          <div>
            <h1>{{ tutorial.title.replace(/[【】]/g, '') }}</h1>
            <p>{{ tutorial.description || '持续整理中的编程教程入口。' }}</p>
          </div>
        </article>

        <section class="nh-embedded-panel">
          <div class="nh-embedded-toolbar">
            <strong>站内阅读</strong>
            <span>内容在当前网页内显示，不直接跳转外站。</span>
          </div>
          <iframe
            v-if="tutorial.url"
            class="nh-tutorial-frame"
            :src="tutorial.url"
            :title="tutorial.title"
            loading="lazy"
            referrerpolicy="no-referrer"
          ></iframe>
          <div v-else class="nh-frame-empty">该教程暂未配置内容地址。</div>
        </section>
      </section>
    </main>
  </div>
</template>
