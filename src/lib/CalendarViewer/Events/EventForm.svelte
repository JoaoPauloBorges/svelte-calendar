<script lang="ts">
  import EditIcon from "@svelte-parts/icons/feather/edit";
  import SaveIcon from "@svelte-parts/icons/feather/save";
  import CancelIcon from "@svelte-parts/icons/feather/x";
  import { createEventDispatcher, onMount } from "svelte";
  import { Colors } from "./colors.enum";
  import Select from "../../Select/Select.svelte";
  import type { Event } from "./Event";

  const dispatch = createEventDispatcher();
  export let event: Event = null;
  export let when: Date = null;
  const colors = Object.values(Colors);

  let formValues = !!event
    ? {
        color: event.color,
        description: event.description,
        dateUpdate: new Date(event.when).toISOString().split("T")[0],
        when: new Date(event.when).toLocaleTimeString("pt-BR").slice(0, 5),
      }
    : {
        color: Colors.COLOR2,
        dateUpdate: new Date(when).toISOString().split("T")[0],
      };

  let form;

  const handleSubmitButton = () => {
    if (form.checkValidity()) {
      dispatch("cancel", formValues);
    }
  };
</script>

<h2>
  {new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    when || event?.when
  )}
</h2>
<form
  bind:this={form}
  on:submit|preventDefault={() => dispatch("submit", formValues)}
>
  <div class="field">
    <label for="description">
      <EditIcon />
    </label>
    <input
      bind:value={formValues.description}
      placeholder="Description"
      type="text"
      name="description"
      id="description"
      required
    />
  </div>

  {#if event}
    <input
      bind:value={formValues.dateUpdate}
      type="date"
      name="dateUpdate"
      required
      on:keydown|preventDefault
    />
  {/if}
  <input
    type="time"
    bind:value={formValues.when}
    name="when"
    required
    on:keydown|preventDefault
  />

  <Select
    defaultValue={formValues.color}
    bind:selectedValue={formValues.color}
    classes={`.ColorOption {
        content: "";
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: block;
    }`}
    items={colors.map((color) => ({
      value: color,
      render: `<span class=ColorOption style="background-color: ${color};" />`,
    }))}
  />

  <section class="form-actions">
    <button type="submit" on:click={handleSubmitButton}>
      <SaveIcon />
    </button>
    <button type="button" on:click={() => dispatch("cancel")}>
      <CancelIcon />
    </button>
  </section>
</form>

<style lang="scss">
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  .field {
    display: flex;
    align-items: center;
  }

  label {
    padding: 0 0.5rem;
  }
  input {
    text-align: center;
    font-size: large;
    width: 100%;
    height: 2rem;
    border-radius: 2px;
    background-color: var(--section-bg-color);
    color: var(--color);
    border: 1px solid var(--color);
  }

  input[type="date"],
  input[type="time"] {
    position: relative;
  }
  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    position: absolute;
    width: 100%;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    left: 10px;
  }

  input:placeholder-shown {
    font-style: italic;
  }

  input:invalid {
    border: 1px solid rgb(211, 29, 60);
    box-shadow: 6px 5px 15px -7px red;
  }

  .form-actions {
    margin-top: 1rem;
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
