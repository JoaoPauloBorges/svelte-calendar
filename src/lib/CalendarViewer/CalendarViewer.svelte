<script lang="ts">
  import Month from "./Month.svelte";

  function getWeekNames(locale = "en-US") {
    var baseDate = new Date(Date.UTC(2017, 0, 2));
    var weekDays: any[] = [];
    for (let i = 1; i <= 7; i++) {
      const weekName = baseDate.toLocaleDateString(locale, {
        weekday: "short",
      });
      weekDays.push(weekName);
      baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
  }
</script>

<section class="Section">
  <section class="Grid">
    {#each getWeekNames() as weekDay}
      <h4 class="DaysOfWeek">
        {weekDay}
      </h4>
    {/each}
    <Month />
  </section>
</section>

<style lang="scss">
  .Section {
    background-color: #f9feff;
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
    grid-template-columns: repeat(7, calc(100% / 7) + .01);
    grid-auto-rows: minmax(100px, 1fr);
    grid-template-rows: 2rem repeat(5, minmax(100px, 1fr));
    width: 100%;
    & > .Day,
    .DaysOfWeek {
      display: block;
      padding-top: 0.2rem;
      border: solid 1px #81818130;
      margin: 0;
    }

    & > .DaysOfWeek {
      padding-top: 0;
      background-color: var(--primary)
    }

    & > .Day:nth-last-child(7) {
      border-bottom-left-radius: 10px;
    }

    & > .Day:nth-last-child(1) {
      border-bottom-right-radius: 10px;
    }
  }
</style>
