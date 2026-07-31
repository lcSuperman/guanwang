<template>
  <section class="page">
    <h1 class="page__title">关于我们</h1>
    <p class="page__text">
      我们致力于为客户提供优质的产品与服务。本页面为官网架构示例，您可以根据实际业务替换内容。
    </p>
  </section>
</template>

<style scoped>
.page__title {
  margin: 0 0 16px;
  font-size: clamp(24px, 4vw, 32px);
  color: var(--text-primary);
}

.page__text {
  margin: 0;
  max-width: 720px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
}
</style>
