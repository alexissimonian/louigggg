<nav>
  <div class="nav-start">
    <div><a href="/vaisselle">vaisselle</a></div>
    <div><a href="/tattoo">tattoo</a></div>
  </div>
  <div class="nav-middle">
    <div><a href="/">Louigggg</a></div>
  </div>
  <div class="nav-end">
    <div><a href="/panier">panier</a></div>
  </div>
</nav>

<style lang="scss">
  nav {
    box-sizing: border-box;
    width: 100%;
    height: $nav-height-lg;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $color-gray;
    padding: 0 $nav-padding-sides-lg;

    a {
      text-decoration: none;
      color: $color-black;
    }

    .nav-start,
    .nav-middle,
    .nav-end {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .nav-start {
      justify-content: flex-start;
      gap: $nav-items-gap;
    }

    .nav-middle {
      justify-content: center;
    }

    .nav-end {
      justify-content: flex-end;
    }
  }
</style>
