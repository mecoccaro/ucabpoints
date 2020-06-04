<template>
    <v-container>
        <v-app-bar app color="navbar" dark>
            <v-app-bar-nav-icon color="white" @click="drawer = true"></v-app-bar-nav-icon>
            <v-img src="../../assets/Isotipowhite.png" max-width="40" max-height="40" />
            <v-col cols="5">
                <v-img src="../../assets/Logotipowhite.png" max-width="130" max-height="130" />
            </v-col>
            <v-spacer></v-spacer>
            <v-btn color="white" icon>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary clipped color="white">
            <v-list-item>
                <v-list-item-content>
                    <v-row align="center" justify="center">
                        <v-avatar>
                            <v-btn fab color="grey">
                                <v-icon color="white">mdi-account-circle</v-icon>
                            </v-btn>
                        </v-avatar>
                        <v-divider></v-divider>
                    </v-row>
                </v-list-item-content>
            </v-list-item>
            <v-list dense nav>
                <v-list-item v-for="principal in principals" :key="principal.item" :to="principal.link">
                    <v-list-item-icon>
                        <v-icon>{{ principal.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title >{{ principal.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group
                    prepend-icon="mdi-cog"
                    value="true"
                    >
                    <template v-slot:activator>
                        <v-list-item-title>Parameters</v-list-item-title>
                    </template>
                    <v-list-item v-for="item in items" :key="item.title" :to="item.link">
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
            <template v-slot:append>
                <div class="pa-1">
                    <v-list-item-content>
                        <v-row align="center" justify="center">
                            <v-img src="../../assets/Isotipo.png" max-height="50" max-width="50" class="adminLogo"></v-img>
                        </v-row>
                    </v-list-item-content>
                </div>
            </template>
        </v-navigation-drawer>
    </v-container>
</template>
<script>
    export default {
        name: 'adminNavbar',
        data: () => ({
            drawer: false,
            idiomas: [{ title: 'Spanish' }, { title: 'English' }],
            principals:[
                { title: 'Home', icon: 'mdi-view-dashboard', link: '/adminHome'},
                { title: 'Users', icon: 'mdi-account-multiple-outline', link: ''},
                { title: 'Administrators', icon: ' mdi-account-key',link: ''}
            ],
            items: [
                { title: 'Commissions', icon: 'mdi-cash-plus',link: '/adminService'},
                { title: 'Points equivalence', icon: 'mdi-swap-horizontal-bold',link: '/adminPoints'}
            ]
        })
    }
</script>


<style lang="scss">
    @import '../../styles/adminMain.scss';
</style>