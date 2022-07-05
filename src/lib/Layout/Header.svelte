<script lang="ts">
  import ToggleTheme from "./ToggleTheme.svelte";
  import {
    currentDate,
    decreaseMonth,
    increaseMonth,
    resetCurrentDate,
  } from "../../currentDateStore";
  import { getMonthName } from "../Utils/Utils";
  import LeftArrowIco from "@svelte-parts/icons/feather/arrow-left";
  import RightArrowIco from "@svelte-parts/icons/feather/arrow-right";
</script>

<header class="header">
  <div class="actions">
    <button class="button-primary ripple reset" on:click={() => resetCurrentDate()}> 2Day </button>
    <h2 class="Year">
      {$currentDate.getUTCFullYear()}
    </h2>
    <button class="navigation ripple" on:click={() => decreaseMonth()} type="button">
      <LeftArrowIco />
    </button>
    <h3 class="Month">
      {getMonthName($currentDate.getUTCMonth())}
    </h3>
    <button class="navigation ripple" on:click={() => increaseMonth()} type="button">
      <RightArrowIco />
    </button>
  </div>
  <div class="toggleContainer"><ToggleTheme /></div>
</header>

<style lang="scss">
  .Year {
    font-size: 2.5rem;
    font-weight: normal;
  }
  .Month {
    font-size: 2rem;
    font-weight: normal;
    @media (max-width: 1280px){
      font-size: 1.5rem;
    }
  }
  .header {
    color: white;
    background-color: var(--layout-header-bg-color);
    height: 64px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .actions {
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 600px) {
      width: -webkit-fill-available;
    }
    & .navigation {
      background-color: transparent;
      border: 1px solid white;
      color: white;
      font-size: large;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      @media (max-width: 360px) {
        height: 1.8rem;
        width: 1.8rem;
      }
      @media (max-width: 300px) {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
    & .reset {
      border-radius: 2px;
      padding: 0.5rem 1rem;
      font-size: medium;
      @media (max-width: 300px) {
        padding: 0.3rem;
        padding: 0.3rem;
      }
    }
  }

  .toggleContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
