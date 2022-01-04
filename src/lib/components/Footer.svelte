<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import Textfield from '@smui/textfield';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';

  let emailSubscribe = '';
</script>

<footer class="dark full-width t-pb-50">
  <div class="content-wrap">
    <LayoutGrid>
      <Cell
        spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
        class="m-block d-none"
      >
        <div class="widget">
          <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
          <div class="widget-content">
            <p>
              Exclusive content and special rewards from our travel and fashion
              partners.
            </p>
          </div>
          <form>
            <div class="form-control mb-40">
              <Textfield
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
          <h4 class="mt-0 widget-title">Follow Oysteo</h4>
          <div class="widget-content button-socials">
            <a href="#" class="mr-20" target="_blank"
              ><img src="/img/icons/icon-instagram.svg" alt="" />
            </a>
            <a href="#" class="mr-20" target="_blank"
              ><img src="/img/icons/icon-facebook2.svg" alt="" />
            </a>
            <a href="#" target="_blank"
              ><img src="/img/icons/icon-twitter.svg" alt="" />
            </a>
          </div>
        </div>
      </Cell>
      <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
        <LayoutGrid>
          <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
            <div class="widget">
              <h4 class="mt-0 widget-title">Explore Oysteo</h4>
              <div class="widget-content">
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Terms + Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
            <div class="widget">
              <h4 class="mt-0 widget-title">Contact Oysteo</h4>
              <div class="widget-content">
                <ul>
                  <li><a href="#">Advisor Log In</a></li>
                  <li><a href="#">Affiliate Program</a></li>
                </ul>
              </div>
            </div>
            <div class="widget mb-0 m-none">
              <h4 class="mt-0 widget-title">Follow Oysteo</h4>
              <div class="widget-content button-socials">
                <a href="#" class="mr-20" target="_blank"
                  ><img src="/img/icons/icon-instagram.svg" alt="" />
                </a>
                <a href="#" class="mr-20" target="_blank"
                  ><img src="/img/icons/icon-facebook2.svg" alt="" />
                </a>
                <a href="#" target="_blank"
                  ><img src="/img/icons/icon-twitter.svg" alt="" />
                </a>
              </div>
            </div>
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-none">
        <div class="widget pl-50">
          <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
          <div class="widget-content">
            <p>
              Exclusive content and special rewards from our travel and fashion
              partners.
            </p>
          </div>
          <form>
            <div class="form-control mb-40">
              <Textfield
                style="width: 100%;"
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
</footer>
<style lang="scss" global>
  @import './../../style/partial/footer.scss';
  @import './../../style/partial/form.scss';
</style>