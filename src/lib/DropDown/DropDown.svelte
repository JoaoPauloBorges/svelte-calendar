<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let visible = false;

  const dispatch = createEventDispatcher();

  const handleClick = (evt) => {
    visible = false;
    dispatch("click", evt);
  };
</script>

{#if visible}
  <div class="dropdown-content" on:click={handleClick}>
    <slot/>
  </div>
{/if}

<style>
  .dropdown-content {
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
</style>
