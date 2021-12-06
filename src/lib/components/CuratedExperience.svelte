<script lang="ts">
  import { documentHelper, storeHelper } from '$lib/helpers';
  import { Experience } from '$lib/store/experience';
  import { makeLink } from '$lib/utils/link';
  import { Icon } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import { Svg } from '@smui/common/elements';
  import Item from './Item.svelte';
  import { createEventDispatcher } from 'svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';

  export let experiences: Experience[];
  export let name: string | undefined = undefined;
  export let prominent: boolean = false;
  export let vertical: boolean = false;
  export let columns: number = 4;
  let hero: Experience | undefined;
  let nonHeros: Experience[] | undefined;
  $: if (prominent && experiences.length) {
    experiences = storeHelper.getItems(experiences, 7);
    hero = experiences[0];
    if (experiences.length > 1) {
      nonHeros = experiences.slice(1);
    }
  }

  function runScript() {
    if (document.documentElement.clientWidth > 949) {
      documentHelper.handleEqualHeightItems([
        '.experiences .experiences--item.featured',
        '.experiences .experiences--list',
      ]);
    }
  }
  const dispatcher = createEventDispatcher();
  const onLike = (event: CustomEvent, experience: Experience | undefined) => {
    if (experience) {
      dispatcher('likeItem', { data: experience });
    } else {
      dispatcher('likeItem', { data: event.detail.item });
    }
  };
</script>

<svelte:window
  on:load={() => {
    runScript();
  }}
  on:resize={() => {
    runScript();
  }}
  on:scroll={() => {
    runScript();
  }}
/>

<LayoutGrid>
  <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
    {#if hero}
      <div class="experiences--item featured">
        <div class="thumbnail dark">
          <a href={makeLink('/experience', hero)}>
            <div class="image-cover" style="padding-top: calc(768/529 * 100%)">
              <BlurImage {...hero.gallery[0]} />
            </div>
          </a>
          <IconButton
            class="btn-favorite {hero.liked ? 'liked' : ''}"
            on:click={(e) => {
              onLike(e, hero);
            }}
          >
            <HeartIcon size="sm" />
            <HeartFilledIcon size="sm" />
          </IconButton>
          <div class="caption text-left">
            <p class="mt-0 text-eyebrow pl-25 pr-25">{name}</p>
            <a class="" href={makeLink('/experience', hero)}>
              <h4 class="pl-25 pr-25 text-h2 mt-20 title">
                {hero.name}
              </h4>
            </a>
          </div>
        </div>
      </div>
    {/if}
  </Cell>
  <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
    <LayoutGrid class="experiences--list m-p-0">
      {#if nonHeros?.length}
        {#each nonHeros as experience}
          <Cell spanDevices={{ desktop: 6, phone: 2 }}>
            <Item
              {...experience}
              item={experience}
              pathPrefix="/experience"
              on:likeItem={(e) => onLike(e, undefined)}
            />
          </Cell>
        {/each}
      {/if}
    </LayoutGrid>
  </Cell>
</LayoutGrid>
