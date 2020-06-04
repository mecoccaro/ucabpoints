<template>
  <v-container align="center">
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="1 Dollar is equivalento to Points"
                    v-model="equivalence"
                    :rules="[rules.required]"
                    type="number"
                    class="mx-auto"
                  />
                </v-col>
                <v-col cols="6"> </v-col>
                <v-row>
                  <v-col cols="6">
                    <v-btn large class="base-button" dark @click="submit"
                      >submit</v-btn
                    >
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">{{ successTittle }}</v-card-title>
          <v-card-text>{{ successMessage }}</v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import { mask } from "vue-the-mask";
import { APICaller } from "../../services";

export default {
  name: "Points equivalence",
  props: {},
  directives: { mask },
  data: () => ({
    dollarPoints: 0,
    valid: true,
    equivalence: 0,
    unit_a: "DOLLAR",
    unit_b: "POINT",
    actualDate: new Date().toISOString().substr(0, 10),
    select: null,
    checkbox: false,
    successTittle: "",
    successMessage: "",
    id: 0,
    rules: {
      required: (value) => !!value || "Required",
    },
  }),
  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getDollarPoints();
  },

  methods: {
    getDollarPoints() {
      const action = {
        type: "GET_DOLLAR_POINTS",
        payload: {},
      };

      APICaller(action, (response, error) => {
        if (!error) {
          this.dollarPoints = response.anAIsSoManyB;
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
        type: "POINTS",
        payload: {
          conversion: {
            equivalence: this.equivalence,
            unit_a: this.unit_a,
            unit_b: this.unit_b,
            dateOfCreation: this.actualDate,
          },
        },
      };
      APICaller(action, (response, error) => {
        if (!error) {
          this.$router.push("/adminPoints");
          this.successTittle = "Success";
          this.successMessage = "Conversion update";
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

<style scoped></style>
