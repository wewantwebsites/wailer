<script>
  // @ts-nocheck

  // Your selected Skeleton theme:
  import './theme.postcss';
  // import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import './app.postcss';

  import { writable } from 'svelte/store';
  import {
    AppBar,
    AppRail,
    AppRailTile,
    AppShell,
  } from '@skeletonlabs/skeleton';
  import router from './router';

  const selectedRoute = writable('/');
  $: view = router.get($selectedRoute);
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <AppRail id="sidebar-left" class="hidden sm:block" selected={selectedRoute}>
      <AppRailTile label="Home" value={'/'} />
      <AppRailTile label="Something Else" value={'else'} />
      <AppRailTile label="A Different Thing" value={'thing'} />
    </AppRail>
  </svelte:fragment>
  <main class="p-5">
    <svelte:component this={view.component} title={view.title} />
  </main>
  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
