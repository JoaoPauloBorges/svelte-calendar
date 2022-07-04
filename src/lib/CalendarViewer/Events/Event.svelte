<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import EditIcon from "@svelte-parts/icons/feather/edit";
  import TrashIcon from "@svelte-parts/icons/feather/trash";
  import EventForm from "./EventForm.svelte";
  import type { Event } from "../Events/Event";
  import { deleteEvent, editEvent } from "../../../eventsStore";
  export let event: Event;

  let showDetailsModal = false;
  let showEditModal = false;

  const handleSubmit = ({ detail }) => {
    console.log(detail);
    editEvent({
      ...event,
      color: detail.color,
      description: detail.description,
      when: new Date(`${detail.dateUpdate}T${detail.when}`),
    });
  };

  const handleDelete = (evt) => {
    showDetailsModal = false;
    deleteEvent(event);
  };
</script>

<button
  class="Event"
  type="button"
  style:background-color={event.color}
  on:click|stopPropagation={(e) => (showDetailsModal = true)}
>
  {event.description}
</button>

<Modal visible={showDetailsModal} on:close={() => (showDetailsModal = false)}>
  <div class="Event-details">
    <h2>{event.description}</h2>
    <div>{new Date(event.when).toString()}</div>
    <br />
    <br />
    {#if !event.holiday}
      <section class="Details-actions">
        <button type="button" on:click={() => {showEditModal = true; showDetailsModal = false}}>
          <EditIcon />
        </button>
        <button type="button" on:click={handleDelete}>
          <TrashIcon />
        </button>
      </section>
    {/if}
  </div>
</Modal>

<Modal visible={showEditModal} on:close={() => (showEditModal = false)}>
  <EventForm
    {event}
    on:cancel={() => (showEditModal = false)}
    on:submit={handleSubmit}
  />
</Modal>

<style lang="scss">
  .Event {
    color: var(--color);
    width: 95%;
    height: 1.5rem;
    padding: 0;
    padding-inline-start: 5px;
    font-size: small;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 450px) {
      width: 100%;
    }
  }

  .Details-actions {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
    & button {
      font-size: 1.5rem;
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
    }
  }
</style>
