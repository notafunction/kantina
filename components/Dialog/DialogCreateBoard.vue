<template>
  <Dialog v-bind="$attrs">
    <template #default="{ close }">
      <v-card>
        <v-card-title>Create New Board</v-card-title>
        <v-card-text>
          <v-form ref="form" class="w-full">
            <v-text-field
              v-model="formData.name"
              label="Board name"
              :rules="[
                (value) => (value && value.length > 0) || 'Please enter a name',
              ]"
              required
            />

            <v-select
              v-model="formData.privacy"
              label="Privacy"
              :items="privacyOptions"
              item-title="label"
              item-value="value"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="close">Cancel</v-btn>
          <v-btn @click="onSubmit">Create</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </Dialog>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()
const dialogIsOpen = ref(false)

const form = ref(null)
const formData = ref({
  name: '',
  hex: '',
  privacy: '',
})

const paletteColors = [
  '#019A9D',
  '#D9B801',
  '#E8045A',
  '#B2028A',
  '#2A0449',
  '#019A9D',
]

const privacyOptions = [
  {
    label: 'Private',
    value: 'private',
    description: 'Only board members can see and edit this board.',
    icon: 'fa-solid fa-lock',
  },
  {
    label: 'Public',
    value: 'public',
    description:
      'Anyone on the internet can see this board. Only board members can edit.',
    icon: 'fa-solid fa-earth-americas',
  },
]

async function onSubmit(event) {
  if (await form.value.validate()) {
    const result = await $fetch('/api/v1/boards', {
      method: 'post',
      body: {
        name: formData.value.name,
        hex: formData.value.hex,
        privacy: formData.value.privacy,
      },
    })

    console.log(result)
  }
}
</script>

<style></style>
