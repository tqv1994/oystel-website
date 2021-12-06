<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import PrivacySettingBox from './components/PrivacySettingBox.svelte';
  import Button, { Label } from '@smui/button';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Checkbox from '@smui/checkbox';
  import Text from './components/Text.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';

  let me: User | undefined = $authStore.user;
  const handleUpdateSetting = async () => {
    const res = await fetch(`/auth/update.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        neverMissADrop: me?.neverMissADrop,
        curatedForYou: me?.curatedForYou,
      }),
    });
    if (res.ok) {
    } else {
      window.pushToast('An error occurred');
    }
  };
</script>

<div class="content privacy-setting-content">
  <LayoutAccount currentPage="privacy-setting">
    {#if me}
      <svelte:component this={ButtonBack} label="Privacy Setting" link="/me" />
      <div class="divider" />
      <svelte:component
        this={PrivacySettingBox}
        title="Privacy Policy"
        class="mb-60 mt-20"
      >
        <div slot="actions">
          <Button variant="unelevated" type="submit"
            ><Label class="text-button2">View Privacy Policy</Label></Button
          >
        </div>
        <div slot="content">
          <svelte:component this={Text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </svelte:component>
        </div>
      </svelte:component>
      <svelte:component
        this={PrivacySettingBox}
        title="Site Cookies"
        class="mb-60"
      >
        <div slot="content">
          <svelte:component this={Text}>
            We use technologies to personalize and enhance your experience on
            our site. Visit our Privacy Policy to learn more or manage your
            personal preferences in our Tool. By using our site, you agree to
            our use of these technologies.
          </svelte:component>
        </div>
      </svelte:component>
      <svelte:component
        this={PrivacySettingBox}
        title="Manage My Subscription Preferences"
        class="mb-60"
      >
        <div slot="actions">
          <Button
            variant="unelevated"
            type="button"
            on:click={handleUpdateSetting}
            ><Label class="text-button2">Update Preferences</Label></Button
          >
        </div>
        <div slot="content">
          <form on:submit|preventDefault={handleUpdateSetting}>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={me.neverMissADrop} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <svelte:component this={Text}>
                  <b>Never Miss a Drop</b><br />
                  We use technologies to personalize and enhance your experience
                  on our site. Visit our Privacy Policy to learn more or manage your
                  personal preferences in our Tool. By using our site, you agree
                  to our use of these technologies.
                </svelte:component>
              </Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={me.curatedForYou} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <svelte:component this={Text}>
                  <b>Curated for You</b><br />
                  We use technologies to personalize and enhance your experience
                  on our site. Visit our Privacy Policy to learn more or manage your
                  personal preferences in our Tool. By using our site, you agree
                  to our use of these technologies.
                </svelte:component>
              </Cell>
            </LayoutGrid>
          </form>
        </div>
      </svelte:component>
    {/if}
  </LayoutAccount>
</div>
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  .privacy-setting-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
    .divider {
      --divider-line-color: #000;
    }
  }
</style>
