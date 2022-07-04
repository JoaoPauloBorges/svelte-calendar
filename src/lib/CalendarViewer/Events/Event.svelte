<script lang="ts">
  import Modal from "../../Modal/Modal.svelte";
  import EditIcon from "@svelte-parts/icons/feather/edit";
  import TrashIcon from "@svelte-parts/icons/feather/trash";
  import EventForm from "./EventForm.svelte";

  export let event;

  let showDetailsModal = false;
  let showEditModal = false;
</script>

<button
  class="Event"
  type="button"
  style:background-color={event.color}
  on:click={(e) => (showEditModal = true)}
>
  {event.description}
</button>

<Modal visible={showDetailsModal} on:close={() => (showDetailsModal = false)}>
  <div class="Event-details">
    <h2>{event.description}</h2>
    <div>{new Date(event.when).toString()}</div>
    <br />
    <br />
    <section class="Details-actions">
      <button type="button">
        <EditIcon />
      </button>
      <button type="button">
        <TrashIcon />
      </button>
    </section>
  </div>
</Modal>

<Modal visible={showEditModal} on:close={() => (showEditModal = false)}>
  <EventForm {event} />
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
      border-radius: 50%;
    }
  }
</style>
