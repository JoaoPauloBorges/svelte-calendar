<script lang="ts">
  import { onMount } from "svelte";
  import SunIcon from "@svelte-parts/icons/feather/sun";
  import MoonIcon from "@svelte-parts/icons/feather/moon";

  let isDark;
  function toggle() {
    isDark = window.document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("darkTheme", isDark.toString());
  }

  onMount(() => {
    isDark = localStorage.getItem("darkTheme") === "true";
    if (isDark) window.document.documentElement.classList.add("dark-mode");
  });
</script>

<button type="button" class="button__primary" on:click={toggle}>
  {#if isDark}
    <SunIcon />
  {:else}
    <MoonIcon />
  {/if}</button
>

<style lang="scss">
  button {
    margin-left: 3rem;
    font-size: large;
    height: 2rem;
    width: 2rem;

    @media (max-width: 450px) {
      margin-left: 1rem;
    }

    @media (max-width: 300px) {
      font-size: medium;
      margin-left: 1rem;
      height: 1.5rem;
      width: 1.5rem;
    }
  }
</style>
