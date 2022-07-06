<script lang="ts">
  import { facebookLink, instagramLink, twitterLink } from '$lib/env';
  import FacebookIcon from '$lib/icons/FacebookIcon.svelte';

  import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
  import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
</script>

<div class="follow-wrap">
  <h5 class="follow-link-header">Follow Oysteo</h5>
  <div class="follow-link-row">
    <a rel="nofollow" href={instagramLink} class="follow-link" target="_blank">
      <InstagramIcon width={24} height={24} />
    </a>
    <a rel="nofollow" href={facebookLink} class="follow-link" target="_blank">
      <FacebookIcon width={24} height={24} />
    </a>
    <a rel="nofollow" href={twitterLink} class="follow-link" target="_blank">
      <TwitterIcon width={24} height={24} />
    </a>
  </div>
</div>

<style lang="scss">
  .follow-wrap {
    left: auto !important;
    bottom: auto !important;
    padding-left: 24px;

    .follow-link-header {
      font-weight: 300;
      margin-bottom: 8px;
    }

    .follow-link-row {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 32px;
    }

    .follow-link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 4px;
      vertical-align: middle;

      &:hover {
        background: rgba(black, 0.1);
      }

      svg {
        width: 24px;
        height: 32px;

        &.-adjust-twitter {
          margin-top: 4px;
        }
      }
    }
  }
</style>
