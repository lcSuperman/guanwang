<template>
  <section class="page">
    <h1 class="page__title">联系我们</h1>
    <div class="contact-info">
      <div v-for="item in contactItems" :key="item.label" class="contact-item">
        <span class="contact-item__label">{{ item.label }}</span>
        <span class="contact-item__value">{{ item.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const contactItems = [
  { label: '邮箱', value: 'contact@example.com' },
  { label: '电话', value: '400-000-0000' },
  { label: '地址', value: '某某市某某区某某路 100 号' },
]
</script>

<style scoped>
.page__title {
  margin: 0 0 24px;
  font-size: clamp(24px, 4vw, 32px);
  color: var(--text-primary);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
}

.contact-item__label {
  font-size: 13px;
  color: var(--text-muted);
}

.contact-item__value {
  font-size: 16px;
  color: var(--text-primary);
}
</style>
