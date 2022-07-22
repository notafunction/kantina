<template>
  <div class="column gap-4">
    <q-btn
      icon="fa-brands fa-google"
      label="Continue with Google"
      no-caps
      @click="$emit('login', 'google.com')"
    />

    <q-btn
      icon="fa-brands fa-windows"
      no-caps
      label="Continue with Microsoft"
      @click="$emit('login', 'microsoft.com')"
    />
  </div>
</template>
