<script lang="ts">
  import ToggleTheme from "./ToggleTheme.svelte";
</script>

<header class="header">
    <div class="actions">
      <h2>Calendar</h2>
    </div>
    <div class="toggleContainer"><ToggleTheme /></div>
</header>

<style>
  .actions {
    display: flex;
  }
  .header {
    color: white;
    background-color: var(--layout-header-bg-color);
    height: 64px;
    display: flex;
    justify-content: space-between;
    padding: 0 1%;
  }
  .toggleContainer {
    display: flex;
    align-items: center;
  }
</style>
