<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import NeedhubMarsTopbar from './NeedhubMarsTopbar.vue'
import { needhubNavData } from '../data/needhubNavData'

const categoryLabels: Record<string, string> = {
  all: '全部',
  java: 'Java',
  frontend: '前端',
  backend: '后端',
  algorithm: '算法',
  system: '系统设计',
  project: '项目实战'
}
const activeLive = ref('all')
const activeCourse = ref('all')
const liveCategories = computed(() => ['all', ...Array.from(new Set(needhubNavData.liveList.map((item) => item.category).filter(Boolean)))])
const courseCategories = computed(() => ['all', ...Array.from(new Set(needhubNavData.courses.map((item) => item.category).filter(Boolean)))])
const filteredLives = computed(() => activeLive.value === 'all' ? needhubNavData.liveList : needhubNavData.liveList.filter((item) => item.category === activeLive.value))
const filteredCourses = computed(() => activeCourse.value === 'all' ? needhubNavData.courses : needhubNavData.courses.filter((item) => item.category === activeCourse.value))
const routes = ['前端开发', '后端开发', '算法学习', '项目实战']
const formatDate = (value: string) => value ? value.slice(0, 10) : '持续更新'
const labelFor = (value: string) => categoryLabels[value] || value
</script>

<template>
  <div class="nh-mars-shell">
    <NeedhubMarsTopbar active="learn" />

    <main class="nh-mars-page nh-learn-page">
      <section class="nh-page-heading">
        <div>
          <div class="nh-kicker">学习中心</div>
          <h1>直播录播、面试突击与学习路线</h1>
          <p>按源站公开展示内容整理，保留深色卡片、金色强调、课程标签和学习路线风格。</p>
        </div>
        <a class="nh-gold-button" :href="withBase('/needhub-nav/code-nav')">去编程导航</a>
      </section>

      <section class="nh-panel nh-route-panel">
        <div class="nh-section-title"><span>🧭 学习路线规划</span><a href="https://mars-coder.cn/roadmap" target="_blank" rel="noreferrer">源站路线 →</a></div>
        <div class="nh-route-grid">
          <article v-for="route in routes" :key="route" class="nh-route-card">
            <strong>{{ route }}</strong>
            <span>系统化路径，从入门到精通，适合按方向持续推进。</span>
          </article>
        </div>
      </section>

      <section class="nh-panel" id="live">
        <div class="nh-section-title"><span>▶ 直播录播</span><small>{{ filteredLives.length }} 条</small></div>
        <div class="nh-filter-row">
          <button v-for="category in liveCategories" :key="category" :class="{ active: activeLive === category }" @click="activeLive = category">{{ labelFor(category) }}</button>
        </div>
        <div class="nh-card-grid nh-card-grid-3">
          <article v-for="live in filteredLives" :key="live.id" class="nh-media-card">
            <img v-if="live.cover" :src="live.cover" :alt="live.title" loading="lazy" />
            <div class="nh-card-body">
              <div class="nh-card-badges"><span>{{ labelFor(live.category) }}</span><span v-if="live.memberOnly">会员免费</span></div>
              <h3>{{ live.title }}</h3>
              <p>{{ live.description }}</p>
              <footer>{{ live.duration || '录播' }} · {{ formatDate(live.liveTime) }} · {{ live.views }} 人看过</footer>
            </div>
          </article>
        </div>
      </section>

      <section class="nh-panel" id="courses">
        <div class="nh-section-title"><span>🎯 面试突击课程</span><small>{{ filteredCourses.length }} 门</small></div>
        <div class="nh-filter-row">
          <button v-for="category in courseCategories" :key="category" :class="{ active: activeCourse === category }" @click="activeCourse = category">{{ labelFor(category) }}</button>
        </div>
        <div class="nh-card-grid nh-card-grid-3">
          <article v-for="course in filteredCourses" :key="course.id" class="nh-media-card nh-course-card">
            <img v-if="course.cover" :src="course.cover" :alt="course.title" loading="lazy" />
            <div class="nh-card-body">
              <div class="nh-card-badges"><span v-if="course.isHot">热门</span><span>{{ course.chapters }} 章节</span></div>
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <div class="nh-tag-row"><span v-for="tag in course.tags" :key="tag">{{ tag }}</span></div>
              <footer>{{ course.duration }} · {{ course.learners }} 人已学 · {{ course.instructorName }}</footer>
            </div>
          </article>
        </div>
      </section>

      <section class="nh-panel">
        <div class="nh-section-title"><span>📦 学习资源</span><small>公开展示资源</small></div>
        <div class="nh-resource-grid">
          <article v-for="resource in needhubNavData.resources" :key="resource.title" class="nh-resource-card">
            <span>{{ resource.type }}</span>
            <strong>{{ resource.title }}</strong>
            <p>{{ resource.desc }}</p>
            <footer>{{ resource.category }} · {{ resource.size }} · {{ resource.downloads }} 下载</footer>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
