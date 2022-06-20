<script lang="ts">
  import Header from "./Header.svelte";
</script>

<section class="view">
  <Header />
  <section class="content">
    <slot />
  </section>
</section>

<style lang="scss">
  .view {
    min-height: 100vh;
    width: 100%;
  }
  .content {
    margin: 20px 5%;
    @media (max-width: 800px) {
      margin: 20px 0;
    }
  }
</style>
