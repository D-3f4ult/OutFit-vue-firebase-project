<template>
    <div class="homepage">
      <HeaderP />
      <HeroSectionP />
      <BrandsSection />
      <DealsSection />
      <NewArrivals />
      <FeaturedProduct />
      <CustomerReviews />
      <InstagramSection />
      <SubscribeSection />
      <FooterP />
    </div>
  </template>
  
  <script>
  import HeaderP from '../components/HeaderP.vue';
  import HeroSectionP from '../components/home/HeroSectionP.vue';
  import BrandsSection from '../components/home/BrandsSection.vue';
  import DealsSection from '../components/home/DealsSection.vue';
  import NewArrivals from '../components/home/NewArrivals.vue';
  import FeaturedProduct from '../components/home/FeaturedProduct.vue';
  import InstagramSection from '../components/home/InstagramSection.vue';
  import SubscribeSection from '../components/home/SubscribeSection.vue';
  import FooterP from '../components/FooterP.vue';
  
  export default {
    components: {
      HeaderP,
      HeroSectionP,
      BrandsSection,
      DealsSection,
      NewArrivals,
      FeaturedProduct,
      InstagramSection,
      SubscribeSection,
      FooterP,
    },
  };
  </script>
  
  <style scoped>
  .homepage {
    background-color: #f8f9fa;
  }
  </style>
  