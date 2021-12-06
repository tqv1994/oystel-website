<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import WishlistLayout from './components/WishlistLayout.svelte';
  import { onMount } from 'svelte';
  import { Product } from '$lib/store/product';
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';

  let me: User | undefined = $authStore.user;
  let active = 'All';
  let data: Product[] | Experience[] | Destination[] = []
    .concat(...me.productLikes)
    .concat(...me.destinationLikes)
    .concat(...me.experienceLikes);
  const unlikeWishlist = async (e: CustomEvent) => {
    let wishListId = e.detail.id;
    let typeName = e.detail.typeName;
    const confirmDelete = confirm('Do you want to remove this item?');
    if (!confirmDelete) {
      return;
    }

    let config = {
      url: `/${typeName.toLowerCase()}/like.json`,
      objectLikes: `${typeName.toLowerCase()}Likes`,
    };

    let wishListIds = me[config.objectLikes]
      .map((item: Product | Experience | Destination) => item.id)
      .filter((item: Product | Experience | Destination) => item != wishListId);
    try {
      const res = await fetch(config.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishListIds),
      });
      if (res.ok) {
        me[config.objectLikes] = me[config.objectLikes].filter(
          (item: Product | Experience | Destination) =>
            !(item.id == wishListId && item.__typename == typeName),
        );
        data = data.filter(
          (item: Product | Experience | Destination) =>
            !(item.id == wishListId && item.__typename == typeName),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="content wishlist-content">
  <LayoutAccount currentPage="wishlist">
    {#if me}
      <svelte:component this={ButtonBack} label="Wishlist" link="/me" />
      <svelte:component this={BoxTabs}>
        <div slot="tabs">
          <div class="d-block m-none">
            <TabBar
              tabs={['All', 'Avaiable', 'Unavaiable']}
              let:tab
              bind:active
            >
              <Tab {tab}>
                <Label>{tab}</Label>
              </Tab>
            </TabBar>
          </div>
          <div class="d-none m-block">
            <Select bind:value={active} label="">
              <Option value="All" selected>All</Option>
              <Option value="Avaiable">Avaiable</Option>
              <Option value="Unavaiable">Unavaiable</Option>
            </Select>
          </div>
        </div>
        <div slot="content" class="pt-40">
          {#if active == 'All'}
            <svelte:component
              this={WishlistLayout}
              on:unlike={(e) => unlikeWishlist(e)}
              {data}
            />
          {:else if active == 'Avaiable'}
            <svelte:component
              this={WishlistLayout}
              on:unlike={(e) => unlikeWishlist(e)}
              data={data.filter(
                (item) =>
                  item.available || typeof item.available == 'undefined',
              )}
            />
          {:else if active == 'Unavaiable'}
            <svelte:component
              this={WishlistLayout}
              on:unlike={(e) => unlikeWishlist(e)}
              data={data.filter(
                (item) =>
                  !item.available && typeof item.available != 'undefined',
              )}
            />
          {/if}
        </div>
      </svelte:component>
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .wishlist-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
  }
</style>
