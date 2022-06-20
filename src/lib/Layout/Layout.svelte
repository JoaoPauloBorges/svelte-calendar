<script lang="ts">
  import Header from "./Header.svelte";
</script>

<Header />
<section class="content">
  <slot />
</section>

<style lang="scss">
  .content {
    margin: 20px 5%;
    @media (max-width: 800px) {
      margin: 20px 0;
    }
  }
</style>
