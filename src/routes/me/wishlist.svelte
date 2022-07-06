<script lang="ts" context="module">
  import { session } from '$app/stores';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import WishlistLayout from './components/WishlistLayout.svelte';
  import type { Product } from '$lib/store/product';
  import type { Destination } from '$lib/store/destination';
  import type { Experience } from '$lib/store/experience';
  import { updateTravellerMeStore } from '$lib/store/traveller';
  import { ppatch } from '$lib/utils/fetch';
</script>

<script lang="ts">
  let active = 'All';
  export let data: Product[] | Experience[] | Destination[];
  session.subscribe((s) => {
    data = [];
    if (s.user && s.travellerMe) {
      const travellerMe = s.travellerMe;
      if (travellerMe.productLikes) {
        data = data.concat(
          travellerMe.productLikes.map((item) => {
            item.typeName = 'product';
            return item;
          }),
        );
      }
      if (travellerMe.destinationLikes) {
        data = data.concat(
          travellerMe.destinationLikes.map((item) => {
            item.typeName = 'destination';
            return item;
          }),
        );
      }
      if (travellerMe.experienceLikes) {
        data = data.concat(
          travellerMe.experienceLikes.map((item) => {
            item.typeName = 'experience';
            return item;
          }),
        );
      }
    }
  });

  const unlikeWishlist = async (e: CustomEvent) => {
    let wishListId = e.detail.id;
    let typeName = e.detail.typeName;
    const confirmDelete = confirm('Do you want to remove this item?');
    if (!confirmDelete) {
      return;
    }
    let formData = {};

    if (typeName === 'product') {
      const products = ($session.travellerMe?.productLikes || []).filter(
        (item) => item.id.toString() !== wishListId.toString(),
      );
      formData = {
        productLikes: products,
      };
    } else if (typeName === 'destination') {
      const destinations = (
        $session.travellerMe?.destinationLikes || []
      ).filter((item) => item.id.toString() !== wishListId.toString());
      formData = {
        destinationLikes: destinations,
      };
    } else if (typeName === 'experience') {
      const experiences = ($session.travellerMe?.experienceLikes || []).filter(
        (item) => item.id.toString() !== wishListId.toString(),
      );
      formData = {
        experienceLikes: experiences,
      };
    }

    const res = await ppatch('travellers/me', formData);
    if (res.ok) {
      updateTravellerMeStore(await res.json());
    } else {
      window.pushToast('An error occurred');
    }

    // let wishListIds = me[config.objectLikes]
    //   .map((item: Product | Experience | Destination) => item.id)
    //   .filter((item: Product | Experience | Destination) => item != wishListId);
    // try {
    //   const res = await fetch(config.url, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(wishListIds),
    //   });
    //   if (res.ok) {
    //     me[config.objectLikes] = me[config.objectLikes].filter(
    //       (item: Product | Experience | Destination) =>
    //         !(item.id == wishListId && item.__typename == typeName),
    //     );
    //     data = data.filter(
    //       (item: Product | Experience | Destination) =>
    //         !(item.id == wishListId && item.__typename == typeName),
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
</script>

<div class="content wishlist-content">
  <LayoutAccount currentPage="wishlist">
    {#if $session.travellerMe}
      <ButtonBack label="Wishlist" link="/me" />
      <BoxTabs>
        <div slot="tabs">
          <div class="d-block m-none">
            <TabBar
              tabs={['All', 'Available', 'Unavailable']}
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
              <Option value="Available">Available</Option>
              <Option value="Unavailable">Unavailable</Option>
            </Select>
          </div>
        </div>
        <div slot="content" class="pt-40">
          {#if active == 'All'}
            <WishlistLayout on:unlike={(e) => unlikeWishlist(e)} {data} />
          {:else if active == 'Available'}
            <WishlistLayout
              on:unlike={(e) => unlikeWishlist(e)}
              data={data.filter(
                (item) =>
                  item.available || typeof item.available == 'undefined',
              )}
            />
          {:else if active == 'Unavailable'}
            <WishlistLayout
              on:unlike={(e) => unlikeWishlist(e)}
              data={data.filter(
                (item) =>
                  !item.available && typeof item.available != 'undefined',
              )}
            />
          {/if}
        </div>
      </BoxTabs>
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
