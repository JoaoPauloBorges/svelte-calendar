<script lang="ts">
  import CalendarViewer from "./lib/CalendarViewer/CalendarViewer.svelte";
  import Layout from "./lib/Layout/Layout.svelte";
  import "./Themes.scss";
</script>

<main>
  <Layout>
    <CalendarViewer />
  </Layout>
</main>

<style>
  main {
    width: 100%;
  }
</style>
