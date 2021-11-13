<script>
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import Checkbox from '@smui/checkbox/Checkbox.svelte';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';

  let stepItems;
  let model = [
    {
      label: 'Entry Level',
      value: false,
    },
    {
      label: 'Balcony',
      value: false,
    },
    {
      label: 'Room with a view',
      value: false,
    },
    {
      label: 'Freestanding Bath',
      value: false,
    },
    {
      label: 'Suite',
      value: false,
    },
    {
      label: 'Connection',
      value: false,
    },
  ];

  function getStepItems() {
    let itemArray = [];
    for (let i = 0; i < 20; i++) {
      itemArray.push(i + 1);
    }
    stepItems = itemArray;
  }
  getStepItems();
</script>

<div class="content-wrap">
  <div class="content">
    <section class="d-pt-125 d-pb-40 m-pt-40 m-pb-20 full-width requiry-wrap">
      <div class="content-wrap">
        <div class="container">
          <div class="text-center d-mb-35 m-mb-25">
            <div class="logo d-mb-120 m-mb-45 ">
              <OysteoLogo />
            </div>
            <h1 class="mt-0 m-mb-15 d-mb-25">How can we accommodate you?</h1>
            <p class="mb-0 text-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div class="form-wrap d-mb-80 t-mb-80 m-mb-40 t-pl-0 m-pl-35">
            <LayoutGrid class="p-0">
              {#each model as item}
                <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
                  <Checkbox
                    bind:checked={item.value}
                    class="d-mr-40 t-mr-40 m-mr-15"
                  />
                  <h4 class="mt-0 mb-0">{item.label}</h4>
                </Cell>
              {/each}
            </LayoutGrid>
          </div>
          <div class="form-control text-center mb-20 group-button">
            <Button
              variant="outlined"
              class="d-mr-30 t-mr-30 m-mb-15 pl-40 pr-40"
              ><Label>Previous Question</Label></Button
            >
            <Button variant="outlined" class="t-mb-15 pl-40 pr-40"
              ><Label>Next Question</Label></Button
            >
          </div>
          <div class="text-center t-block m-none">
            <a href="#" class="close-assessment ">Close Assessment</a>
          </div>
          <div class="line-steps-wrap mt-120">
            <div class="content-wrap">
              <div class="container">
                <div class="line-steps">
                  {#each stepItems as item}
                    <div class="item-{item} step {item == 7 ? 'active' : ''}">
                      <span class="text-h5">{item} OF 20</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
          <IconButton class="d-none t-none m-block btn-close">
            <Icon component={Svg} viewBox="0 0 18.858 18.858">
              <g
                id="Icon_-_Close"
                data-name="Icon - Close"
                transform="translate(-331.071 -23.571)"
              >
                <line
                  id="Line"
                  y1="17"
                  x2="18"
                  transform="translate(331.5 24.5)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1.25"
                />
                <path
                  id="Line-2"
                  data-name="Line"
                  d="M0,17,9,8.5,18,0"
                  transform="translate(349 24) rotate(90)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1.25"
                />
              </g>
            </Icon>
          </IconButton>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  h4 {
    text-transform: uppercase;
    display: inline-block;
  }
  @media screen and (min-width: 950px) {
    .text-description {
      margin: auto;
      max-width: 430px;
    }
  }
  .requiry-wrap {
    background-color: #f0f7f8;
  }
  .logo img {
    filter: brightness(0);
  }
  .form-wrap {
    margin: auto;
    width: 570px;
  }
  :global(.mdc-checkbox) {
    top: 8px;
  }

  a.close-assessment {
    text-decoration: underline;
  }

  .line-steps-wrap .container {
    width: 100%;
  }
  .line-steps {
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto;
    grid-auto-flow: column;
  }
  .line-steps:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
  }
  .line-steps .step {
    position: relative;
  }
  .line-steps .step.active:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 25px;
    width: 1px;
    background-color: #000;
  }
  .line-steps .step span {
    display: none;
  }
  .line-steps .step.active span {
    display: block;
    position: absolute;
    left: 50%;
    top: -50px;
    transform: translateX(-50%);
    width: 110%;
    text-align: center;
  }
  @media (max-width: 1239px) {
    .line-steps-wrap .container {
      width: auto;
    }
    .line-steps .step.active span {
      width: 175%;
    }
  }

  @media (max-width: 949px) {
    .line-steps .step.active span {
      width: 450%;
    }
    .form-wrap {
      width: 100%;
    }
    .group-button :global(.mdc-button) {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    :global(.btn-close) {
      position: absolute;
      top: -25px;
      right: 20px;
    }
  }
</style>
