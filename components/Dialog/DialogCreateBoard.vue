<template>
  <Dialog title="Create Board">
    <q-form ref="form" class="w-full" greedy @submit="onSubmit">
      <div class="q-py-md">
        <div class="q-gutter-md">
          <q-input
            v-model="hex"
            outlined
            label="Background"
            :rules="['hexColor']"
            lazy-rules
          >
            <template #append>
              <q-icon name="fa-solid fa-eye-dropper" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="hex"
                    format-model="hex"
                    square
                    flat
                    no-header-tabs
                    no-footer
                    default-view="palette"
                    :palette="paletteColors"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="name"
            outlined
            label="Board Name"
            :rules="[
              (value) => (value && value.length > 0) || 'Please enter a name',
            ]"
          />

          <q-select
            v-model="visibility"
            outlined
            :options="visibilityOptions"
            label="Visibility"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </q-form>

    <template #actions>
      <q-btn
        color="primary"
        type="submit"
        flat
        label="Create"
        @click="onSubmit"
      />
    </template>
  </Dialog>
</template>

<script setup>
const form = ref(null)
const name = ref('')
const hex = ref('')
const visibility = ref('')

const paletteColors = [
  '#019A9D',
  '#D9B801',
  '#E8045A',
  '#B2028A',
  '#2A0449',
  '#019A9D',
]

const visibilityOptions = [
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
    const { data } = await useFetch('/api/v1/boards', {
      key: 'createBoard',
      method: 'post',
      body: {
        name: name.value,
        hex: hex.value,
        visibility: visibility.value.value,
      },
    })
  }
}
</script>

<style></style>
