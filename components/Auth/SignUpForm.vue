<template>
  <div class="grid p-fluid my-4 gap-4">
    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText placeholder="Email" type="email" v-model="email" />
        </div>
    </div>

    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>
            <InputText placeholder="Password" type="password" v-model="password" />
        </div>
    </div>

     <div class="col-12 md:col-4">
        <Button label="Sign up" />
    </div>

    <Divider align="center" type="dashed">OR</Divider>

    <Button icon="pi pi-google" label="Continue with Google" class="p-button-outlined" />
    <Button icon="pi pi-microsoft" label="Continue with Microsoft" class="p-button-outlined" />
    <Button icon="pi pi-apple" label="Continue with Apple" class="p-button-outlined" />

    <Divider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/login">Already have an account? Log in</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  }
}
</script>