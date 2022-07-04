<script lang="ts">
  import Event from "./Events/Event.svelte";
  import { addEvent, eventList } from "../../eventsStore";
  import Modal from "../Modal/Modal.svelte";
  import EventForm from "./Events/EventForm.svelte";

  export let disable = false;
  export let current = false;
  export let date;

  let showEventFormModal = false;

  const isPortrait = false; //ToDo
  const maxEventsToShowPerDay = isPortrait ? 3 : 4;

  const isMyEvent = (when: Date) => {
    return new Date(when).toDateString() === new Date(date).toDateString();
  };

  $: myEvents = $eventList
    .filter((event) => isMyEvent(event.when))
    .sort((a, b) => a.when.getTime() - b.when.getTime());

  const handleSubmitEvent = ({ detail }) => {
    console.log("handleSubmitEvent", detail);
    addEvent({
      color: detail.color,
      description: detail.description,
      when: new Date(`${detail.dateUpdate}T${detail.when}`),
      createdAt: new Date().getTime(),
      holiday: false,
    });
  };
</script>

<section
  class="Day"
  class:Day--disable={disable}
  on:click={() => showEventFormModal = true}
>
  <h5 class:CurrentDayFlag={current}>{date.getUTCDate()}</h5>
  <section class="EventsContainer">
    {#each myEvents.slice(0, maxEventsToShowPerDay) as event}
      <Event {event} />
    {/each}
  </section>
</section>
<Modal
  visible={showEventFormModal}
  on:close={() => (showEventFormModal = false)}
>
  <EventForm
    when={date}
    on:cancel={() => (showEventFormModal = false)}
    on:submit={handleSubmitEvent}
  />
</Modal>

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
      font-weight: 500;
      font-size: small;
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
