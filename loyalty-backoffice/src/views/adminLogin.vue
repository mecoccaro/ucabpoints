<template>
    <v-container fluid class="container-login">
        <v-row justify="space-between" align="center" class="content-login">
            <v-col xs="12" md="7">
                <AdminLoginLogo />
            </v-col>
            <v-col xs="12" md="5">
                <AdminLogin />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AdminLogin from "../components/LoginForm/adminLogin";
import AdminLoginLogo from "../components/LoginLogo/adminLoginLogo";

export default {
    name: 'adminLogin',
    components: {
        AdminLoginLogo,
        AdminLogin
    }
}
</script>

<style lang="scss">
    @import '../styles/adminMain.scss';
</style>
