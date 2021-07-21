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
                      <v-radio-group label="Música: " row mandatory>
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
                        v-model="form.cpf"
                        :error-messages="errors"
                        :label="'CPF do ' + tipo + '*'"
                        prepend-icon="mdi-numeric"
                        v-mask="'###.###.###-##'"
                        required
                      >
                      </v-text-field>
                    </validation-provider>

                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="date_required"
                          :name="'data de nascimento do ' + tipo"
                        >
                          <v-text-field
                            v-model="form.dt_nasc"
                            :error-messages="errors"
                            :label="'Data de nascimento do ' + tipo + '*'"
                            persistent-hint
                            :hint="dica"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="form.dt_nasc"
                        :active-picker.sync="activePicker"
                        max="2003-12-31"
                        min="1900-01-01"
                        @change="save"
                        no-title
                      ></v-date-picker>
                    </v-menu>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                      name="Documento com foto (frente)"
                    >
                      <v-file-input
                        v-model="form.doc_id_frente"
                        :error-messages="errors"
                        label="Documento com foto (frente)*"
                        prepend-icon="mdi-card-account-details"
                        accept="image/*,.pdf"
                        persistent-hint
                        :hint="dica"
                        required
                      ></v-file-input>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                      name="Documento com foto (verso)"
                    >
                      <v-file-input
                        v-model="form.doc_id_verso"
                        :error-messages="errors"
                        label="Documento com foto (verso)*"
                        prepend-icon="mdi-card-text"
                        accept="image/*,.pdf"
                        persistent-hint
                        :hint="dica"
                        required
                      ></v-file-input>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:image/*,.pdf"
                    >
                      <v-file-input
                        v-model="form.comp_res"
                        :error-messages="errors"
                        label="Comprovante de residência (últimos 3 meses)*"
                        prepend-icon="mdi-home"
                        accept="image/*,.pdf"
                        persistent-hint
                        :hint="dica"
                        required
                      ></v-file-input>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:text/plain,.odt,.rtf,.txt,.doc,.docx,.pdf"
                      name="Letra da música"
                    >
                      <v-file-input
                        v-model="form.letra"
                        :error-messages="errors"
                        label="Letra da música*"
                        prepend-icon="mdi-playlist-music"
                        accept="text/plain,.odt,.rtf,.doc,.docx,.pdf"
                        persistent-hint
                        :hint="dica"
                        required
                      ></v-file-input>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      rules="file_required|mimes:video/*"
                      name="Vídeo"
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
                  <v-btn class="mr-2" color="accent" @click.stop="clear">
                    <v-icon>mdi-close</v-icon>
                    Limpar
                  </v-btn>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        type="submit"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-upload</v-icon>
                        Enviar
                      </v-btn>
                    </template>
                    <span>É necessário preencher todos os campos</span>
                  </v-tooltip>
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
import { required, email, mimes, alpha_spaces } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Por favor, preencha o {_field_}",
});

extend("date_required", {
  ...required,
  message: "Por favor, preencha a {_field_}",
});

extend("check_required", {
  ...required,
  message: "Você precisa aceitar os termos",
});

extend("file_required", {
  ...required,
  message: "Por favor, selecione um arquivo",
});

extend("email", {
  ...email,
  message: "Insira um endereço de e-mail válido",
});

extend("mimes", {
  ...mimes,
  message: "Insira um arquivo com o formato correto",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Somente são permitidos letras e espaços",
});

extend("cpf", {
  validate: (value) => {
    let valid = true;
    let cpf = value.replaceAll(".", "").replace("-", "").split("");
    if (
      cpf.every((n, _, a) => {
        return a[0] == n;
      })
    ) {
      return false;
    }
    let v = 0;
    for (let i = 10, j = 0; i >= 2; i--) {
      v += cpf[j] * i;
      j++;
    }
    if ((v * 10) % 11 != cpf[9]) {
      return false;
    }

    v = 0;
    for (let i = 11, j = 0; i >= 2; i--) {
      v += cpf[j] * i;
      j++;
    }
    if ((v * 10) % 11 != cpf[10]) {
      return false;
    }

    return valid;
  },
  message: "CPF inválido",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    dica: "Clique para selecionar",
    carregando: false,
    activePicker: null,
    menu: false,
    form: {
      categoria: "solo",
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
    comp_dt_nasc: function () {
      return this.formatDate(this.form.dt_nasc);
    },
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
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async enviar() {
      if (await this.$refs.observer.validate()) {
        let res = await this.$dialog.confirm({
          title: "Aviso",
          text: "Tem certeza que deseja confirmar a inscrição?",
          actions: {
            false: "Cancelar",
            true: "Confirmar",
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
      }
    },
    clear() {
      this.form.categoria = "solo";
      this.form.nome = "";
      this.form.nome_art = "";
      this.form.musica = "";
      this.form.email = "";
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
};
</script>