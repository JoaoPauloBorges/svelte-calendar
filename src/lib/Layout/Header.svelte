<script lang="ts">
  import ToggleTheme from "./ToggleTheme.svelte";
  import { currentDate, decreaseMonth, increaseMonth, resetCurrentDate } from "../../currentDateStore";
  import { getMonthName } from "../Utils/Utils";
  import LeftArrowIco from "@svelte-parts/icons/feather/arrow-left-circle";
  import RightArrowIco from "@svelte-parts/icons/feather/arrow-right-circle";
</script>

<header class="header">
  <div class="actions">
    <button on:click={() => resetCurrentDate()}> 2Day </button>
    <h2>
      {$currentDate.getFullYear()}
    </h2>
    <button on:click={() => decreaseMonth()} type="button">
      <LeftArrowIco />
    </button>
    <h3 class="Month">
      {getMonthName($currentDate.getMonth())}
    </h3>
    <button on:click={() => increaseMonth()} type="button">
      <RightArrowIco />
    </button>
  </div>
  <div class="toggleContainer"><ToggleTheme /></div>
</header>

<style lang="scss">
  .header {
    color: white;
    background-color: var(--layout-header-bg-color);
    height: 64px;
    display: flex;
    justify-content: center;
    padding: 0 30px;
    @media (max-width: 800px) {
      padding: 0 10px;
    }
  }
  .actions {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 1280px) and (min-width: 721px) {
      width: 40%;
    }
    @media (max-width: 720px) {
      width: 50%;
    }
    @media (max-width: 450px) {
      width: -webkit-fill-available;
    }
  }

  .toggleContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
