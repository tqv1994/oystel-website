<script lang="ts">
  import { documentHelper, storeHelper } from '$lib/helpers';
  import type { Experience } from '$lib/store/experience';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import Item from './Item.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import Masonry from './Masonry.svelte';
  import { updateTravellerMeStore } from '$lib/store/traveller';
  import { ppatch } from '$lib/utils/fetch';
  import { session } from '$app/stores';
  import { actionLike } from './LikeAction.svelte';
  import type { Kind } from '$lib/store/category';
  import FeaturedImage from './FeaturedImage.svelte';

  export let experiences: Experience[];
  export let name: string | undefined = undefined;
  export let prominent = false;
  export let vertical = false;
  export let columns = 4;
  export let subtitle = 'Featured Experience';
  export let index: number;
  export let cities: Kind[] = [];
  let hero: Experience | undefined;
  let nonHeros: Experience[] | undefined;
  let aspectRatioCount = 0;
  let useSquareAspectRatio = true;
  $: if (prominent && experiences.length) {
    hero = experiences[0];
    if (experiences.length > 1) {
      nonHeros = experiences.slice(1);
    }
    session.subscribe((s) => {
      if (s.user && s.travellerMe && hero) {
        const indexExist = (s.travellerMe.experienceLikes || []).findIndex(
          (itemExperience) =>
            hero.id.toString() === itemExperience.id.toString(),
        );
        if (indexExist < 0) {
          hero.liked = false;
        } else {
          hero.liked = true;
        }
      }
    });
  }

  function runScript() {
    if (document.documentElement.clientWidth > 949) {
      documentHelper.handleEqualHeightItems([
        `.experiences.experiences-${index} .experiences--item.featured`,
        `.experiences.experiences-${index} .experiences--list`,
      ]);
    }
  }
  const onLike = (event: CustomEvent, experience: Experience | undefined) => {
    return actionLike(async () => {
      try {
        const res = await ppatch('travellers/me', {
          experienceLikes: processItemLikeIds(
            hero.id.toString(),
            $session.travellerMe?.experienceLikes || [],
          ),
        });
        if (res.ok) {
          updateTravellerMeStore(await res.json());
        } else {
          window.pushToast('An error occurred');
        }
      } catch (error) {
        console.error(error);
      }
    }, $session);
  };
  const assignAspectRatio = (index) => {
    if (index > 0) {
      if (aspectRatioCount === 2) {
        useSquareAspectRatio = !useSquareAspectRatio;
        aspectRatioCount = 0;
      }
      aspectRatioCount++;
    } else {
      useSquareAspectRatio = !useSquareAspectRatio;
      return 'square';
    }
    return useSquareAspectRatio ? 'square' : 'portrait';
  };

  const processItemLikeIds = (id: string, items: Experience[]) => {
    const itemIds: string[] = items.map((item) => item.id.toString());
    const indexExist = itemIds.findIndex((item) => item === id);
    if (indexExist < 0) {
      itemIds.push(id);
    } else {
      itemIds.splice(indexExist, 1);
    }
    return itemIds;
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

<LayoutGrid class="pl-0 pr-0">
  <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
    {#if hero}
      <div class="experiences--item featured sticky-section">
        <div class="thumbnail dark">
          <a href={makeLink('/experiences', hero)}>
            <FeaturedImage
              image={(hero.gallery || []).length > 0 ? hero.gallery[0] : undefined}
              class="m-none"
              size="medium"
              alt={hero?.name || ''}
            />
            <FeaturedImage
              image={(hero.gallery || []).length > 0 ? hero.gallery[0] : undefined}
              class="m-block d-none"
              size="medium"
              alt={hero?.name || ''}
            />
            <IconButton
              class="btn-favorite {hero.liked ? 'liked' : ''}"
              on:click={onLike}
            >
              <HeartIcon size="sm" />
              <HeartFilledIcon size="sm" />
            </IconButton>
            <div class="caption text-left">
              <p class="m-0 text-eyebrow pl-25 pr-25">{subtitle}</p>
              <a class="" href={makeLink('/experiences', hero)}>
                <h3 class="pl-25 pr-25 m-mt-10 d-mt-20 d-mb-30 m-mb-20 title">
                  {hero.name}
                </h3>
              </a>
            </div>
          </a>
        </div>
      </div>
    {/if}
  </Cell>
  <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
    {#if nonHeros?.length}
      <Masonry gridGap="0" colWidth="50%" items={nonHeros}>
        {#each nonHeros as experience, i}
          <div class="curated-item item-{assignAspectRatio(i)}">
            <Item item={experience} pathPrefix="/experiences" {cities} />
          </div>
        {/each}
      </Masonry>
    {/if}
  </Cell>
</LayoutGrid>

<style lang="scss">
  @use '../../style/include/grid';
  @use '../../theme/mixins';

  .experiences--item.featured {
    @include mixins.desktop {
      position: sticky;
      top: 104px;
      left: 0;
    }
    .image-cover {
      padding-top: calc(100vh - 88px - 32px);
      @media screen and (min-width: 1921px) {
        padding-top: 65vh;
      }
      @media screen and (min-width: 2561px) {
        padding-top: 50vh;
      }
    }

    .title {
      height: 30px;
      font-size: 32px;
      overflow: hidden;
      @include mixins.mobile {
        height: 25px;
        font-size: 20px;
      }
    }
    :global(.thumbnail .btn-favorite) {
      top: 0;
      right: -2px;
    }
  }

  .experiences--list {
    .row {
      align-items: flex-end;
    }
  }

  .curated-item {
    padding-bottom: 16px;
    &:nth-child(even) {
      padding-left: 8px;
    }
    &:nth-child(odd) {
      padding-right: 8px;
    }
    &.item-square {
      :global(.image-cover) {
        padding-top: 90% !important;
      }
    }
  }
</style>
