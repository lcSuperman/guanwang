<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__copy">&copy; {{ year }} {{ $t('common.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--footer-bg);
}

.footer__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}

.footer__copy {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}
</style>
