<template>
  <Dialog title="Create Board">
    <q-form class="w-full">
      <div class="q-py-md">
        <div class="q-gutter-md">
          <q-color
            v-model="hex"
            default-value="palette"
            no-header
            no-footer
            :palette="paletteColors"
          />

          <q-input v-model="name" dense outlined label="Board Name" />

          <q-select
            v-model="visibility"
            dense
            outlined
            :options="visibilityOptions"
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
      <q-btn color="primary" flat label="Create" />
    </template>
  </Dialog>
</template>

<script setup>
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
</script>

<style></style>
