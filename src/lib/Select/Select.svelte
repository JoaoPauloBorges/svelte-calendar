<script lang="ts">
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import ArrowDownIcon from "@svelte-parts/icons/feather/arrow-down";

  export let items: { value: any; label?: any; render?: any }[];
  export let selectedValue = items[0].value;
  export let defaultValue = null;
  export let classes = null;

  let selected = items[0];

  onMount(() => {
    if (!!defaultValue) {
      const item = items.find((item) => item.value === defaultValue);
      selected = item;
      selectedValue = item.value;
    }
    classes = "<sty" + "le>" + classes + "</style>";
  });

  let showOptions = false;

  const handleOptionClick = (item) => {
    showOptions = false;
    selectedValue = item.value;
    selected = item;
  };
</script>

<section class="select">
  <div
    class="selected"
    on:click={() => {
      showOptions = true;
      console.log(selectedValue);
    }}
  >
    {@html selected?.label || selected?.render}
    <ArrowDownIcon />
  </div>

  {#if showOptions}
    <div class="select-backdrop" on:click={() => (showOptions = false)} />
    <div in:fly={{ duration: 500 }} out:fly={{ duration: 100 }} class="options dropdown-content">
      {#each items as item}
        <div class="items" on:click={() => handleOptionClick(item)}>
          {@html item.label || item.render}
        </div>
      {/each}
    </div>
  {/if}
</section>

{#if !!classes}
  {@html classes}
{/if}

<style lang="scss">
  .select-backdrop {
    background-color: rgba(0, 255, 255, 0);
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
  }
  .dropdown-content {
    position: absolute;
    border-radius: 5px;
    background-color: var(--section-bg-color);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  .options {
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .items {
    padding: 5px 0;
    padding-left: 5px;

    &:hover {
      background-color: var(--secondary);
    }
  }

  .select {
    position: relative;
    width: 95%;
  }
  .selected {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    appearance: none;
    border: 1px solid;
    border-radius: 2px;
    width: inherit;
    height: 1.5rem;
    cursor: pointer;
    box-shadow: none;
    background-color: var(--section-bg-color);
  }
</style>
