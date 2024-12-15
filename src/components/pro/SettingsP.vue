<template>
    <div>
      <h3>Settings</h3>
      <form>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="darkMode"
            v-model="darkMode"
          />
          <label class="form-check-label" for="darkMode">Dark Mode</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="emailNotifications"
            v-model="emailNotifications"
          />
          <label class="form-check-label" for="emailNotifications"
            >Email Notifications</label
          >
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        darkMode: false,
        emailNotifications: true,
      };
    },
  };
  </script>
  