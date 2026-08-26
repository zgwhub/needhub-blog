<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import NeedhubMarsTopbar from './NeedhubMarsTopbar.vue'
import { needhubNavData } from '../data/needhubNavData'

const tutorialCount = computed(() => needhubNavData.sections.reduce((sum, section) => sum + section.tutorials.length, 0))
const topSections = computed(() => needhubNavData.sections.slice(0, 6))
const topLives = computed(() => needhubNavData.liveList.slice(0, 6))
const topOrders = computed(() => needhubNavData.orders.slice(0, 6))
const hotBlogs = computed(() => needhubNavData.hotBlogs.slice(0, 6))
const formatMoney = (value: number) => `¥${value.toLocaleString('zh-CN')}`
</script>

<template>
  <div class="nh-mars-shell">
    <NeedhubMarsTopbar active="home" />

    <main class="nh-mars-page nh-home-page">
      <section class="nh-hero-grid">
        <div class="nh-hero-copy">
          <div class="nh-kicker">全栈 AI 未来趋势</div>
          <h1>NeedHub 编程导航</h1>
          <p>VibeCoding + AI 工具实战，汇总学习中心、编程导航、项目实战与技术文章，打造程序员一站式学习入口。</p>
          <div class="nh-hero-actions">
            <a class="nh-gold-button" :href="withBase('/needhub-nav/code-nav')">开始学习</a>
            <a class="nh-dark-button" :href="withBase('/needhub-nav/learn')">查看课程</a>
          </div>
        </div>

        <div class="nh-code-card">
          <div class="nh-code-dots"><span></span><span></span><span></span></div>
          <pre><code>// 欢迎来到 NeedHub 编程导航
const developer = {
  name: '你',
  skills: ['Vue', 'React', 'Java'],
  goal: '成为更好的程序员'
};

developer.learn = () => {
  console.log('每天进步一点点!');
};</code></pre>
        </div>
      </section>

      <section class="nh-stat-grid" aria-label="抓取数据概览">
        <article class="nh-stat-card"><strong>{{ needhubNavData.sections.length }}</strong><span>导航分类</span></article>
        <article class="nh-stat-card"><strong>{{ tutorialCount }}</strong><span>教程入口</span></article>
        <article class="nh-stat-card"><strong>{{ needhubNavData.liveList.length }}</strong><span>直播录播</span></article>
        <article class="nh-stat-card"><strong>{{ needhubNavData.courses.length }}</strong><span>面试课程</span></article>
      </section>

      <section class="nh-panel-grid">
        <article class="nh-panel nh-wide-panel">
          <div class="nh-section-title">
            <span>≡ 编程导航</span>
            <a :href="withBase('/needhub-nav/code-nav')">全部教程 →</a>
          </div>
          <div class="nh-mini-category-grid">
            <a v-for="section in topSections" :key="section.slug" class="nh-mini-category" :href="withBase('/needhub-nav/code-nav') + '#' + section.slug">
              <strong>{{ section.name }}</strong>
              <span>{{ section.tutorials.length }} 个教程</span>
            </a>
          </div>
        </article>

        <article class="nh-panel">
          <div class="nh-section-title">
            <span>🔥 热门文章</span>
            <a href="https://mars-coder.cn/blog" target="_blank" rel="noreferrer">源站 →</a>
          </div>
          <ol class="nh-rank-list">
            <li v-for="(blog, index) in hotBlogs" :key="blog.id">
              <b>{{ index + 1 }}</b>
              <span>{{ blog.title }}</span>
              <em>{{ blog.views }} 浏览</em>
            </li>
          </ol>
        </article>
      </section>

      <section id="courses" class="nh-panel">
        <div class="nh-section-title">
          <span>▶ 学习中心</span>
          <a :href="withBase('/needhub-nav/learn')">查看全部 →</a>
        </div>
        <div class="nh-card-grid nh-card-grid-3">
          <article v-for="live in topLives" :key="live.id" class="nh-media-card">
            <img v-if="live.cover" :src="live.cover" :alt="live.title" />
            <div class="nh-card-body">
              <div class="nh-card-badges"><span>{{ live.category || '课程' }}</span><span v-if="live.memberOnly">会员免费</span></div>
              <h3>{{ live.title }}</h3>
              <p>{{ live.description }}</p>
              <footer>{{ live.duration }} · {{ live.views }} 人看过</footer>
            </div>
          </article>
        </div>
      </section>

      <section id="orders" class="nh-panel">
        <div class="nh-section-title">
          <span>💼 热门接单项目</span>
          <a href="https://mars-coder.cn/orders" target="_blank" rel="noreferrer">查看全部 →</a>
        </div>
        <div class="nh-card-grid nh-card-grid-3">
          <article v-for="order in topOrders" :key="order.id" class="nh-order-card">
            <div class="nh-card-badges"><span>{{ order.typeName }}</span><span>{{ order.views }} 浏览</span></div>
            <h3>{{ order.title }}</h3>
            <p>{{ order.description }}</p>
            <footer><strong>{{ formatMoney(order.budget) }}</strong><span>{{ order.date }}</span></footer>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
