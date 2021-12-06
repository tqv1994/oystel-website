<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import WishlistLayout from './components/WishlistLayout.svelte';

  let me: User | undefined = $authStore.user;
  let active = 'All';

  const unlikeProduct = async (e: CustomEvent) => {
    let productId = e.detail.productId;
    const confirmDelete = confirm('Do you want to remove this item?');
    if (!confirmDelete) {
      return;
    }
    let productLikedIds = me.productLikes
      .map((item) => item.id)
      .filter((item) => item != productId);
    try {
      const res = await fetch(`/product/like.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productLikedIds),
      });
      if (res.ok) {
        me.productLikes = me.productLikes.filter(
          (item) => item.id != productId,
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
              on:unlike={(e) => unlikeProduct(e)}
              data={me.productLikes}
            />
          {:else if active == 'Avaiable'}
            <svelte:component
              this={WishlistLayout}
              on:unlike={(e) => unlikeProduct(e)}
              data={me.productLikes?.filter(item => item.available)}
            />{:else if active == 'Unavaiable'}
            <svelte:component
              this={WishlistLayout}
              on:unlike={(e) => unlikeProduct(e)}
              data={me.productLikes?.filter(item => !item.available)}
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
