<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Apartment } from '../../shared/interfaces'
import { FIELDS, TABLE_EMPTY_TEXT } from '../constants'
import { canEdit } from '../policy'
import { ApartmentDetails } from './'

export default Vue.extend({
  components: { ApartmentDetails },
  props: {
    items: { type: Array },
    selectApartmentAction: { type: Function },
    itemsPerPage: { type: Number }
  },
  data() {
    return {
      fields: FIELDS,
      sortBy: 'name',
      sortDesc: false,
      tableEmptyText: TABLE_EMPTY_TEXT
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    openEditPage(id: string) {
      this.$router.push(`/apartments/${id}/edit`)
    },
    showEdit(apartment: Apartment): boolean {
      return canEdit(this.auth.user, apartment)
    },
    selectApartment(itemId: number): void {
      this.selectApartmentAction(itemId)
    }
  }
})
</script>

<template>
  <div class="table-responsive mb-0">
    <b-table
      class="table table-centered mb-0 table-nowrap"
      thead-class="thead-light"
      show-empty
      :empty-text="tableEmptyText"
      :items="items"
      :fields="fields"
      responsive="sm"
      :per-page="itemsPerPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:cell(name)="row">
        <h6
          :id="'popover-target-' + row.item.id"
          class="font-size-14 text-truncate m-0 cursor-pointer"
          role="button"
        >
          {{ row.item.name }}
        </h6>
        <ApartmentDetails :item="row.item"/>
        
      </template>
      <template v-slot:cell(pricePerMonth)="row">
        $ {{ row.item.pricePerMonth }}
      </template>

      <template v-slot:cell(state)="row">
        <span :class="`${row.item.state == 0 ? 'text-success' : 'text-danger'}`">
          {{ row.item.state == 0 ? 'Available' : 'Rented' }}
        </span>
      </template>

      <template v-slot:cell(actions)="row">
        <a
          v-if="showEdit(row.item)"
          href="javascript:void(0);"
          class="action-icon text-primary"
          title="Edit Details"
          v-b-tooltip.hover.top
          @click="openEditPage(row.item.id)"
        >
          <i class="mdi mdi-home-edit-outline" style="font-size:22px"></i>
        </a>
        <a
          href="javascript:void(0);"
          class="action-icon text-info ml-1"
          title="View On Map"
          v-b-tooltip.hover.top
          @click="selectApartment(row.item.id)"
        >
          <i class="mdi mdi-target" style="font-size:22px"></i>
        </a>
      </template>

      <template v-slot:cell(user)="row">
        {{ row.item.user.firstName }} {{ row.item.user.lastName }}
      </template>
    </b-table>
  </div>
</template>
