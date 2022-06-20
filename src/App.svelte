<script lang="ts">
  import CalendarViewer from "./lib/CalendarViewer/CalendarViewer.svelte";
  import Layout from "./lib/Layout/Layout.svelte";
  import "./Themes.scss";
  import { isDocumentBiggerThanView } from "./lib/Utils/Utils";
  import { increaseMonth, decreaseMonth } from "./currentDateStore";
  import throttle from "just-throttle";

  const handleWheel = throttle((event: WheelEvent) => {
    if (
      event.ctrlKey === true ||
      event.shiftKey === true ||
      (!(event as any).target?.classList.value.includes("view") &&
        !(event as any).target?.classList.value.includes("content") &&
        !(event as any).target?.classList.value.includes("Day"))
    ) {
      return;
    }

    if (isDocumentBiggerThanView()) {
      return;
    }

    if (event.deltaY > 0) {
      return increaseMonth();
    }
    decreaseMonth();
  }, 400);
</script>

<svelte:window on:wheel={handleWheel} />

<main>
  <Layout>
    <CalendarViewer />
  </Layout>
</main>

<style>
  main {
    width: 100%;
  }
</style>
