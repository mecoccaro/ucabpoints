<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <header justify="center" align="center" class="title">
          {{ $t('Buy') }}
        </header>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row justify="space-between" align="center">
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined
                  name="Points"
                  v-model="points"
                  v-mask="['##########']"
                  type="text"
                  :rules="[rules.required]"
                  @change="getDollars"
                >
                  <template v-slot:label>{{ $t('OnePoint') }}</template>
                </v-text-field>
              </v-col>
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined
                  name="Dollars"
                  v-model="dollars"
                  type="number"
                  prepend-inner-icon="fa-dollar-sign"
                  :rules="[rules.required]"
                  readonly
                >
                  <template v-slot:label>{{ $t('Dollars') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  outlined
                  name="BankAccount"
                  item-value="id"
                  v-model="account"
                  :items="accounts"
                  :rules="[rules.required]"
                  ><template v-slot:label>{{ $t('Bank Account') }}</template>
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->
                    {{ data.item.accountNumber }} -
                    {{ data.item.routingNumber }}
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    {{ data.item.accountNumber }} -
                    {{ data.item.routingNumber }}
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col cols="5">
        <v-btn large block class="base-button" dark @click="submit">{{
          $t('Buy')
        }}</v-btn>
      </v-col>
      <v-col cols="5">
        <v-btn large block color="grey darken-2" dark @click="cancel">{{
          $t('CancelButton')
        }}</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="continueDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">{{ continueDialogTittle }}</v-card-title>
        <v-card-text>{{ continueDialogMessage }}</v-card-text>
        <v-card-actions justify="space-around">
          <v-btn color="green darken-1" text @click="cont">{{
            $t('Continue')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ dialogTittle }}</v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
      </v-card>
    </v-dialog>
    <template>
      <vue-html2pdf
        :show-layout="false"
        :enable-download="false"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="receive"
        :pdf-quality="2"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content" style="align-content: center;">
          <html
            data-editor-version="2"
            class="sg-campaigns"
            xmlns="http://www.w3.org/1999/xhtml"
          >
            <head>
              <meta
                http-equiv="Content-Type"
                content="text/html; charset=utf-8"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
              />
              <!--[if !mso]><!-->
              <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
            </head>
            <body>
              <center
                class="wrapper"
                data-link-color="#1188E6"
                data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"
              >
                <div class="webkit">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                    class="wrapper"
                    bgcolor="#FFFFFF"
                  >
                    <tr>
                      <td valign="top" bgcolor="#FFFFFF" width="100%">
                        <table
                          width="100%"
                          role="content-container"
                          class="outer"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                        >
                          <tr>
                            <td width="100%">
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tr>
                                  <td>
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="width: 100%; max-width: 600px;"
                                      align="center"
                                    >
                                      <tr>
                                        <td
                                          role="modules-container"
                                          style="
                                            padding: 0px 0px 0px 0px;
                                            color: #000000;
                                            text-align: left;
                                          "
                                          bgcolor="#FFFFFF"
                                          width="100%"
                                          align="left"
                                        >
                                          <table
                                            class="module preheader preheader-hide"
                                            role="module"
                                            data-type="preheader"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              display: none !important;
                                              mso-hide: all;
                                              visibility: hidden;
                                              opacity: 0;
                                              color: transparent;
                                              height: 0;
                                              width: 0;
                                            "
                                          >
                                            <tr>
                                              <td role="module-content">
                                                <p></p>
                                              </td>
                                            </tr>
                                          </table>
                                          <table
                                            class="wrapper"
                                            role="module"
                                            data-type="image"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="99407e61-e422-4a3e-8572-5c1cab2324b2"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-size: 6px;
                                                    line-height: 10px;
                                                    padding: 0px 0px 0px 0px;
                                                  "
                                                  valign="top"
                                                  align="center"
                                                >
                                                  <img
                                                    class="max-width"
                                                    border="0"
                                                    style="
                                                      display: block;
                                                      color: #000000;
                                                      text-decoration: none;
                                                      font-family: Helvetica,
                                                        arial, sans-serif;
                                                      font-size: 16px;
                                                      max-width: 100% !important;
                                                      width: 100%;
                                                      height: auto !important;
                                                    "
                                                    width="600"
                                                    alt=""
                                                    data-proportionally-constrained="true"
                                                    data-responsive="true"
                                                    src="../../assets/Imagotipo.png"
                                                  />
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="spacer"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="2bb9fe24-9d07-4fbe-8d53-986e025911a5"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px 0px 30px 0px;
                                                  "
                                                  role="module-content"
                                                  bgcolor=""
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="divider"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="30fb0ab1-1ee2-4e87-8e59-9bdd10571030.1"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px 0px 0px 0px;
                                                  "
                                                  role="module-content"
                                                  height="100%"
                                                  valign="top"
                                                  bgcolor=""
                                                >
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    align="center"
                                                    width="100%"
                                                    height="30px"
                                                    style="
                                                      line-height: 30px;
                                                      font-size: 30px;
                                                    "
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0px 0px
                                                              30px 0px;
                                                          "
                                                          bgcolor="#86b037"
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="spacer"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="712beda1-dc95-41ee-9ae0-e7bc62506754"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px 0px 30px 0px;
                                                  "
                                                  role="module-content"
                                                  bgcolor=""
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="text"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="ff4bca71-1064-4838-b67e-71a13643af36"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 18px 0px 18px 0px;
                                                    line-height: 22px;
                                                    text-align: inherit;
                                                  "
                                                  height="100%"
                                                  valign="top"
                                                  bgcolor=""
                                                  role="module-content"
                                                >
                                                  <div>
                                                    <h1
                                                      style="
                                                        text-align: center;
                                                      "
                                                    >
                                                      RECEIVE
                                                    </h1>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <br />
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <strong
                                                        >POINTS=
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                          points
                                                        }}</strong
                                                      >
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <strong
                                                        >COMMISSION=
                                                        $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                          totalCommission
                                                        }}</strong
                                                      >
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <strong
                                                        >TOTAL WITHOUT
                                                        COMMISSION=
                                                        $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                          dollars
                                                        }}</strong
                                                      >
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <br />
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <br />
                                                    </div>
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                        text-align: center;
                                                      "
                                                    >
                                                      <strong
                                                        >TOTAL=
                                                        $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                          Total
                                                        }}</strong
                                                      >
                                                    </div>
                                                    <div></div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="spacer"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="fdaf4d1d-0939-4242-aaf7-e62e94bd536a"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px 0px 30px 0px;
                                                  "
                                                  role="module-content"
                                                  bgcolor=""
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            class="module"
                                            role="module"
                                            data-type="divider"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="table-layout: fixed;"
                                            data-muid="30fb0ab1-1ee2-4e87-8e59-9bdd10571030"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px 0px 0px 0px;
                                                  "
                                                  role="module-content"
                                                  height="100%"
                                                  valign="top"
                                                  bgcolor=""
                                                >
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    align="center"
                                                    width="100%"
                                                    height="30px"
                                                    style="
                                                      line-height: 30px;
                                                      font-size: 30px;
                                                    "
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0px 0px
                                                              30px 0px;
                                                          "
                                                          bgcolor="#86b037"
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </center>
            </body>
          </html>
        </section>
      </vue-html2pdf>
    </template>
  </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'
import { APICaller } from '../../services/index'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'BuyPoints',
  props: {},
  directives: { mask },
  data: () => ({
    valid: true,
    points: '',
    dollars: 0,

    account: '',
    accounts: [],

    dollarPoints: 0,
    commission: {},
    totalCommission: 0,
    user: {},
    statusId: 0,
    dialogTittle: '',
    dialogMessage: '',
    dialog: false,
    Total: 0,
    continueDialogTittle: '',
    continueDialogMessage: '',
    continueDialog: false,
    html2Pdf: '',
    rules: {
      required: (value) => !!value || 'Required'
    }
  }),
  components: {
    VueHtml2pdf
  },

  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getAccounts()
    this.getPrimaryAccount()
    this.getDollarPoints()
    this.getStatus()
    this.getLastCommission()
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
      this.Total =
        this.dollars +
        (this.dollars * (Number(this.commission.serviceCharge) / 100) +
          Number(this.commission.processor))
      this.totalCommission =
        this.dollars * (Number(this.commission.serviceCharge) / 100) +
        Number(this.commission.processor)
    },
    hasGenerated(blob) {
      var formData = new FormData()
      formData.append('file', blob, 'receive')
      const action = {
        type: 'SEND_FILE',
        payload: {
          formData: formData,
          userId: this.user.user.id
        }
      }
      APICaller(action, (response, error) => {
        if (!error) {
          this.continueDialogTittle = 'Bought points.'
          this.continueDialogMessage = 'Email has been sent.'
          this.continueDialog = true
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.dialogTittle = 'Validation Error'
            this.dialogMessage = 'The data entered is not correct, try again.'
            this.dialog = true
          } else if (error.message === 'Request failed with status code 500') {
            this.dialogTittle = 'Invalid Data/Internal Error'
            this.dialogMessage =
              'The data entered is not correct (Maybe the amount is very big) or there are problems with the connection, try again.'
            this.dialog = true
          }
        }
      })
    },

    cont() {
      this.$router.push('/home')
    },

    getStatus() {
      const action = {
        type: 'GET_STATUS',
        payload: {
          status: {
            name: 'PENDING',
            type: 'TRANSACTION'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.statusId = response.id
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getDollars() {
      this.dollars = Number(
        (this.points / Number(this.dollarPoints)).toFixed(2)
      )
    },

    getAccounts() {
      const action = {
        type: 'GET_ACCOUNTS_STATUS',
        payload: {
          user: {
            id: this.user.user.id,
            status: 'VERIFIED'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.accounts = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getPrimaryAccount() {
      const action = {
        type: 'GET_PRIMARY_ACCOUNT',
        payload: {
          user: {
            id: this.user.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.account = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getDollarPoints() {
      const action = {
        type: 'GET_DOLLAR_POINTS',
        payload: {}
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.dollarPoints = response.anAIsSoManyB
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getLastCommission() {
      const action = {
        type: 'GET_LAST_COMMISSION',
        payload: {}
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.commission = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    validate() {
      this.valid = this.$refs.form.validate()
    },
    cancel() {
      this.$router.go(-1)
    },

    insertStatusTransaction() {
      const action = {
        type: 'INSERT_STATUS_TRANSACTION',
        payload: {
          status: {
            status: this.statusId,
            transaction: this.transactionId
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.continueDialogTittle = 'Bought points.'
          this.continueDialogMessage = 'The points where bought correctly.'
          this.continueDialog = true
          //this.$router.push('/home')
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    insertAmount() {
      const action = {
        type: 'INSERT_AMOUNT',
        payload: {
          amount: {
            points: this.points,
            addedAmount: this.dollars,
            serviceCommission:
              this.dollars * (Number(this.commission.serviceCharge) / 100),
            processCommission: Number(this.commission.processor),
            transaction: this.transactionId
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.insertStatusTransaction()
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    submit() {
      this.validate()
      const ac = this.accounts.find((a) => (a.id = this.account))

      if (this.valid) {
        const action = {
          type: 'BUY_POINTS',
          payload: {
            transaction: {
              accountId: ac.id,
              type: 'BUY_POINTS',
              points: this.points,
              dateCreation: new Date(),
              lastDateUpdate: new Date()
            },
            amount: this.dollars,
            accountStripe: ac.customerSourceStripe,
            amountTotal:
              this.dollars +
              (this.dollars * (Number(this.commission.serviceCharge) / 100) +
                Number(this.commission.processor)),
            customerStripe: this.user.user.customerStripe
          }
        }
        APICaller(action, (response, error) => {
          if (!error) {
            this.transactionId = response.id
            this.generateReport()
            this.insertAmount()
          } else {
            if (error.message === 'Network Error') {
              this.dialogTittle = 'Network Error'
              this.dialogMessage =
                'At this time it is not possible to establish a connection, please try later.'
              this.dialog = true
            } else if (
              error.message === 'Request failed with status code 401'
            ) {
              this.dialogTittle = 'Validation Error'
              this.dialogMessage = 'The data entered is not correct, try again.'
              this.dialog = true
            } else if (
              error.message === 'Request failed with status code 500'
            ) {
              this.dialogTittle = 'Invalid Data/Internal Error'
              this.dialogMessage =
                'The data entered is not correct (Maybe the amount is very big) or there are problems with the connection, try again.'
              this.dialog = true
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
body,
p,
div {
  font-family: arial, helvetica, sans-serif;
  font-size: 14px;
}
body {
  color: #000000;
}
body a {
  color: #1188e6;
  text-decoration: none;
}
p {
  margin: 0;
  padding: 0;
}
table.wrapper {
  width: 100% !important;
  table-layout: fixed;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
img.max-width {
  max-width: 100% !important;
}
.column.of-2 {
  width: 50%;
}
.column.of-3 {
  width: 33.333%;
}
.column.of-4 {
  width: 25%;
}
@media screen and (max-width: 480px) {
  .preheader .rightColumnContent,
  .footer .rightColumnContent {
    text-align: left !important;
  }
  .preheader .rightColumnContent div,
  .preheader .rightColumnContent span,
  .footer .rightColumnContent div,
  .footer .rightColumnContent span {
    text-align: left !important;
  }
  .preheader .rightColumnContent,
  .preheader .leftColumnContent {
    font-size: 80% !important;
    padding: 5px 0;
  }
  table.wrapper-mobile {
    width: 100% !important;
    table-layout: fixed;
  }
  img.max-width {
    height: auto !important;
    max-width: 100% !important;
  }
  a.bulletproof-button {
    display: block !important;
    width: auto !important;
    font-size: 80%;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .columns {
    width: 100% !important;
  }
  .column {
    display: block !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .social-icon-column {
    display: inline-block !important;
  }
}
</style>
