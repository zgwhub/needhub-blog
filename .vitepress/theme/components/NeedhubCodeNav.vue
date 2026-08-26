<script setup lang="ts">
import { computed, ref } from 'vue'
import NeedhubMarsTopbar from './NeedhubMarsTopbar.vue'
import { needhubNavData } from '../data/needhubNavData'

const query = ref('')
const activeSlug = ref(needhubNavData.sections[0]?.slug || '')
const sidebarSections = computed(() => needhubNavData.sections)
const filteredSections = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return needhubNavData.sections
  return needhubNavData.sections
    .map((section) => ({
      ...section,
      tutorials: section.tutorials.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(keyword))
    }))
    .filter((section) => section.tutorials.length > 0)
})
const totalFiltered = computed(() => filteredSections.value.reduce((sum, section) => sum + section.tutorials.length, 0))
const iconFor = (title: string) => {
  if (/AI|Agent|智能|Claude|Codex|OpenCode/i.test(title)) return 'AI'
  if (/Python|NumPy|Pandas|SciPy|Matplotlib/i.test(title)) return 'Py'
  if (/JavaScript|Vue|React|HTML|CSS|前端/i.test(title)) return 'JS'
  if (/Java|Spring|后端/i.test(title)) return '☕'
  if (/MySQL|Redis|数据库/i.test(title)) return 'DB'
  if (/Docker|Kubernetes|Git|DevOps/i.test(title)) return '⚙'
  return '⌘'
}
const scrollToSection = (slug: string) => {
  activeSlug.value = slug
  document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="nh-mars-shell">
    <NeedhubMarsTopbar active="code" />

    <main class="nh-mars-page nh-code-page">
      <aside class="nh-code-sidebar">
        <button class="nh-code-all" @click="scrollToSection(sidebarSections[0]?.slug || '')">☰ 全部教程</button>
        <button
          v-for="section in sidebarSections"
          :key="section.slug"
          :class="['nh-code-side-link', { active: activeSlug === section.slug }]"
          @click="scrollToSection(section.slug)"
        >
          <span>↗</span>{{ section.name }}
        </button>
      </aside>

      <section class="nh-code-content">
        <div class="nh-code-search">
          <input v-model="query" type="search" placeholder="搜索教程名称或简介..." />
          <span v-if="query">命中 {{ totalFiltered }} 条</span>
        </div>

        <div class="nh-code-board">
          <section v-for="section in filteredSections" :id="section.slug" :key="section.slug" class="nh-code-section">
            <h2>≡ {{ section.name }}</h2>
            <div class="nh-code-card-grid">
              <a
                v-for="tutorial in section.tutorials"
                :key="tutorial.id"
                class="nh-tutorial-card"
                :href="tutorial.url"
                target="_blank"
                rel="noreferrer"
              >
                <span class="nh-tutorial-icon">{{ iconFor(tutorial.title) }}</span>
                <span class="nh-tutorial-copy">
                  <strong>{{ tutorial.title }}</strong>
                  <small>{{ tutorial.description || '持续整理中的编程教程入口。' }}</small>
                </span>
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>
