<script lang="ts">
  import authStore from '../stores/auth';
  import SignupModal from '../shared/components/modals/SignupModal.svelte';
  import SigninModal from '../shared/components/modals/SigninModal.svelte';
  import OyCarousel from '../shared/components/common/OyCarousel.svelte';
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label, Icon } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  let openSignupModal, openSigninModal;
  let userModel = $authStore.user;
  function getUserAfterSignup(event){
    userModel = event.detail.user;
  }

  function callOpenSignupModal(){
    if(!userModel){
      openSignupModal = true;
      openSigninModal = false;
    }
  }

  function callOpenSigninModal(){
    if(!userModel){
      openSignupModal = false;
      openSigninModal = true;
    }
  }

</script>
<div class="content">
  <section id="slider">
    <OyCarousel perPage={{ 800: 1 }} draggable={false}>
      <span class="control" slot="left-control">
        <Icon><img src="./img/icons/icon-left-arrow.svg"></Icon>
      </span>
      <div class="slide-content slide-item" style="background-image: url(./img/slides/slide-01.jpg)">
        <div class="dark text-box">
          <LayoutGrid class="pb-15">
            <Cell><h3 class="mt-0 mb-0">Welcome to Oysteo</h3></Cell>
            <Cell><Button variant="outlined"><Label>Plan Your Trip</Label></Button></Cell>
          </LayoutGrid>
          <LayoutGrid class="pb-15">
            <Cell span="12"><h1 class="mt-0 mb-0">Your lifestyle concierge platform for incredible experiences and luxury resort fashion.</h1></Cell>
          </LayoutGrid>
          <LayoutGrid class="m-none">
            <Cell>
              <h4 style="text-transform: uppercase">Advisors</h4>
              <p>First hand experience to craft your perfect vacation.</p>
            </Cell>
            <Cell>
              <h4 style="text-transform: uppercase">Experiences</h4>
              <p>Bespoke itineraries from our leading tastemakers.</p>
            </Cell>
            <Cell>
              <h4 style="text-transform: uppercase">Fashion</h4>
              <p>Purchase luxury goods from curated collections.</p>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
      <div class="slide-content slide-item" style="background-image: url(./img/slides/slide-02.jpg)">
        <div class="dark text-box">
          <LayoutGrid class="pb-15">
            <Cell><h3 class="mt-0 mb-0">Welcome to Oysteo</h3></Cell>
            <Cell><Button variant="outlined"><Label>Plan Your Trip</Label></Button></Cell>
          </LayoutGrid>
          <LayoutGrid class="pb-15">
            <Cell span="12"><h1 class="mt-0 mb-0">Your lifestyle concierge platform for incredible experiences and luxury resort fashion.</h1></Cell>
          </LayoutGrid>
          <LayoutGrid class="m-none">
            <Cell>
              <h4 style="text-transform: uppercase">Advisors</h4>
              <p>First hand experience to craft your perfect vacation.</p>
            </Cell>
            <Cell>
              <h4 style="text-transform: uppercase">Experiences</h4>
              <p>Bespoke itineraries from our leading tastemakers.</p>
            </Cell>
            <Cell>
              <h4 style="text-transform: uppercase">Fashion</h4>
              <p>Purchase luxury goods from curated collections.</p>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
      <span class="control" slot="right-control">
        <Icon><img src="./img/icons/icon-right-arrow.svg"></Icon>
      </span>
    </OyCarousel>
  </section>
  <section class="has-padding" id="featured-drops">
    <LayoutGrid class="pt-0">
      <Cell span="12"><h3 class="text-h1 mt-0 mb-0">Featured Drops</h3></Cell>
    </LayoutGrid>
    <LayoutGrid>
      <Cell span="4">
        <div class="item-featured-drop new">
          <div class="thumbnail dark mb-70">
            <img class="" src="./img/feature-drops/item-1.jpg" alt=""/>
            <div class="caption"><span>6 Packages left</span></div>
          </div>
          <h5 class="mt-0" >Fashion Drop</h5>
          <div class="divider pb-30"></div>
          <h4 class="text-h2 mt-0 mb-30">Louis Vuitton - Photographed by Inez & Vinoodh in Monaco</h4>
          <Button variant="outlined"><Label>Plan Your Trip</Label></Button>
        </div>
      </Cell>
      <Cell span="8" class="d-mr--30 m-mr-0">
        <div class="list-featured-drop">
          <div class="item-featured-drop">
            <div class="thumbnail dark mb-60">
              <img class="" src="./img/feature-drops/item-2.jpg" alt=""/>
              <div class="caption"><span>11 Packages left</span></div>
            </div>
            <p class="mt-0 mb-25 text-eyebrow category">Experience Drop</p>
            <div class="divider pb-30"></div>
            <h4 class="text-h2 mt-0 mb-50 title">Exfoliating and polishing your skin with a finely ground herbs.</h4>
            <Button variant="outlined"><Label>Plan Your Trip</Label></Button>
          </div>
          <div class="item-featured-drop coming">
            <div class="thumbnail dark mb-60">
              <img class="" src="./img/feature-drops/item-3.jpg" alt=""/>
              <div class="caption"><span>Coming 07.02.21</span></div>
            </div>
            <p class="mt-0 mb-25 text-eyebrow category" >Fashion Drop</p>
            <div class="divider pb-30"></div>
            <h4 class="text-h2 mt-0 mb-50 title">Exfoliating and polishing your skin with a finely ground herbs.</h4>
            <Button variant="outlined"><Label>Set Reminder</Label></Button>
          </div>
          <div class="item-featured-drop">
            <div class="thumbnail dark mb-60">
              <img class="" src="./img/feature-drops/item-4.jpg" alt=""/>
              <div class="caption"><span>3 Packages left</span></div>
            </div>
            <p class="mt-0 mb-25 text-eyebrow category" >Experience Drop</p>
            <div class="divider pb-30"></div>
            <h4 class="text-h2 mt-0 mb-50 title">Exfoliating and polishing your skin with a finely ground herbs.</h4>
            <Button variant="outlined"><Label>Plan Your Trip</Label></Button>
          </div>
        </div>
      </Cell>
    </LayoutGrid>
  </section>
  <section class="pt-55 pb-70" id="signup-section" style="background-color: #F0F7F8">
    <LayoutGrid>
      <Cell span="5">
        <div class="thumbnail dark">
          <img src="./img/signup-img.jpg" alt=""/>
          <div class="caption">
            <span>Channel Resort ‘21</span>
          </div>
        </div>
      </Cell>
      <Cell span="7" class="light d-pl-70 d-pr-70">
        <h3 class="d-mb-100 d-mt-100 m-mt-40 m-mb-70">Join now for exclusive biweekly travel promotional drops, special content, and bespoke travel itineraries.</h3>
        <div class="d-pb-100 m-pb-0"></div>
        <h5>Become an Oysteo Member now</h5>
        <h2 class="text-h1 mt-30 d-mb-40 m-mb-15">Never Miss a Drop</h2>
        <Button variant="outlined" on:click={callOpenSignupModal}><Label>Sign Up Now</Label></Button>
      </Cell>
    </LayoutGrid>
  </section>
  <section class="has-padding" id="experience-section">
    <LayoutGrid>
      <Cell span="5">
        <div class="item-experience featured text-center">
          <a href="#">
            <div class="thumbnail">
              <img src="./img/experiences/experience-1.jpg"/>
            </div>
          </a>
          <p class="text-h1 mt-40">Curated for You</p>
          <div class="divider pb-25"></div>
          <p class="mt-0 text-eyebrow">Featured Experience</p>
          <a href="#">
            <h4 class="text-h2">Archaval Ferrer Winery Tour </h4>
          </a>
        </div>
      </Cell>
      <Cell span="7">
        <LayoutGrid class="list-experiences">
          <Cell span="6">
            <div class="item-experience">
              <div class="thumbnail">
                <img src="./img/experiences/experience-2.jpg"/>
              </div>
              <p class="text-eyebrow mt-25 mb-0">Experience</p>
              <div class="divider mt-25 pb-30"></div>
              <h4 class="text-h2 title mt-0">Exfoliating and polishing your skin with a finely ground herbs.</h4>
            </div>
          </Cell>
          <Cell span="6">
            <div class="item-experience">
              <a href="#">
                <div class="thumbnail">
                  <img src="./img/experiences/experience-3.jpg"/>
                </div>
                <p class="text-eyebrow mt-25 mb-0">Experience</p>
                <div class="divider mt-25 pb-30"></div>
                <h4 class="text-h2 title mt-0">A one-of-a-kind journey of self-exploration.</h4>
              </a>
            </div>
          </Cell>
          <Cell span="6">
            <div class="item-experience">
              <a href="#">
                <div class="thumbnail">
                  <img src="./img/experiences/experience-4.jpg"/>
                </div>
                <p class="text-eyebrow mt-25 mb-0">Experience</p>
                <div class="divider mt-25 pb-30"></div>
                <h4 class="text-h2 title mt-0">A one-of-a-kind journey of self-exploration.</h4>
              </a>
            </div>
          </Cell>
          <Cell span="6">
            <div class="item-experience">
              <a href="#">
                <div class="thumbnail">
                  <img src="./img/experiences/experience-5.jpg"/>
                </div>
                <p class="text-eyebrow mt-25 mb-0">Destination</p>
                <div class="divider mt-25 pb-30"></div>
                <h4 class="text-h2 title mt-0">A Dream Cotswolds Getaway</h4>
              </a>
            </div>
          </Cell>
          <Cell span="6">
            <div class="item-experience">
              <a href="#">
                <div class="thumbnail">
                  <img src="./img/experiences/experience-6.jpg"/>
                </div>
                <p class="text-eyebrow mt-25 mb-0">Experience</p>
                <div class="divider mt-25 pb-30"></div>
                <h4 class="text-h2 title mt-0">Exfoliating and polishing your skin with a finely ground herbs.</h4>
              </a>
            </div>
          </Cell>
          <Cell span="6">
            <div class="item-experience">
              <a href="#">
                <div class="thumbnail">
                  <img src="./img/experiences/experience-7.jpg"/>
                </div>
                <p class="text-eyebrow mt-25 mb-0">Experience</p>
                <div class="divider mt-25 pb-30"></div>
                <h4 class="text-h2 title mt-0">A one-of-a-kind journey of self-exploration.</h4>
              </a>
            </div>
          </Cell>
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </section>
  <section id="from-advisors" class="pb-60">
    <h2 class="text-h1 mt-0">From our Advisors</h2>
    <LayoutGrid >
      <Cell spanDevices={{desktop: 3, mobile: 6}}>
        <div class="item-experience">
          <a href="#">
            <div class="thumbnail">
              <img src="./img/from-advisors/item-1.jpg"/>
            </div>
            <p class="text-eyebrow mt-25 mb-0">Featured Experience</p>
            <div class="divider mt-25 pb-30"></div>
            <h4 class="text-h2 mt-0">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
          </a>
        </div>
      </Cell>
      <Cell spanDevices={{desktop: 3, mobile: 6}}>
        <div class="item-experience">
          <a href="#">
            <div class="thumbnail">
              <img src="./img/from-advisors/item-2.jpg"/>
            </div>
            <p class="text-eyebrow mt-25 mb-0">Featured Experience</p>
            <div class="divider  mt-25 pb-30"></div>
            <h4 class="text-h2 mt-0">Archaval Ferrer Winery Tour - Drink directly from the cellar barrel.</h4>
          </a>
        </div>
      </Cell>
      <Cell spanDevices={{desktop: 3, mobile: 6}}>
        <div class="item-experience">
          <a href="#">
            <div class="thumbnail">
              <img src="./img/from-advisors/item-3.jpg"/>
            </div>
            <p class="text-eyebrow mt-25 mb-0">Featured Experience</p>
            <div class="divider  mt-25 pb-30"></div>
            <h4 class="text-h2 mt-0">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
          </a>
        </div>
      </Cell>
      <Cell spanDevices={{desktop: 3, mobile: 6}}>
        <div class="item-experience">
          <a href="#">
            <div class="thumbnail">
              <img src="./img/from-advisors/item-4.jpg"/>
            </div>
            <p class="text-eyebrow mt-25 mb-0">Featured Experience</p>
            <div class="divider mt-25 pb-30"></div>
            <h4 class="text-h2 mt-0">A one-of-a-kind journey of self-exploration.</h4>
          </a>
        </div>
      </Cell>
    </LayoutGrid>
  </section>
</div>
<SignupModal bind:open={openSignupModal} bind:authModel={userModel} on:close={callOpenSigninModal} />
<SigninModal bind:open={openSigninModal} bind:authModel={userModel} on:close={callOpenSignupModal} />
