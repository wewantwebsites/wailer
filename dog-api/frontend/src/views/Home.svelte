<script>
  // import { GetRandomImageUrl } from '../wailsjs/go/main/App.js';
  // import { GetBreedList } from '../wailsjs/go/main/App.js';
  // import { GetImageUrlsByBreed } from '../wailsjs/go/main/App.js';
  import {
    GetRandomImageUrl,
    GetBreedList,
    GetImageUrlsByBreed,
  } from '../../wailsjs/go/main/App.js';

  export let title = '';

  let randomImageUrl = '';
  let breeds = [];
  let photos = [];
  let selectedBreed;
  let showRandomPhoto = false;
  let showBreedPhotos = false;
  let tryAgain = false;
  function init() {
    getBreedList();
  }

  init();

  function getRandomImageUrl() {
    showRandomPhoto = false;
    showBreedPhotos = false;
    GetRandomImageUrl().then((result) => {
      randomImageUrl = result;
      showRandomPhoto = true;
    });
  }

  function getBreedList() {
    GetBreedList().then((result) => (breeds = result));
  }

  function getImageUrlsByBreed() {
    init();
    showRandomPhoto = false;
    showBreedPhotos = false;
    GetImageUrlsByBreed(selectedBreed).then((result) => {
      if (Array.isArray(result)) {
        photos = result;
        showBreedPhotos = true;
      } else {
        photos = [];
        tryAgain = true;
        setTimeout(() => {
          tryAgain = false;
        }, 3500);
      }
    });
  }
</script>

<h2>{title}</h2>
<section class="flex items-end">
  <div class="flex-none">
    <button class="btn variant-filled-primary" on:click={getRandomImageUrl}>
      Fetch a dog randomly
    </button>
  </div>

  <!-- <div class="grow"> -->
  <label class="label grow mx-5">
    <span> Click on down arrow to select a breed </span>
    <select class="select" bind:value={selectedBreed}>
      <option selected disabled>Please Select a Breed</option>
      {#each breeds as breed, idx}
        <option value={breed}>
          {breed}
        </option>
      {/each}
    </select>
  </label>
  <!-- </div> -->

  <div class="flex-none">
    <button class="btn variant-filled-primary" on:click={getImageUrlsByBreed}>
      Fetch by this breed
    </button>
  </div>
</section>

<br />
<h4 class:show={tryAgain}>Try again...</h4>
<article class:show={showRandomPhoto}>
  <img class="h-auto w-600 m-auto" src={randomImageUrl} alt="No dog found" />
</article>
<article class:show={showBreedPhotos}>
  {#each photos as photo}
    <img class="h-auto w-300" src={photo} alt="No dog found" />
  {/each}
</article>

<style>
  h4,
  article {
    display: none;
  }

  .show {
    display: block;
  }
</style>
