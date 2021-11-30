<script lang="ts">
  import Exhibit from '$lib/components/exhibit.svelte';
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';
  import { Product } from '$lib/store/product';
  import Select, {Option} from '@smui/select';
  import WishListItem from './WishListItem.svelte';

  let items: Product[] = [
    {
      id: '4',
      name: 'Square-Neck One-Piece Swimsuit',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Matteau',
      price: '425',
      gallery: [
        {
          id: '43',
          name: 'product-4.png',
          alternativeText: '',
          caption: '',
          blurHash: 'UIJ4-%WB1c$jK4n%}Yj[1coK|^WC,@WBxaoL',
          width: 99,
          height: 158,
          hash: 'product_4_963b0f1574',
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_4_963b0f1574.png',
          previewUrl: null,
        },
      ],
    },
    {
      id: '3',
      name: 'Platform Desert Boot',
      intro: '',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Louis Vuitton',
      price: '425',
      gallery: [
        {
          id: '13',
          name: 'product-9.png',
          alternativeText: '',
          caption: '',
          blurHash: '',
          width: 135,
          height: 215,
          hash: 'product_9_6f91734fd5',
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_9_6f91734fd5.png',
        },
      ],
    },
    {
      id: '5',
      name: 'Asymmetric Tiered Organza Gown',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Carolina Herrera',
      price: 425,
      gallery: [
        {
          id: '42',
          name: 'product-3.png',
          alternativeText: '',
          caption: '',
          blurHash: null,
          width: 107,
          height: 156,
          formats: null,
          hash: 'product_3_b3724b0e48',
          size: 15.54,
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_3_b3724b0e48.png',
          previewUrl: null,
        },
      ],
    },
    {
      id: '6',
      name: 'Oversized Acetate Sunglasses',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.\n',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Bottega Veneta',
      price: 425,
      gallery: [
        {
          id: '44',
          name: 'product-3a.png',
          alternativeText: '',
          caption: '',
          blurHash: null,
          width: 107,
          height: 156,
          formats: null,
          hash: 'product_3a_15cb553519',
          size: 7.63,
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_3a_15cb553519.png',
          previewUrl: null,
        },
      ],
    },
    {
      id: '8',
      name: 'Heroica Printed Cotton Sarong',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Johanna Ortiz',
      price: 425,
      gallery: [
        {
          id: '46',
          name: 'product-6.png',
          alternativeText: '',
          caption: '',
          blurHash: 'U3J7gJ=q00I^4TxuyYV@0H?aqs02_NE2IBxo',
          width: 111,
          height: 171,
          hash: 'product_6_a1c2c1fcab',
          size: 25.01,
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_6_a1c2c1fcab.png',
          previewUrl: null,
        },
      ],
    },
    {
      id: '9',
      name: 'Papier Wide Brim Hat',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.\n',
      description:
        'I went to The Bahamas on my first family cruise and my parents actually went there on their honeymoon. Their stories of the Freeport beaches and neighboring islands as well as our own experience of a dip in the pool at The Atlantis, shopping in Nassau, and sharing the magic of the island culture are memorable. The Bahamas was one of my first island experiences and it definitely didn’t disappoint. Complete with delightful people, friendly attitudes, beautiful beaches, and weather that was better than we could have imagined, The Bahamas kept my beach heart happy and my travel soul fulfilled.\n\nAs with any other destination, you can find yourself feeling like a tourist or embracing the role of traveling adventurer. If you’re on a cruise in the Bahamas, maybe try to head further from the ports and get access beyond the gates to the true islands. If you’re flying in and staying at a grand resort, give yourself some time to wander a bit further from the edges of the property to check out life lived as a local. Ditch the guidebooks and go rogue – you’re bound to find even more beautiful beaches, genuine people, and delicious eats.\n\nBut, before you go, use this packing list for The Bahamas to make sure you’re prepared for your island adventures.\n\nThe Bahamas offers the novelty of island culture, natural sights, gorgeous beaches, animal friends, and nightlife aplenty. Whether you’re shopping the straw markets in Nassau, getting your festival on at Junkanoo, or letting it ride amidst the tables in Atlantis, you’re bound to be bit by the island vibe and leave ready to return soon.',
      brand: 'Gucci',
      price: 425,
      gallery: [
        {
          id: '48',
          name: 'product-1a.png',
          alternativeText: '',
          caption: '',
          blurHash: null,
          width: 107,
          height: 156,
          formats: null,
          hash: 'product_1a_b27c686ebb',
          size: 8.11,
          url: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/product_1a_b27c686ebb.png',
          previewUrl: null,
        },
      ],
    },
  ];
  let sort: string = 'Recently Added';
</script>

<div class="row header mb-30">
  <div class="d-col-6 m-col-6">{items.length} Items</div>
  <div class="d-col-6 m-col-6 text-right">
    <Select bind:value={sort} label="" class="text-left">
      <Option value="Recently Added" selected>Recently Added</Option>
    </Select>
  </div>
</div>
<div class="row items-list">
  {#each items as item}
    <div class="d-col-4 m-col-6">
      <svelte:component this={WishListItem} {item} />
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  .header{
    align-items: center;
    :global(.mdc-select){
        width: auto;
    }
  }
  .items-list {
    grid-row-gap: 30px;
  }
</style>
