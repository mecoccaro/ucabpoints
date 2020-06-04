<template>
  <v-container class="localiza" align="right">
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn  icon v-on="on">
          <v-icon class="localiza-icon">mdi-map-marker-multiple</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="idioma in idiomas"
          :key="idioma.title"
          @click="change(idioma.sh)"
        >
          <v-list-item-title>{{ $t(idioma.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
    export default {
        name: "changeLang",
      data: () => ({
        idiomas: [{ title: 'Spanish',sh: 'es' }, { title: 'English',sh: 'en'  }]
      }),
      methods:{
        change(lang){
          this.$i18n.locale = lang
          return lang
        }
      }
    }
</script>

