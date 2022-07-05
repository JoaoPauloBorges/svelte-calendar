<script lang="ts">
  import { fly } from "svelte/transition";
  import XIcon from "@svelte-parts/icons/feather/x";

  type Tplacement = "above" | "below";
  export let title: string = null;
  export let placement: Tplacement = "above";

  let visible = false;
  let targetContainer: HTMLElement;

  let popoverWidth;
  let popoverHeight;

  $: targetHeight = (targetContainer?.firstChild as HTMLElement).offsetHeight;
  $: targetWidth = (targetContainer?.firstChild as HTMLElement).offsetWidth;

  $: heightStep =
    placement == "above" ? targetHeight + 2 : popoverHeight * -1 - 2;
  $: widthStep = targetWidth / 2 - popoverWidth / 2;

  let closeTimeout;

  const handleLeave = () => {
    console.log("leave");
    closeTimeout = setTimeout(() => (visible = false), 200);
  };
  const handleEnter = () => {
    console.log("enter");
    clearTimeout(closeTimeout);
    visible = true;
  };
</script>

<section style:width="100%">
  <span
    bind:this={targetContainer}
    style:width="100%"
    style:height="100%"
    on:click|stopPropagation={() => (visible = true)}
  >
    <slot name="target" />
  </span>

  {#if visible}
    <div on:click|stopPropagation={() => (visible = false)} class="backdrop" />
    <div
      bind:offsetWidth={popoverWidth}
      bind:offsetHeight={popoverHeight}
      in:fly={{y: 50,  duration: 500 }}
      out:fly={{y:50, duration: 300 }}
      on:click|stopPropagation
      style:bottom={`${heightStep}px`}
      style:left={`${widthStep}px`}
      class="popover card"
    >
      <div class="header">
        <h3>{title}</h3>
        <div on:click|stopPropagation={() => (visible = false)}>
          <XIcon />
        </div>
      </div>
      <span style:min-width={`${targetWidth}px`} class="content">
        <slot name="content" />
      </span>
    </div>
  {/if}
</section>

<style lang="scss">
  .popover {
    box-shadow: 0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15);
    width: 100%;
    border-radius: 4px;
    position: absolute;
    padding: 1rem;
    z-index: 500;
    opacity: 100%;
    @media (max-width: 450px) {
      width: 45vw;
    }
  }
  .content {
    padding: 1rem;
  }
  .header {
    align-items: baseline;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  h3 {
    margin-top: 0;
    @media (max-width: 400px) {
      font-size: medium;
    }
  }
  .backdrop {
    position: fixed;
    z-index: 14;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
  }
</style>
