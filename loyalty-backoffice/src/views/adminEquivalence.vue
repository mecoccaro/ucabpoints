<template>
    <v-container fluid class="admin-container-home">
        <v-row>
            <Navbar />
        </v-row>
        <v-row justify="center">
            <Points />
        </v-row>
        <v-row>
            <Footer />
        </v-row>
    </v-container>
</template>

<script>
    import Footer from "../components/Home/adminFooter";
    import Navbar from "../components/Home/adminNavbar";
    import Points from "../components/configuration/PointsEquivalence";

    export default {
        name: "adminChangeService",
        components: {
            Footer,
            Navbar,
            Points
        }
    }
</script>

<style lang="scss">
    @import './src/styles/adminMain.scss';
</style>