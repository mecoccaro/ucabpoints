<template>
    <v-col cols="12">
        <v-row>
            <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
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
                            <v-col cols="12">
                                <v-text-field
                                        outlined
                                        id="Password"
                                        label="Password"
                                        name="Password"
                                        v-model="password"
                                        :type="show ? 'text' : 'password'"
                                        :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                                        @click:append="show = !show"
                                        :rules="[rules.required]"
                                />
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
    import {APICaller} from "../../services";

    export default {
        name: 'adminLogin',
        props: {},
        data: () => ({
            valid: true,
            email: '',
            password: '',
            show: false,
            errorTittle: '',
            errorMessage: '',
            dialog: false,
            rules: {
                required: (value) => !!value || 'Required',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail'
                }
            }
        }),

        methods: {
            validate() {
                this.valid = this.$refs.form.validate()
            },
            submit() {
                this.validate()

                if (this.valid) {
                    const action = {
                        type: 'LOGIN',
                        payload: {
                            user: { email: this.email, password: this.password }
                        }
                    }

                    APICaller(action, (response, error) => {
                        if (!error) {
                            this.$router.push('/adminHome')
                        } else {
                            if (error.message === 'Network Error') {
                                this.errorTittle = 'Network Error'
                                this.errorMessage =
                                    'At this time it is not possible to establish a connection, please try later.'
                                this.dialog = true
                            } else if (
                                error.message === 'Request failed with status code 401'
                            ) {
                                this.errorTittle = 'Validation Error '
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