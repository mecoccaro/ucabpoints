<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Service Charge"
                  v-model="service_charge"
                  :rules="[rules.required]"
                  type="number"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Service Transfer"
                  v-model="service_transfer"
                  :rules="[rules.required]"
                  type="number"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Processor Commission"
                  v-model="processor"
                  :rules="[rules.required]"
                  type="number"
                />
              </v-col>
              <v-btn large class="base-button" dark @click="submit"
                >submit</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ errorTittle }}</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ successTittle }}</v-card-title>
        <v-card-text>{{ successMessage }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mask } from "vue-the-mask";
import { APICaller } from "../../services";

export default {
  name: "Service",
  props: {},
  directives: { mask },
  data: () => ({
    commission: {},
    valid: true,
    service_charge: 0,
    service_transfer: 0,
    processor: 0,
    select: null,
    commissionId: 0,
    actualNumber: "",
    actualDate: new Date().toISOString().substr(0, 10),
    errorTittle: "",
    errorMessage: "",
    successTittle: "",
    successMessage: "",
    dialog: false,
    rules: {
      required: (value) => !!value || "Required",
    },
  }),

  methods: {
    getLastCommission() {
      const action = {
        type: "GET_LAST_COMMISSION",
        payload: {},
      };

      APICaller(action, (response, error) => {
        if (!error) {
          this.commission = response;

          this.service_charge = this.commission.serviceCharge;
          this.service_transfer = this.commission.serviceTransfer;
          this.processor = this.commission.processor;
        } else {
          if (error.message === "Network Error") {
            this.dialogTittle = "Network Error";
            this.dialogMessage =
              "At this time it is not possible to establish a connection, please try later.";
            this.dialog = true;
          }
        }
      });
    },

    submit() {
      const action = {
        type: "SERVICE",
        payload: {
          commission: {
            service_charge: this.service_charge,
            service_transfer: this.service_transfer,
            processor: this.processor,
            dateOfCreation: this.actualDate,
          },
        },
      };
      APICaller(action, (response, error) => {
        if (!error) {
          this.$router.push("/adminService");
          this.successTittle = "Success";
          this.successMessage = "Commissions updated";
          this.dialog = true;
        } else {
          if (error.message === "Network Error") {
            this.errorTittle = "Network Error";
            this.errorMessage =
              "At this time it is not possible to establish a connection, please try later.";
            this.dialog = true;
          } else if (error.message === "Request failed with status code 401") {
            this.errorTittle = "Validation Error";
            this.errorMessage = "The data entered is not correct, try again.";
            this.dialog = true;
          } else if (error.message === "Request failed with status code 500") {
            this.errorTittle = "Incorrect Data";
            this.errorMessage = "The data entered is not correct, try again.";
            this.dialog = true;
          } else if (error.message === "") {
            //atributo unico
            this.errorTittle = "Unique attribute";
            this.errorMessage = "The data entered is not correct, try again.";
            this.dialog = true;
          }
        }
      });
    },
  },
};
</script>
