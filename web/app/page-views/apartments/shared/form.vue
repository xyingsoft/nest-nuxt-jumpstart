<script lang="ts">
import Vue from 'vue'
import { Apartment } from '../shared/interfaces'
import { getLatLngFromAddress } from '~/common/geocoder'

export default Vue.extend({
  props: {
    item: {
      type: Object
    },
    validationRules: {
      type: Object
    },
    submitAction: {
      type: Function
    },
    title: {
      type: String
    },
    isEditMode: {
      type: Boolean
    },
    deleteAction: {
      required: false,
      type: Function
    }
  },
  data() {
    return {
      submitted: false,
      addressPlaceholder: ""
    }
  },
  validations() {
    return {
      item: this.validationRules
    }
  },
  methods: {
    openList() {
      this.$router.push('/apartments')
    },
    submitForm() {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.submitAction()
    },
    async handleChangeAddress() {
      const [lat, lng] = await getLatLngFromAddress(this.addressPlaceholder)
      
      this.item.latitude = lat
      this.item.longitude = lng
      this.$forceUpdate()
    }
  }
})
</script>

<template>
  <b-form    
    ref="create-apartment"
    @submit.prevent="submitForm"
  >
    <b-card>
      <b-card-title>
        {{ this.title }}
      </b-card-title>
      <b-row>
        <b-col>
          <b-form-group
            label="Name:"
          >
            <b-form-input
              id="name"
              v-model="item.name"
              name="name"
              type="text"
              placeholder="Name"
              :class="{
                'is-invalid': submitted && $v.item.name.$error
              }"
            />

            <div
              v-if="submitted && $v.item.name.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.item.name.required">
                Required
              </span>
            </div>
          </b-form-group>

          <b-form-group
            label="Description:"
          >
            <b-form-textarea
              id="description"
              v-model="item.description"
              name="description"
            ></b-form-textarea>
          </b-form-group>

          <b-row>
            <b-col 
              cols="12" 
              md="6"
            >
              <b-form-group
                label="Price per month:"
              >
                <b-form-input
                  id="pricePerMonth"
                  v-model.number="item.pricePerMonth"
                  name="pricePerMonth"
                  type="text"
                  placeholder="Price per month"
                  :class="{
                    'is-invalid': submitted && $v.item.pricePerMonth.$error
                  }"
                ></b-form-input>

                <div
                  v-if="submitted && $v.item.pricePerMonth.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.item.pricePerMonth.required">
                    Required
                  </span>
                </div>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label="Floor area size:"
              >
                <b-form-input
                  id="floorAreaSize"
                  v-model.number="item.floorAreaSize"
                  name="floorAreaSize"
                  type="text"
                  placeholder="Floor area size"
                  :class="{
                    'is-invalid': submitted && $v.item.floorAreaSize.$error
                  }"
                ></b-form-input>

                <div
                  v-if="submitted && $v.item.floorAreaSize.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.item.floorAreaSize.required">
                    Required
                  </span>
                </div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Number of rooms:"
              >
                <b-form-input
                  id="numberOfRooms"
                  v-model.number="item.numberOfRooms"
                  name="numberOfRooms"
                  type="number"
                  placeholder="Number of rooms"
                  :class="{
                    'is-invalid': submitted && $v.item.numberOfRooms.$error
                  }"
                />

                <div
                  v-if="submitted && $v.item.numberOfRooms.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.item.numberOfRooms.required">
                    Required
                  </span>
                </div>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group>
            <b-form-input
              placeholder="Input full address or zipcode"
              v-model="addressPlaceholder"
              @change="handleChangeAddress"
            />
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                label="Latitude:"
              >
                <b-form-input
                  id="latitude"
                  v-model.number="item.latitude"
                  name="latitude"
                  type="text"
                  placeholder="Latitude"
                  :class="{
                    'is-invalid': submitted && $v.item.latitude.$error
                  }"
                ></b-form-input>

                <div
                  v-if="submitted && $v.item.latitude.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.item.latitude.required">
                    Required
                  </span>
                </div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Longitude:"  
              >
                <b-form-input
                  id="longitude"
                  v-model.number="item.longitude"
                  name="longitude"
                  type="text"
                  placeholder="Longitude"
                  :class="{
                    'is-invalid': submitted && $v.item.longitude.$error
                  }"
                ></b-form-input>

                <div
                  v-if="submitted && $v.item.longitude.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.item.longitude.required">
                    Required
                  </span>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      
      <b-form-group>
        <b-button 
          variant="danger" 
          @click="deleteAction"
        >
          Delete
        </b-button>
        <b-button 
          class="float-right"
          type="submit"
          variant="warning"
        >
          Submit
        </b-button>
        <b-button 
          class="float-right mr-2"
          variant="secondary" 
          @click="openList"
        >
          Back
        </b-button>
      </b-form-group>
    </b-card>
  </b-form>
</template>