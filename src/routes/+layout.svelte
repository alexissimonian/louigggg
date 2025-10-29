<script lang="ts">
  import "../app.scss";
  import Navbar from "$lib/components/Navbar.svelte";
  let { children } = $props();
</script>

<Navbar />

{@render children?.()}
