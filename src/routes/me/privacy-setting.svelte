<script lang="ts">
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import PrivacySettingBox from './components/PrivacySettingBox.svelte';
  import Button, { Label } from '@smui/button';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Checkbox from '@smui/checkbox';
  import Text from './components/Text.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { ppatch } from '$lib/utils/fetch';

  let me: User | undefined = $session.user;
  let formData: {
    neverMissADrop: boolean;
    curatedForYou: boolean;
    getTravelGuides: boolean;
    getTravelOffers: boolean;
  } = reset();

  function reset() {
    return {
      neverMissADrop: $session.user?.neverMissADrop === null ? true : $session.user?.neverMissADrop,
      curatedForYou: $session.user?.curatedForYou === null ? true : $session.user?.curatedForYou,
      getTravelGuides: $session.user?.getTravelGuides === null ? true : $session.user?.getTravelGuides,
      getTravelOffers: $session.user?.getTravelOffers === null ? true : $session.user?.getTravelOffers,
    }
  }

  const handleUpdateSetting = async () => {
    window.openLoading();
    const res = await ppatch(`auth/me`, formData);
    if (res.ok) {
      const user = await res.json();
      session.update((s)=>{
        if(s.user){
          s.user.neverMissADrop = user.neverMissADrop;
          s.user.curatedForYou = user.curatedForYou;
          s.user.getTravelGuides = user.getTravelGuides;
          s.user.getTravelOffers = user.getTravelOffers;
        }
        return s;
      });
      formData = reset();
    } else {
      window.pushToast('An error occurred');
    }
    window.closeLoading();
  };
</script>

<div class="content privacy-setting-content">
  <LayoutAccount currentPage="privacy-setting">
    {#if me}
      <ButtonBack label="Customer Care" link="/me" />
      <div class="divider" />
      <PrivacySettingBox title="Privacy Policy" class="mb-60 mt-20">
        <div slot="actions">
          <Button href="/privacy-policy" variant="unelevated" type="submit"
            ><Label class="text-button2">View Privacy Policy</Label></Button
          >
        </div>
        <div slot="content">
          <Text>
            We want <a href="https://oysteo.com/">OYSTEO</a> to be an inspirational
            space for you to discover the world in style in a relaxed and curated
            atmosphere.
          </Text>
          <Text>
            We respect your privacy rights and recognize the importance of
            protecting the information you share with us, so that we can best
            service you.
          </Text>
        </div>
      </PrivacySettingBox>
      <PrivacySettingBox title="Site Cookies" class="mb-60">
        <div slot="content">
          <Text>
            We use technologies to personalize and enhance your experience on <a
              href="https://oysteo.com/">OYSTEO</a
            >. Cookies help us remember who you are and match your interests
            when visiting OYSTEO.
          </Text>
          <Text>For more information, please read our Privacy Policy.</Text>
        </div>
      </PrivacySettingBox>
      <PrivacySettingBox title="Managing Your Preferences" class="mb-60">
        <div slot="content">
          <Text
            >You can control how we send personalized marketing communications
            to you, from the Manage Preferences section of your registered
            OYSTEO account.</Text
          >
          <Text
            >Accessing Manage Preferences allows you to control how we
            communicate with you. If you do not wish to receive marketing
            communications from us, you can unsubscribe from the link in the
            email you received, or by changing your Marketing Preferences.</Text
          >
        </div>
      </PrivacySettingBox>
      <PrivacySettingBox title="Update Your Preferences" class="mb-60">
        <div slot="actions">
          <Button
            variant="unelevated"
            type="button"
            on:click={handleUpdateSetting}
            ><Label class="text-button2">Update Preferences</Label></Button
          >
        </div>
        <div slot="content">
          <Text
            >To update your preferences, please select the relevant content.</Text
          >
          <Text class="mb-10"
            >We recommend you check all boxes to stay inspired and excess
            exclusive offers from OYSTEO.</Text
          >
          <form on:submit|preventDefault={handleUpdateSetting}>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={formData.getTravelGuides} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <Text>
                  <b>Travel Guides & Inspiration</b><br />
                  First look at OYSTEO magazine- monthly travel guides, local tastemaker
                  interviews, special travel features, and more
                </Text>
              </Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={formData.getTravelOffers} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <Text>
                  <b>Just-in Travel Offers</b><br />
                  Exclusive travel offers only found at OYSTEO
                </Text>
              </Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={formData.curatedForYou} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <Text>
                  <b>Curated What To Wear Edits</b><br />
                  Exclusive round-up of What to Wear and must-have luxury fashion
                  pieces
                </Text>
              </Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0 mb-25">
              <Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
                <Checkbox bind:checked={formData.neverMissADrop} />
              </Cell>
              <Cell spanDevices={{ desktop: 11, tablet: 7, phone: 3 }}>
                <Text>
                  <b>Don’t Miss Out</b><br />
                  Travel alerts, style edits, invitations to special events, and
                  exclusive news
                </Text>
              </Cell>
            </LayoutGrid>
          </form>
        </div>
      </PrivacySettingBox>
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
