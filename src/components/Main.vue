<template>
  <div>
    <div
      class="d-none d-md-inline-flex"
      style="position: fixed; top: 50vh; transform: translate(0, -50%)"
    >
      <v-img
        class="fill-height"
        contain
        src="../assets/festival.png"
        max-width="50vw"
        max-height="60vh"
      >
      </v-img>
    </div>
    <v-container class="d-inline-flex" fluid>
      <v-row justify="center">
        <v-col class="d-none d-md-inline-flex" md="6"> </v-col>
        <v-col sm="10" md="6">
          <v-card :loading="carregando">
            <v-card-title class="pb-0"> Inscreva-se </v-card-title>
            <validation-observer ref="observer">
              <v-form @submit.prevent="enviar">
                <v-card-text class="py-0">
                  <v-container class="pb-0">
                    <v-row justify="center">
                      <v-radio-group
                        v-model="form.categoria"
                        row
                        mandatory
                        label="Categoria:"
                      >
                        <v-radio label="Solo" value="solo"></v-radio>
                        <v-radio label="Dupla/banda" value="banda"></v-radio>
                      </v-radio-group>
                    </v-row>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|alpha_spaces"
                      :name="'nome do ' + tipo"
                    >
                      <v-text-field
                        v-model="form.nome"
                        :error-messages="errors"
                        :label="'Nome do ' + tipo + '*'"
                        prepend-icon="mdi-account"
                        ref="nome"
                        required
                      >
                      </v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      :name="'nome artístico d' + grupo"
                    >
                      <v-text-field
                        v-model="form.nome_art"
                        :error-messages="errors"
                        :label="'Nome artístico d' + grupo + '*'"
                        prepend-icon="mdi-microphone-variant"
                        required
                      >
                      </v-text-field>
                    </validation-provider>

                    <v-row justify="center">
                      <v-radio-group
                        v-model="form.musica"
                        label="Música: "
                        row
                        mandatory
                      >
                        <v-radio label="Autoral" value="autoral"></v-radio>
                        <v-radio label="Intérprete" value="int"></v-radio>
                      </v-radio-group>
                    </v-row>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|email"
                      :name="'e-mail do ' + tipo"
                    >
                      <v-text-field
                        v-model="form.email"
                        :error-messages="errors"
                        :label="'E-mail do ' + tipo + '*'"
                        prepend-icon="mdi-at"
                        required
                      >
                      </v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|cpf"
                      :name="'cpf do ' + tipo"
                    >
                      <v-text-field
                        v-model="cpf"
                        :error-messages="errors"
                        :label="'CPF do ' + tipo + '*'"
                        prepend-icon="mdi-numeric"
                        type="tel"
                        v-mask="'###.###.###-##'"
                        required
                      >
                      </v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="date_required|not_minor"
                      :name="'data de nascimento do ' + tipo"
                    >
                      <v-text-field
                        v-model="form.dt_nasc"
                        :error-messages="errors"
                        :label="'Data de nascimento do ' + tipo + '*'"
                        prepend-icon="mdi-calendar"
                        type="date"
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                      name="Documento com foto (frente)"
                    >
                      <v-sheet
                        @drop.prevent="dropFile($event, 'doc_id_frente')"
                        @dragover.prevent
                      >
                        <v-file-input
                          v-model="form.doc_id_frente"
                          :error-messages="errors"
                          label="Documento com foto (frente)*"
                          prepend-icon="mdi-card-account-details"
                          accept="image/*,.pdf"
                          persistent-hint
                          :hint="dica + ' (imagem ou pdf)'"
                          required
                        ></v-file-input>
                      </v-sheet>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                      name="Documento com foto (verso)"
                    >
                      <v-sheet
                        @drop.prevent="dropFile($event, 'doc_id_verso')"
                        @dragover.prevent
                      >
                        <v-file-input
                          v-model="form.doc_id_verso"
                          :error-messages="errors"
                          label="Documento com foto (verso)*"
                          prepend-icon="mdi-card-text"
                          accept="image/*,.pdf"
                          persistent-hint
                          :hint="dica + ' (imagem ou pdf)'"
                          required
                        ></v-file-input>
                      </v-sheet>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                    >
                      <v-sheet
                        @drop.prevent="dropFile($event, 'comp_res')"
                        @dragover.prevent
                      >
                        <v-file-input
                          v-model="form.comp_res"
                          :error-messages="errors"
                          label="Comprovante de residência (últimos 3 meses)*"
                          prepend-icon="mdi-home"
                          accept="image/*,.pdf"
                          persistent-hint
                          :hint="dica + ' (imagem ou pdf)'"
                          required
                        ></v-file-input>
                      </v-sheet>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:text/plain,.odt,.rtf,.txt,.doc,.docx,.pdf"
                      name="Letra da música"
                    >
                      <v-sheet
                        @drop.prevent="dropFile($event, 'letra')"
                        @dragover.prevent
                      >
                        <v-file-input
                          v-model="form.letra"
                          :error-messages="errors"
                          label="Letra da música*"
                          prepend-icon="mdi-playlist-music"
                          accept="text/plain,.odt,.rtf,.doc,.docx,.pdf"
                          persistent-hint
                          :hint="
                            dica + ' (.txt, .odt, .rtf, .doc, .docx ou .pdf)'
                          "
                          required
                        ></v-file-input>
                      </v-sheet>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:video/*"
                      name="Vídeo"
                      ref="video"
                    >
                      <div
                        @drop.prevent="dropFile($event, 'video')"
                        @dragover.prevent
                      >
                        <v-file-input
                          v-model="form.video"
                          :error-messages="errors"
                          label="Vídeo*"
                          prepend-icon="mdi-file-video"
                          accept="video/*"
                          persistent-hint
                          :hint="dica"
                          required
                        >
                        </v-file-input>
                      </div>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      :rules="{ check_required: { allowFalse: false } }"
                    >
                      <v-checkbox
                        v-model="form.check"
                        :error-messages="errors"
                        required
                      >
                        <template v-slot:label>
                          <div>
                            Li e aceito os termos do
                            <a
                              target="_blank"
                              href="https://unimedsudoeste.com.br/"
                              @click.stop
                            >
                              edital.
                            </a>
                            <v-icon small color="primary"
                              >mdi-open-in-new</v-icon
                            >
                          </div>
                        </template>
                      </v-checkbox>
                    </validation-provider>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" @click.stop="clear">
                    <v-icon>mdi-close</v-icon>
                    Limpar
                  </v-btn>
                  <v-btn color="primary" type="submit">
                    <v-icon>mdi-upload</v-icon>
                    Enviar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </validation-observer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    dica: "Clique para selecionar ou arraste um arquivo",
    carregando: false,
    cpf: "",
    form: {
      categoria: "",
      nome: "",
      nome_art: "",
      musica: "",
      email: "",
      cpf: "",
      dt_nasc: "",
      doc_id_frente: null,
      doc_id_verso: null,
      comp_res: null,
      letra: null,
      video: null,
      check: false,
    },
  }),
  computed: {
    tipo: function () {
      if (this.form.categoria == "solo") {
        return "candidato";
      }
      if (this.form.categoria == "banda") {
        return "responsável";
      }
      return null;
    },
    grupo: function () {
      if (this.form.categoria == "solo") {
        return "o cantor";
      }
      if (this.form.categoria == "banda") {
        return "a dupla/banda";
      }
      return null;
    },
  },
  methods: {
    dropFile(e, key) {
      this.form[key] = e.dataTransfer.files[0];
    },
    async enviar() {
      if (await this.$refs.observer.validate()) {
        let res = await this.$dialog.confirm({
          title: "Aviso",
          text: "Tem certeza que deseja confirmar a inscrição? Não será possível alterá-la depois",
          actions: {
            false: {
              text: "Cancelar",
              color: "warning",
            },
            true: {
              text: "Confirmar",
              color: "primary",
            },
          },
        });
        if (res) {
          this.carregando = true;
          this.axios
            .post("https://reqres.in/api/upload", this.form)
            .then(() => {
              this.$dialog.notify.success("Inscrição enviada com sucesso!");
            })
            .then(() => {
              this.clear();
            })
            .catch((e) => {
              console.log(e.response);
              this.$dialog.notify.error(
                "Não foi possível concluir a inscrição"
              );
            })
            .finally(() => {
              this.carregando = false;
            });
        }
      } else {
        this.$nextTick(() => {
          const el = this.$el.querySelector(
            ".v-messages.error--text:first-of-type"
          ).parentNode.parentNode.parentNode;
          this.$vuetify.goTo(el);
          return;
        });
      }
    },
    clear() {
      this.form.categoria = "solo";
      this.form.musica = "autoral";
      this.form.nome = "";
      this.form.nome_art = "";
      this.form.musica = "";
      this.form.email = "";
      this.cpf = "";
      this.form.cpf = "";
      this.form.dt_nasc = "";
      this.form.doc_id_frente = null;
      this.form.doc_id_verso = null;
      this.form.comp_res = null;
      this.form.letra = null;
      this.form.video = null;
      this.form.check = false;

      this.$refs.observer.reset();
    },
  },
  watch: {
    cpf: function () {
      this.form.cpf = this.cpf.replaceAll(".", "").replace("-", "");
    },
  },
};
</script>