<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand fw-bold fs-3" to="/">OutFit</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/deals">Deals</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/new-arrivals">New Arrivals</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/packages">Packages</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Sign in</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-dark text-white" to="/register">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-brand {
  font-family: 'Playfair Display', serif;
}
</style>
