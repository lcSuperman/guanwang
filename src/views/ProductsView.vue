<template>
  <section class="page">
    <h1 class="page__title">产品服务</h1>
    <div class="product-list">
      <article v-for="product in products" :key="product.name" class="product-card">
        <h3 class="product-card__name">{{ product.name }}</h3>
        <p class="product-card__desc">{{ product.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const products = [
  { name: '产品 A', desc: '面向企业客户的核心解决方案，稳定可靠。' },
  { name: '产品 B', desc: '轻量级工具套件，快速部署，易于集成。' },
  { name: '产品 C', desc: '数据分析平台，助力业务决策与增长。' },
]
</script>

<style scoped>
.page__title {
  margin: 0 0 24px;
  font-size: clamp(24px, 4vw, 32px);
  color: var(--text-primary);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card-bg);
}

.product-card__name {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--text-primary);
}

.product-card__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}
</style>
