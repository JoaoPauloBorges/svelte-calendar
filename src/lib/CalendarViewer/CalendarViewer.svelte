<script lang="ts">
  import Month from "./Month.svelte";
  import { getWeekNames } from "../Utils/Utils";
  import {
    currentDate,
  } from "../../currentDateStore";

</script>

<section class="Section">
  <section class="Grid">
    {#each getWeekNames() as weekDay}
      <h4 class="DaysOfWeek">
        {weekDay}
      </h4>
    {/each}
    <Month year={$currentDate.getFullYear()} month={$currentDate.getMonth()} />
  </section>
</section>

<style lang="scss">
  .Section {
    background-color: var(--section-bg-color);
    border-radius: 10px;
    margin: 0 auto;
    width: 80%;
    text-align: center;
    @media (max-width: 720px) {
      width: 100%;
    }
    -webkit-box-shadow: 10px 12px 15px -11px rgba(0, 0, 0, 0.2);
    box-shadow: 10px 12px 15px -11px rgba(0, 0, 0, 0.2);
  }

  .Grid {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7) + 0.01);
    grid-auto-rows: minmax(100px, 1fr);
    grid-template-rows: 2rem repeat(5, minmax(100px, 1fr));
    width: 100%;
    & > .DaysOfWeek {
      margin: 0;
      border: solid 1px #81818130;
      padding-top: 0;
      background-color: var(--primary);
    }

    & > :global(.Day:nth-last-child(7)) {
      border-bottom-left-radius: 10px;
    }

    & > :global(.Day:nth-last-child(1)) {
      border-bottom-right-radius: 10px;
    }
  }
</style>
