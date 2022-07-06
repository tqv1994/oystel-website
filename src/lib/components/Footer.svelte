<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import Textfield from '@smui/textfield';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import { facebookLink, instagramLink, twitterLink } from '$lib/env';
  import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
  import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
  import TwitterIcon from '$lib/icons/TwitterIcon.svelte';

  let emailSubscribe = '';
</script>

<footer class="dark full-width t-pb-50">
  <div class="content-wrap">
    <div class="container margin-auto medium-max-width">
      <LayoutGrid>
        <Cell
          spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
          class="m-block d-none"
        >
          <div class="widget">
            <h5 class="mt-0 widget-title">Sign Up for Updates</h5>
            <div class="widget-content">
              <p>
                Exclusive content and special rewards from our travel and
                fashion partners.
              </p>
            </div>
            <form>
              <div class="form-control mb-24">
                <Textfield
                  class="has-padding-left"
                  style="width: 100%;"
                  bind:value={emailSubscribe}
                  label="Email Address"
                  type="email"
                />
              </div>
              <div class="form-control mb-10 m-mb-30">
                <Button variant="outlined">
                  <Label>Submit</Label>
                </Button>
              </div>
            </form>
          </div>

          <div class="widget mb-20 m-block d-none">
            <h5 class="mt-0 widget-title">Follow Oysteo</h5>
            <div class="widget-content button-socials">
              <a rel="nofollow" href={instagramLink} class="mr-20" target="_blank"
                ><InstagramIcon width={24} height={24} />
              </a>
              <a rel="nofollow" href={facebookLink} class="mr-20" target="_blank"
                ><FacebookIcon width={24} height={24} />
              </a>
              <a rel="nofollow" href={twitterLink} target="_blank"
                ><TwitterIcon width={24} height={24} />
              </a>
            </div>
          </div>
        </Cell>
        <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
          <LayoutGrid>
            <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
              <div class="widget mb--0">
                <h5 class="mt-0 widget-title">Explore Oysteo</h5>
                <div class="widget-content">
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Terms + Conditions</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
              <div class="widget">
                <h5 class="mt-0 widget-title">Contact Oysteo</h5>
                <div class="widget-content">
                  <ul>
                    <li><a href="#">Advisor Log In</a></li>
                    <li><a href="#">Affiliate Program</a></li>
                  </ul>
                </div>
              </div>
              <div class="widget mb-0 m-none">
                <h5 class="mt-0 widget-title">Follow Oysteo</h5>
                <div class="widget-content button-socials">
                  <a rel="nofollow" href={instagramLink} class="mr-20" target="_blank"
                    ><InstagramIcon width={24} height={24} />
                  </a>
                  <a rel="nofollow" href={facebookLink} class="mr-20" target="_blank"
                    ><FacebookIcon width={24} height={24} />
                  </a>
                  <a rel="nofollow" href={twitterLink} target="_blank"
                    ><TwitterIcon width={24} height={24} />
                  </a>
                </div>
              </div>
            </Cell>
          </LayoutGrid>
        </Cell>
        <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-none">
          <div class="widget pl-50">
            <h5 class="mt-0 widget-title">Sign Up for Updates</h5>
            <div class="widget-content">
              <p>
                Exclusive content and special rewards from our travel and
                fashion partners.
              </p>
            </div>
            <form>
              <div class="form-control mb-40">
                <Textfield
                  style="width: 100%;"
                  class="has-padding-left"
                  bind:value={emailSubscribe}
                  label="Email Address"
                  type="email"
                />
              </div>
              <div class="form-control mb-10 m-mb-30">
                <Button variant="outlined" class="d-pl-60 d-pr-60">
                  <Label class="text-button2">Submit</Label>
                </Button>
              </div>
            </form>
          </div>
        </Cell>
      </LayoutGrid>
    </div>
  </div>
</footer>

<style lang="scss" global>
  @import './../../style/partial/footer.scss';
  @import './../../style/partial/form.scss';
</style>
