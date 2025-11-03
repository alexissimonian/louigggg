<script>
  export let data;
  console.log(data);
</script>

<svelte:head>
  <title>Bienvenue chez Louigggg</title>
</svelte:head>

<header class="main-header"></header>

<div class="faux-body">
  {#each data.products as product}
    <p>{product.name}</p>
    {#each product.list as l}
      <p>{l.title}</p>
      <img src={l.primary_pic} height="50px" />
    {/each}
  {/each}
</div>

<style lang="scss">
  .main-header {
    height: 80dvh;
    background-image: url("https://images.alexissimonian.net/static_louigggg_logo_main_header.png");
    background-position: center center;
    background-size: contain;
  }
</style>
