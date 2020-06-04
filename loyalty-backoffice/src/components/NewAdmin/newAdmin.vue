<template>
    <v-col cols="12">
        <v-row>
            <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        label="First Name"
                                        name="FirstName"
                                        v-model="firstName"
                                        type="text"
                                        :rules="[rules.required]"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        label="Second Name"
                                        name="SecondName"
                                        v-model="secondName"
                                        type="text"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        label="First Last Name"
                                        name="FirstLastName"
                                        v-model="firstLastName"
                                        type="text"
                                        :rules="[rules.required]"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        label="Second Last Name"
                                        name="SecondLastName"
                                        v-model="secondLastName"
                                        type="text"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        outlined
                                        label="Cedula"
                                        name="Cedula"
                                        v-model="cedula"
                                        type="text"
                                        v-mask="['###.###', '#.###.###', '##.###.###', '###.###.###']"
                                        :rules="[rules.required, rules.cedula]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        outlined
                                        label="Email"
                                        name="Email"
                                        v-model="email"
                                        type="text"
                                        :rules="[rules.required, rules.email]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        id="Password"
                                        label="Password"
                                        name="Password"
                                        v-model="password"
                                        :type="show1 ? 'text' : 'password'"
                                        :append-icon="show1 ? 'fa-eye' : 'fa-eye-slash'"
                                        @click:append="show1 = !show1"
                                        :rules="[rules.required]"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        outlined
                                        id="RepeatPassword"
                                        label="Repeat Password"
                                        name="RepeatPassword"
                                        v-model="repeatPassword"
                                        :type="show2 ? 'text' : 'password'"
                                        :append-icon="show2 ? 'fa-eye' : 'fa-eye-slash'"
                                        @click:append="show2 = !show2"
                                        :rules="[rules.required, passwordConfirmationRule]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                        outlined
                                        label="Country"
                                        name="Country"
                                        v-model="country"
                                        :items="countries"
                                        :rules="[rules.required]"
                                        @change="getStates()"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                        outlined
                                        label="State"
                                        name="State"
                                        v-model="state"
                                        :items="states"
                                        :rules="[rules.required]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        outlined
                                        label="Address"
                                        name="Adress"
                                        v-model="address"
                                        type="text"
                                        :rules="[rules.required]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                outlined
                                                v-model="date"
                                                label="Date of birth"
                                                append-icon="fa-calendar-day"
                                                @click:append="menu = !menu"
                                                v-on="on"
                                                :rules="[rules.required]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn large block color="#42581a" dark @click="submit">Sign in</v-btn>
            </v-col>
        </v-row>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">{{ errorTittle }}</v-card-title>
                <v-card-text>{{ errorMessage }}</v-card-text>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
    import { mask } from 'vue-the-mask'
    import {APICaller} from "../../services";

    export default {
        name: 'addAdmin',
        props: {},
        directives: { mask },
        data: () => ({
            valid: true,
            firstName: '',
            secondName: '',
            firstLastName: '',
            secondLastName: '',
            cedula: '',
            email: '',
            password: '',
            show1: false,
            repeatPassword: '',
            show2: false,
            placeType: 'STREET',
            country: '',
            countries: [],
            state: '',
            states: [],
            address: '',

            role: 'ADMINISTRATOR',
            roleId: 0,

            status: 'ACTIVE',
            statusType: 'USER',
            statusId: 0,

            errorTittle: '',
            errorMessage: '',
            dialog: false,

            date: new Date().toISOString().substr(0, 10),
            menu: false,
            lazy: false,

            rules: {
                required: (value) => !!value || 'Required',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail'
                },
                cedula: (value) => value.length < 6 && 'Invalid cedula (min 6 characters)'
            }
        }),

        beforeMount() {
            this.getRole()
            this.getStatus()
            this.getCountries()
        },

        methods: {
            passwordConfirmationRule() {
                return this.password === this.repeatPassword || 'Password must match'
            },

            getRole() {
                const action = {
                    type: 'GET_ROLE',
                    payload: {
                        role: {
                            name: this.role
                        }
                    }
                }

                APICaller(action, (response, error) => {
                    if (!error) {
                        this.roleId = response.id
                    } else {
                        if (error.message === 'Network Error') {
                            this.errorTittle = 'Network Error'
                            this.errorMessage =
                                'At this time it is not possible to establish a connection, please try later.'
                            this.dialog = true
                        }
                    }
                })
            },

            getStatus() {
                const action = {
                    type: 'GET_STATUS',
                    payload: {
                        status: {
                            name: this.status,
                            type: this.statusType
                        }
                    }
                }

                APICaller(action, (response, error) => {
                    if (!error) {
                        this.statusId = response.id
                    } else {
                        if (error.message === 'Network Error') {
                            this.errorTittle = 'Network Error'
                            this.errorMessage =
                                'At this time it is not possible to establish a connection, please try later.'
                            this.dialog = true
                        }
                    }
                })
            },

            getCountries() {
                const action = {
                    type: 'GET_PLACES',
                    payload: {
                        place: {
                            placeType: 'COUNTRY'
                        }
                    }
                }

                APICaller(action, (response, error) => {
                    if (!error) {
                        this.countries = response
                    } else {
                        if (error.message === 'Network Error') {
                            this.errorTittle = 'Network Error'
                            this.errorMessage =
                                'At this time it is not possible to establish a connection, please try later.'
                            this.dialog = true
                        }
                    }
                })
            },

            getStates() {
                const action = {
                    type: 'GET_PLACES_ID',
                    payload: {
                        place: {
                            id: this.country.id,
                            placeType: 'STATE'
                        }
                    }
                }

                APICaller(action, (response, error) => {
                    if (!error) {
                        this.states = response
                    } else {
                        if (error.message === 'Network Error') {
                            this.errorTittle = 'Network Error'
                            this.errorMessage =
                                'At this time it is not possible to establish a connection, please try later.'
                            this.dialog = true
                        }
                    }
                })
            },

            login() {
                this.$router.push('/')
            },

            validate() {
                this.valid = this.$refs.form.validate()
            },

            submit() {
                this.validate()

                if (this.valid) {
                    const action = {
                        type: 'REGISTER',
                        payload: {
                            user: {
                                email: this.email,
                                password: this.password,
                                roleId: this.roleId,
                                statusId: this.statusId
                            },
                            person: {
                                firstName: this.firstName,
                                secondName: this.secondName,
                                firstLastname: this.firstLastName,
                                secondLastname: this.secondLastname,
                                personalId: this.cedula,
                                dateOfBirth: this.date
                            },
                            place: {
                                name: this.address,
                                placeType: this.placeType,
                                father: this.state.id
                            }
                        }
                    }

                    APICaller(action, (response, error) => {
                        if (!error) {
                            this.$router.push('/home')
                        } else {
                            if (error.message === 'Network Error') {
                                this.errorTittle = 'Network Error'
                                this.errorMessage =
                                    'At this time it is not possible to establish a connection, please try later.'
                                this.dialog = true
                            } else if (
                                error.message === 'Request failed with status code 401'
                            ) {
                                this.errorTittle = 'Validation Error'
                                this.errorMessage = 'The data entered is not correct, try again.'
                                this.dialog = true
                            } else if (
                                error.message === 'Request failed with status code 500'
                            ) {
                                this.errorTittle = 'Incorrect Data'
                                this.errorMessage = 'The data entered is not correct, try again.'
                                this.dialog = true
                            } else if (error.message === '') {
                                //atributo unico
                                this.errorTittle = 'Unique attribute'
                                this.errorMessage = 'The data entered is not correct, try again.'
                                this.dialog = true
                            }
                        }
                    })
                }
            },

        }
    }
</script>
