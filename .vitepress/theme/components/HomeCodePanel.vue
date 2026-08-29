<template>
  <div class="nh-home-code-panel" aria-label="动态代码面板">
    <div class="nh-panel-glow"></div>

    <div class="nh-panel-window">
      <div class="nh-window-bar">
        <div class="nh-window-dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="nh-window-title">needhub.dev</div>
        <div class="nh-window-chip">Live</div>
      </div>

      <div class="nh-editor-tabs">
        <span class="active">learning.ts</span>
        <span>tools.json</span>
        <span>notes.md</span>
      </div>

      <pre class="nh-code-block"><code><span class="nh-line-number">1</span><span class="nh-code-keyword">const</span> hub = <span class="nh-code-function">createNeedHub</span>({
<span class="nh-line-number">2</span>  focus: <span class="nh-code-string">'探索 · 学习 · 分享'</span>,
<span class="nh-line-number">3</span>  topics: [<span class="nh-code-string">'Java'</span>, <span class="nh-code-string">'数据库'</span>, <span class="nh-code-string">'AI'</span>],
<span class="nh-line-number">4</span>  nav: <span class="nh-code-string">'/code-nav/'</span>
<span class="nh-line-number">5</span>})
<span class="nh-line-number">6</span>
<span class="nh-line-number">7</span><span class="nh-code-comment">// 正在生成今日学习计划...</span>
<span class="nh-line-number">8</span>{{ typedText }}<span class="nh-cursor">|</span></code></pre>

      <div class="nh-progress-card">
        <div>
          <strong>学习进度</strong>
          <span>今日已整理 4 个知识方向</span>
        </div>
        <div class="nh-progress-ring">86%</div>
      </div>
    </div>

    <div class="nh-floating-chip chip-a">AI 编程</div>
    <div class="nh-floating-chip chip-b">Java 核心</div>
    <div class="nh-floating-chip chip-c">效率工具</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const snippets = [
  "await hub.learn('JVM 深度解析')",
  "await hub.search('Redis 缓存一致性')",
  "await hub.open('/code-nav/')",
  "await hub.share('好用软件推荐')"
]

const snippetIndex = ref(0)
const charIndex = ref(0)
const deleting = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const typedText = computed(() => snippets[snippetIndex.value].slice(0, charIndex.value))

onMounted(() => {
  timer = setInterval(() => {
    const current = snippets[snippetIndex.value]

    if (!deleting.value && charIndex.value < current.length) {
      charIndex.value += 1
      return
    }

    if (!deleting.value && charIndex.value === current.length) {
      deleting.value = true
      return
    }

    if (deleting.value && charIndex.value > 0) {
      charIndex.value -= 1
      return
    }

    deleting.value = false
    snippetIndex.value = (snippetIndex.value + 1) % snippets.length
  }, 72)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.nh-home-code-panel {
  position: relative;
  width: min(100%, 520px);
  min-height: 430px;
  margin: 0 auto;
  perspective: 1200px;
}

.nh-panel-glow {
  position: absolute;
  inset: 42px 20px 14px;
  border-radius: 32px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.24), rgba(6, 182, 212, 0.08) 42%, transparent 72%);
  filter: blur(26px);
}

.nh-panel-window {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(191, 219, 254, 0.95);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow:
    0 28px 80px rgba(37, 99, 235, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  transform: rotateY(-8deg) rotateX(3deg);
  animation: panel-float 5.8s ease-in-out infinite;
}

.nh-panel-window::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.7), transparent 30%),
    radial-gradient(circle at 85% 5%, rgba(14, 165, 233, 0.16), transparent 32%);
}

.nh-window-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 18px;
  border-bottom: 1px solid #dbeafe;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
}

.nh-window-dots {
  display: flex;
  gap: 8px;
}

.nh-window-dots span {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #38bdf8;
}

.nh-window-dots span:nth-child(2) {
  background: #60a5fa;
}

.nh-window-dots span:nth-child(3) {
  background: #2563eb;
}

.nh-window-title {
  flex: 1;
  color: #475569;
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0.02em;
}

.nh-window-chip {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  color: #0f766e;
  background: #ccfbf1;
  font-size: 12px;
  font-weight: 850;
}

.nh-editor-tabs {
  position: relative;
  display: flex;
  gap: 8px;
  padding: 14px 16px 0;
}

.nh-editor-tabs span {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 12px;
  border: 1px solid #dbeafe;
  border-bottom: 0;
  border-radius: 12px 12px 0 0;
  color: #64748b;
  background: #f8fbff;
  font-size: 12px;
  font-weight: 750;
}

.nh-editor-tabs .active {
  color: #1d4ed8;
  background: #ffffff;
}

.nh-code-block {
  position: relative;
  min-height: 236px;
  margin: 0 16px;
  padding: 20px 18px;
  overflow: hidden;
  border: 1px solid #dbeafe;
  border-radius: 0 16px 16px 16px;
  color: #172033;
  background:
    linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px),
    linear-gradient(180deg, #ffffff, #f8fbff);
  background-size: 28px 28px, auto;
  font-size: 14px;
  line-height: 1.85;
  text-align: left;
  white-space: pre-wrap;
}

.nh-line-number {
  display: inline-block;
  width: 24px;
  margin-right: 12px;
  color: #94a3b8;
  user-select: none;
}

.nh-code-keyword {
  color: #2563eb;
  font-weight: 850;
}

.nh-code-function {
  color: #0891b2;
  font-weight: 850;
}

.nh-code-string {
  color: #0f766e;
}

.nh-code-comment {
  color: #64748b;
}

.nh-cursor {
  display: inline-block;
  margin-left: 2px;
  color: #2563eb;
  font-weight: 900;
  animation: cursor-blink 0.9s steps(2, start) infinite;
}

.nh-progress-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #dbeafe;
  border-radius: 18px;
  background: linear-gradient(135deg, #eff6ff, #ffffff);
}

.nh-progress-card strong,
.nh-progress-card span {
  display: block;
}

.nh-progress-card strong {
  color: #172033;
  font-size: 15px;
}

.nh-progress-card span {
  margin-top: 5px;
  color: #64748b;
  font-size: 13px;
}

.nh-progress-ring {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  color: #1d4ed8;
  background:
    radial-gradient(circle at center, #ffffff 52%, transparent 53%),
    conic-gradient(#2563eb 0 86%, #dbeafe 86% 100%);
  font-size: 13px;
  font-weight: 900;
}

.nh-floating-chip {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 13px;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  color: #1d4ed8;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 34px rgba(37, 99, 235, 0.13);
  font-size: 13px;
  font-weight: 850;
  animation: chip-float 4.6s ease-in-out infinite;
}

.chip-a {
  top: 44px;
  right: -10px;
}

.chip-b {
  top: 205px;
  left: -18px;
  animation-delay: -1.1s;
}

.chip-c {
  right: 42px;
  bottom: 2px;
  animation-delay: -2.2s;
}

@keyframes panel-float {
  0%, 100% {
    transform: rotateY(-8deg) rotateX(3deg) translateY(0);
  }
  50% {
    transform: rotateY(-4deg) rotateX(2deg) translateY(-10px);
  }
}

@keyframes chip-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

@keyframes cursor-blink {
  0%, 45% {
    opacity: 1;
  }
  46%, 100% {
    opacity: 0;
  }
}

@media (max-width: 960px) {
  .nh-home-code-panel {
    width: min(100%, 460px);
    min-height: 390px;
    margin-top: 22px;
  }

  .nh-panel-window {
    transform: none;
  }

  .nh-floating-chip {
    display: none;
  }
}
</style>
