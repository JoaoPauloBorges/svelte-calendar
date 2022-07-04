<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let visible = false;

  const dispatch = createEventDispatcher();

  const handleBackDropClick = () => {
    visible = false;
    dispatch("close");
  };
</script>

{#if visible}
  <div transition:fade class="Backdrop" on:click|stopPropagation={handleBackDropClick}>
    <div
      transition:fly={{ duration: 500, y: 200 }}
      class="Modal"
      on:click|stopPropagation
    >
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .Modal {
    display: block;
    position: relative;
    margin: auto;
    padding: 50px 100px;
    border-radius: 10px;
    background-color: var(--section-bg-color);
    opacity: 100%;

  }

  .Backdrop {
    position: fixed;
    z-index: 15;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--modal-backdrop);
  }
</style>
