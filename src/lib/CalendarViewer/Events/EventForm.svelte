<script lang="ts">
  import EditIcon from "@svelte-parts/icons/feather/edit";
  import { beforeUpdate, createEventDispatcher, onMount } from "svelte";
  import { Colors } from "./colors.enum";
  import Select from "../../Select/Select.svelte";
  import type { Event } from "./Event";
  
  export let event: Event;

  const dispatch = createEventDispatcher();

  const colors = Object.values(Colors);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ event });
    dispatch("submit", event);
  };

  let formValues = {
    color: Colors.COLOR2
  } as any

  onMount(() => {
    if(event) {
      formValues = {
        ...formValues,
        description: event.description,
        dateUpdate: new Date(event.when).toISOString().split('T')[0],
        color: event.color,
        when: new Date(event.when).toLocaleTimeString('pt-BR').slice(0, 5),
      }
    }
  })
</script>

<form on:submit|preventDefault={handleSubmit}>
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
  <input type="time" bind:value={formValues.when} name="when" required on:keydown|preventDefault on:change={(e) => console.log('when',formValues.when)}/>

  <Select
    defaultValue={formValues.color}
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
</style>
