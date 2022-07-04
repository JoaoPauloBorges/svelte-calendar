<script lang="ts">
  import Event from "./Events/Event.svelte";
  import { eventList } from "../../eventsStore";

  export let disable = false;
  export let current = false;
  export let date;

  const isPortrait = false; //ToDo
  const maxEventsToShowPerDay = isPortrait ? 3 : 4;

  const isMyEvent = (when: Date) => {
    return new Date(when).toDateString() === new Date(date).toDateString();
  };

  const myEvents = $eventList
    .filter((event) => isMyEvent(event.when))
    .sort((a, b) => a.when.getTime() - b.when.getTime());
</script>

<section class="Day" class:Day--disable={disable}>
  <h5 class:CurrentDayFlag={current}>{date.getUTCDate()}</h5>
  <section class="EventsContainer">
    {#each myEvents.slice(0, maxEventsToShowPerDay) as event}
      <Event {event} />
    {/each}
  </section>
</section>

<style lang="scss">
  .Day {
    display: block;
    position: relative;
    padding-top: 0.2rem;
    border: solid 1px #81818130;
    margin: 0;
    &--disable {
      background-color: var(--day-disable);
    }

    & .CurrentDayFlag {
      background-color: var(--primary);
      border-radius: 50%;
      width: 2.5rem;
      height: 1.2rem;
      display: inline-block;
    }

    > h5 {
      margin: 0;
      margin-bottom: 0.5rem;
    }
  }

  .EventsContainer {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    position: relative;
    width: 100%;
    align-items: center;
    margin-bottom: 0.5rem;
  }
</style>
