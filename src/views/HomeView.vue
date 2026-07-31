<template>
  <section class="page">
    <div class="hero">
      <h1 class="hero__title">欢迎来到官网</h1>
      <p class="hero__desc">
        基于 Vue 3 + TypeScript + Pinia + Vite 构建的响应式官网架构，
        兼容 PC、平板与移动端展示。
      </p>
      <div class="hero__actions">
        <RouterLink to="/products" class="btn btn--primary">了解产品</RouterLink>
        <RouterLink to="/contact" class="btn btn--outline">联系我们</RouterLink>
      </div>
    </div>

    <div class="features">
      <article v-for="item in features" :key="item.title" class="feature-card">
        <h3 class="feature-card__title">{{ item.title }}</h3>
        <p class="feature-card__desc">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const features = [
  { title: 'PC 端', desc: '顶部横向导航，宽屏内容布局，适合桌面浏览。' },
  { title: '平板端', desc: '保留横向导航，自适应中等屏幕宽度。' },
  { title: '移动端', desc: '顶部汉堡按钮控制侧边菜单，默认收起节省空间。' },
]
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.hero {
  text-align: center;
  padding: 24px 0;
}

.hero__title {
  margin: 0 0 16px;
  font-size: clamp(28px, 5vw, 42px);
  color: var(--text-primary);
  line-height: 1.3;
}

.hero__desc {
  margin: 0 auto 32px;
  max-width: 560px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.hero__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 15px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.btn--primary {
  background: var(--primary);
  color: #fff;
}

.btn--primary:hover {
  background: var(--primary-hover);
}

.btn--outline {
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.btn--outline:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card-bg);
}

.feature-card__title {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--text-primary);
}

.feature-card__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
