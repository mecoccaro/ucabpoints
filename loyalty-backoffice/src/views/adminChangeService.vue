<template>
    <v-container fluid class="admin-container-home">
        <v-row>
            <Navbar />
        </v-row>
        <v-row justify="center">
            <Service />
        </v-row>
        <v-row>
            <Footer />
        </v-row>
    </v-container>
</template>

<script>
    import Footer from "../components/Home/adminFooter";
    import Navbar from "../components/Home/adminNavbar";
    import Service from "../components/configuration/Service";

    export default {
        name: "adminChangeService",
        components: {
            Footer,
            Navbar,
            Service
        }
    }
</script>

<style lang="scss">
    @import './src/styles/adminMain.scss';
</style>