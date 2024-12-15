<template>
    <div class="homepage">
        <HeaderL />

      <WishlistP />
      <FooterP />
    </div>
  </template>
    <script>
    import HeaderL from '../components/HeaderL.vue';
    import FooterP from '../components/FooterP.vue';
    import WishlistP from '../components/pro/WishlistP.vue';

    export default {
      components: {
        HeaderL,
        WishlistP,
        FooterP,
      },
    };
    </script>
    <style>
    .homepage {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* لجعل الصفحة تأخذ كامل الشاشة */
      }
      
      footer {
        margin-top: auto; /* يدفع الفوتر إلى الأسفل */
      }
      </style>