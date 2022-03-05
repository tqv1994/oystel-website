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
  import { contains } from '$lib/utils/array';
  import { authStore, User } from '$lib/store/auth';
  import SliderItems from './SliderItems.svelte';
import { likeExperienceService } from '$lib/services/experience.service';

  export let experiences: Experience[];
  export let name: string | undefined = undefined;
  export let prominent: boolean = false;
  export let vertical: boolean = false;
  export let columns: number = 4;
  export let subtitle: string  = "Featured Experience";
  let me: User | undefined = $authStore.user;
  export let index: number;
  let hero: Experience | undefined;
  let nonHeros: Experience[] | undefined;
  $: if (prominent && experiences.length) {
    experiences = storeHelper.getItems([...experiences], 7);

    hero = experiences[0];
    if (experiences.length > 1) {
      nonHeros = experiences.slice(1);
    }
    if(hero && me){
      const indexExist = (me.experienceLikes || []).findIndex(itemExperience=>hero.id.replace('experience-','') === itemExperience.id);
      if(indexExist < 0){
        hero.liked = false;
      }else{
        hero.liked = true;
      }
    }
  }

  function runScript() {
    if (document.documentElement.clientWidth > 949) {
      documentHelper.handleEqualHeightItems([
        `.experiences.experiences-${index} .experiences--item.featured`,
        `.experiences.experiences-${index} .experiences--list`,
      ]);
    }
  }
  const dispatcher = createEventDispatcher();
  const onLike = (event: CustomEvent, experience: Experience | undefined) => {
    if ($authStore.user) {
      if (experience) {
        hero.liked = !experience.liked;
        dispatcher('likeItem', { data: experience });
      } else {
        const item = event.detail.item;
        dispatcher('likeItem', { data: item });
      }
    } else {
      window.openSignInModal();
    }
  };

  const likeExperience = async() => {
    if(hero && me){
      try{
        const userUpdated = await likeExperienceService(hero.id.replace('experience-',''), me.experienceLikes || []);
        me.experienceLikes = userUpdated.experienceLikes;
        authStore.set({user: me});
      }catch(error){
        console.error(error);
      }
    }
    
  }
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
            <div
              class="image-cover m-none"
              style="padding-top: calc(568/529 * 100%)"
            >
              {#if hero.gallery.length > 0 || hero.gallery[0] != null}
                <BlurImage {...hero.gallery[0]} />
              {:else}
                <BlurImage />
              {/if}
            </div>
            <div
              class="image-cover d-none m-block"
              style="padding-top: calc(425/328 * 100%)"
            >
              {#if hero.gallery.length > 0 || hero.gallery[0] != null}
                <BlurImage {...hero.gallery[0]} />
              {:else}
                <BlurImage />
              {/if}
            </div>
          </a>
          <IconButton
            class="btn-favorite {hero.liked ? 'liked' : ''}"
            on:click={(e) => {
              likeExperience()
            }}
          >
            <HeartIcon size="sm" />
            <HeartFilledIcon size="sm" />
          </IconButton>
          <div class="caption text-left">
            <p class="m-0 text-eyebrow pl-25 pr-25">{subtitle}</p>
            <a class="" href={makeLink('/experience', hero)}>
              <h3 class="pl-25 pr-25 m-mt-10 d-mt-20 d-mb-30 m-mb-20 title">
                {hero.name}
              </h3>
            </a>
          </div>
        </div>
      </div>
    {/if}
  </Cell>
  <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
    <div class="experiences--list m-p-0">
      {#if nonHeros?.length}
        <SliderItems>
          <div class="row">
            {#each nonHeros as experience}
              <div class="col d-col-6 m-col-6">
                <Item
                  {...experience}
                  item={experience}
                  pathPrefix="/experience"
                  on:likeItem={(e) => onLike(e, undefined)}
                />
              </div>
            {/each}
          </div>
        </SliderItems>
      {/if}
    </div>
  </Cell>
</LayoutGrid>

<style lang="scss">
  @use '../../style/include/grid';
  @use '../../theme/mixins';

  .experiences--item.featured {
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
  .row {
    .col:nth-child(odd) {
      padding-right: calc(15px / 2);
    }
    .col:nth-child(even) {
      padding-left: calc(15px / 2);
    }
    .col {
      @include mixins.mobile {
        margin-bottom: 15px;
      }
    }
  }
</style>
