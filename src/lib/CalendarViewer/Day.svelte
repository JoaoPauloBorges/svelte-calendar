<script lang="ts">
  export let disable = false;
  export let current = false;
  export let date;
</script>

<section class="Day" class:Day--disable={disable} class:Day--current={current}>
  <h5 class="CurrentDayFlag">{date.getDate()}</h5>

  <section class="RemindersContainer" />
</section>

<style lang="scss">
  .Day {
    background-color: var(--section-bg-color);
    display: block;
    padding-top: 0.2rem;
    border: solid 1px #81818130;
    margin: 0;
    &--disable {
      background-color: var(--day-disable);
    }

    &--current {
      position: relative;
    }
    &--current > .CurrentDayFlag {
      background-color: var(--secondary);
      border-radius: 50%;
      width: 2.5rem;
      height: 1.2rem;
      display: inline-block;
    }
  }

  .RemindersContainer {
      display: flex;
      flex-direction: column;
      row-gap: 2px;
      position: relative;
      width: 100%;
      align-items: center;
    }
</style>
