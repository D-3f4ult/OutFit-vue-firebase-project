<template>
    <section class="brands py-4">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <img :src="require('@/assets/chanel-logo.png')" />
          </div>
          <div class="col">
            <img :src="require('@/assets/louis-vuitton-logo.png')" />
          </div>
          <div class="col">
            <img :src="require('@/assets/prada-logo.png')" />
          </div>
          <div class="col">
            <img :src="require('@/assets/calvin-klein-logo.png')" />
          </div>
          <div class="col">
            <img :src="require('@/assets/denim-logo.png')" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .brands img {
    max-height: 50px;
  }
  </style>
  