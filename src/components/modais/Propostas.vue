<script lang="ts" setup>
import "@/assets/modal.scss";
import { ref, watch, computed } from "vue";
import CloseIcon from "@/components/icons/CloseIconGreen.vue";
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";
import Select from "@/components/Select.vue";
import { useTaxIdMask } from "@/composables/TaxIdMask";
import { useCepMask } from "@/composables/CepMask";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { updateCpfCnpj, cpfCnpj } = useTaxIdMask(true);
const { updateCep, isCepValid, cep } = useCepMask();
const toast = useToast();
const props = defineProps<{
  status: boolean;
}>();
const emit = defineEmits<{
  "update:status": [val: boolean];
  atualizaEtapa: [val: number];
}>();
const visibilidade = ref(false);
watch(
  () => props.status,
  (val) => {
    visibilidade.value = props.status;
    val
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "inherit");
  },
  { immediate: true }
);
userStore.propostas;

function maskMoney(valor: number) {
  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatoMoeda.format(valor);
}
function fechar() {
  emit("update:status", false);
}
const selectDoc = ref("");
const selectDocIndex = ref(0);
function abrirDoc(link: string, index: number) {
  screen.value = "visualizar";
  selectDoc.value = link;
  selectDocIndex.value = index;
}
const selectedProposta = ref("");
function selecionarProposta() {
  if (!selectedProposta.value) return;
  if (selectedProposta.value === "cartao credito") {
    screen.value = "cartao";
  } else if (selectedProposta.value === "Fiador") {
    screen.value = "fiador";
  } else {
    console.log(selectedProposta.value);
    //ENVIAR PARA BACKEND
    fechar();
  }
}
function recusarPropostas() {
  //BATER NO BACKEND PARA RECUSAR TUDO
  fechar();
}
const numero = ref("");
const nome = ref("");
const mes = ref("");
const ano = ref("");
const cvv = ref("");
const screen = ref("proposta");
function spaceBy4(texto: string) {
  // Use uma expressão regular para dividir a string em grupos de 4 caracteres
  const grupos = texto.match(/.{1,4}/g)!;

  // Junte os grupos usando espaços como separadores
  const textoFormatado = grupos.join(" ");

  return textoFormatado;
}

watch(
  () => numero.value,
  (value) => {
    if (value.length > 16) {
      setTimeout(() => {
        numero.value = numero.value.substring(0, 16);
      }, 0);
    }
  }
);
watch(
  () => cvv.value,
  (value) => {
    if (value.length > 3) {
      setTimeout(() => {
        cvv.value = cvv.value.substring(0, 3);
      }, 0);
    }
  }
);
watch(
  () => mes.value,
  (value) => {
    if (value.length > 2) {
      setTimeout(() => {
        mes.value = mes.value.substring(0, 2);
      }, 0);
    }
  }
);
watch(
  () => ano.value,
  (value) => {
    if (value.length > 4) {
      setTimeout(() => {
        ano.value = ano.value.substring(0, 4);
      }, 0);
    }
  }
);
const estadoCivil = [
  {
    text: "Solteiro",
    value: "solteiro",
  },
  {
    text: "Casado",
    value: "casado",
  },
  {
    text: "Divorciado",
    value: "divorciado",
  },
  {
    text: "Viúvo",
    value: "viuvo",
  },
  {
    text: "União Estável",
    value: "uniao estavel",
  },
];
const numeroExibicao = computed(() => {
  if (!numero.value) return "#### #### #### ####";
  if (numero.value.length >= 16) return spaceBy4(numero.value);
  return spaceBy4(numero.value + "#".repeat(16 - numero.value.length));
});
const getCardType = computed(() => {
  let number = numero.value;
  let re = new RegExp("^4");
  if (number.match(re) != null) return "visa";

  re = new RegExp("^(34|37)");
  if (number.match(re) != null) return "amex";

  re = new RegExp("^5[1-5]");
  if (number.match(re) != null) return "mastercard";

  re = new RegExp("^6011");
  if (number.match(re) != null) return "discover";

  return "visa"; // default type
});
const backCard = ref(false);
const loadingCep = ref(false);
async function obterLocalizacao() {
  try {
    if (!isCepValid.value) return;
    loadingCep.value = true;
    // const { data } = await getLocal(cepWithoutMask.value);
    // userStore.uf = data.state;
    // userStore.cidade = data.city;
    // userStore.bairro = data.neighborhood;
    // userStore.rua = data.street;
  } catch (error) {
    toast.error("Erro ao obter localização");
  } finally {
    loadingCep.value = false;
  }
}
function salvarEtapa() {
  emit("atualizaEtapa", 2);
  fechar();
}
</script>

<template>
  <div :class="visibilidade ? 'janela aberta' : 'janela fechada'">
    <div class="moldura">
      <div v-if="screen === 'proposta'" class="proposta w-full">
        <div class="header">
          <h2 class="title">
            Escolha uma opção de contrato disponível para essa dívida
          </h2>
          <CloseIcon @click="fechar" class="icon"></CloseIcon>
        </div>
        <div class="base pb-2">
          <div
            @click="selectedProposta = proposta.tipo"
            :class="{ selectedProposta: selectedProposta === proposta.tipo }"
            class="card"
            v-for="(proposta, index) in userStore.propostas"
            :key="proposta.tipo"
          >
            <div>
              <div class="card-header">
                <div>
                  <p class="card-title1">Proposta {{ index + 1 }}</p>
                  <p class="card-title2">{{ proposta.tipo }}</p>
                </div>
                <p
                  class="card-button"
                  @click.stop="abrirDoc(proposta.url, index)"
                >
                  Visualizar
                </p>
              </div>
              <div class="card-indica" v-if="proposta.indicada">
                <p>Mais indicado</p>
              </div>
            </div>
            <div>
              <p class="card-bottom-text">Novo saldo devido</p>
              <div class="card-bottom-value">
                <p>{{ maskMoney(proposta.valor) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p class="button-outline" @click="recusarPropostas">
            Recusar todas propostas. Quero contestar.
          </p>
          <Button @click="selecionarProposta">Escolher proposta</Button>
        </div>
      </div>
      <div v-else-if="screen === 'visualizar'" class="visualizar h-full">
        <p class="title-doc">Proposta {{ selectDocIndex + 1 }}</p>
        <iframe :src="selectDoc" width="100%" height="80%"></iframe>
        <div style="text-align: end" class="mt-5">
          <Button
            @click="
              selectDoc = '';
              screen = 'proposta';
            "
            >Voltar</Button
          >
        </div>
      </div>
      <div class="cardcredit" v-else-if="screen === 'cartao'">
        <div class="header">
          <h2 class="title">Preencha os dados do cartão</h2>
          <CloseIcon @click="fechar" class="icon"></CloseIcon>
        </div>
        <div class="base">
          <div v-if="!backCard" class="cartao">
            <div class="top">
              <img src="@/assets/chip.png" alt="" />
              <img
                width="60"
                :src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  getCardType +
                  '.png'
                "
                alt=""
              />
            </div>
            <div class="text">
              <p>{{ numeroExibicao }}</p>
            </div>
            <div class="bot">
              <div class="bot-text">
                <p class="title">Titular do Cartão</p>
                <p class="fonte">{{ nome || "Nome Completo" }}</p>
              </div>
              <div class="bot-text">
                <p class="title">Validade</p>
                <p class="fonte">{{ mes || "MM" }}/{{ ano || "YY" }}</p>
              </div>
            </div>
          </div>
          <div v-else class="cartao">
            <div class="faixa"></div>
            <div class="back">
              <p class="title">CVV</p>
              <p class="cvv">{{ cvv }}</p>
            </div>
          </div>
          <div class="data">
            <TextField
              placeholder="*Número do cartão"
              width="100%"
              color="#1B7E6C"
              v-model="numero"
            ></TextField>
            <TextField
              placeholder="*Nome no cartão"
              width="100%"
              color="#1B7E6C"
              v-model="nome"
            ></TextField>
            <div style="display: flex; justify-content: space-between">
              <TextField
                placeholder="*Mês"
                width="32%"
                class="mr-1"
                color="#1B7E6C"
                type="number"
                v-model="mes"
              ></TextField>
              <TextField
                placeholder="*Ano"
                width="32%"
                class="mr-1"
                color="#1B7E6C"
                type="number"
                v-model="ano"
              ></TextField>
              <TextField
                @focus="backCard = true"
                @blur="backCard = false"
                placeholder="*CVV"
                width="32%"
                color="#1B7E6C"
                v-model="cvv"
              ></TextField>
            </div>
            <TextField
              placeholder="*CPF do titular"
              width="100%"
              @input="updateCpfCnpj"
              :modelValue="cpfCnpj"
              color="#1B7E6C"
            ></TextField>
          </div>
        </div>
        <div style="text-align: end">
          <Button @click="salvarEtapa">Enviar</Button>
        </div>
      </div>
      <div class="fiador" v-else-if="screen === 'fiador'">
        <div class="header">
          <h2 class="title">Preencha os dados do fiador para assinatura</h2>
          <CloseIcon @click="fechar" class="icon"></CloseIcon>
        </div>
        <div class="outro">
          <div class="pessoal">
            <p class="title">Dados Pessoais</p>
            <div class="base">
              <div class="data">
                <TextField
                  placeholder="Nome Completo"
                  color="#1B7E6C"
                  width="100%"
                >
                </TextField>
                <TextField width="100%" placeholder="CPF" color="#1B7E6C">
                </TextField>
                <Select
                  placeholder="Estado Civil"
                  color="#1B7E6C"
                  width="100%"
                  :items="estadoCivil"
                ></Select>
                <TextField
                  placeholder="*Telefone celular"
                  color="#1B7E6C"
                  width="100%"
                ></TextField>
                <TextField
                  placeholder="Email"
                  color="#1B7E6C"
                  width="100%"
                ></TextField>
              </div>
            </div>
          </div>
          <div class="pessoal">
            <p class="title">Dados de endereço</p>
            <div class="base">
              <div class="divider-cep">
                <TextField
                  placeholder="CEP"
                  color="#1B7E6C"
                  width="100%"
                  @input="updateCep"
                  :model-value="cep"
                ></TextField>
                <Button @click="obterLocalizacao" :loading="loadingCep"
                  >Buscar</Button
                >
              </div>
              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
              >
                <p class="destaque">Não sabe seu CEP?</p>
              </a>
              <div class="divider">
                <TextField
                  class="input-divider-1"
                  :readonly="true"
                  placeholder="UF"
                  color="#1B7E6C"
                >
                </TextField>
                <TextField
                  class="input-divider-2"
                  :readonly="true"
                  placeholder="Cidade"
                  color="#1B7E6C"
                >
                </TextField>
              </div>
              <TextField
                :readonly="true"
                placeholder="Bairro"
                color="#1B7E6C"
                width="100%"
              >
              </TextField>
              <TextField
                :readonly="true"
                placeholder="Rua"
                color="#1B7E6C"
                width="100%"
              ></TextField>
              <TextField
                placeholder="Número"
                color="#1B7E6C"
                width="100%"
              ></TextField>
              <TextField
                placeholder="Complemento"
                color="#1B7E6C"
                width="100%"
              ></TextField>
            </div>
          </div>
        </div>
        <div style="text-align: end">
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.moldura {
  height: auto;
  background: #fff;
  color: #000;
  padding: 30px;
  overflow: auto;
  width: 100%;
  height: 100%;
  .fiador {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .base {
      display: flex;
      flex-direction: column;
      .destaque {
        color: #055550;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .divider-cep {
        display: flex;

        > input {
          margin-right: 10px;
        }
      }
      .divider {
        display: flex;

        & .input-divider-1 {
          width: 40%;
        }

        & .input-divider-2 {
          width: 60%;
          margin-left: 10px;
        }
      }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #055550;
        font-size: 20px;
        font-weight: 700;
      }
      .icon {
        cursor: pointer;
      }
    }
    .pessoal {
      &:first-child {
        margin-right: 40px;
      }
      .title {
        color: #055550;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 30px;
      }
    }
    .outro {
      display: flex;

      align-items: center;
      justify-content: center;
    }
  }
  .cardcredit {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #055550;
        font-size: 20px;
        font-weight: 700;
      }
      .icon {
        cursor: pointer;
      }
    }
    .base {
      display: flex;
      align-items: center;
      justify-content: center;
      .cartao {
        width: 430px;
        height: 270px;
        border-radius: 10px;
        background: #1b7e6c;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .faixa {
          width: 100%;
          height: 55px;
          background-color: #000000b0;
          position: absolute;
          top: 0;
          left: 0;
          margin-top: 50px;
        }
        .back {
          margin-top: 100px;
          .title,
          .cvv {
            font-size: 14px;
            text-align: end;
            color: #fff;
          }
        }
        .top {
          display: flex;
          justify-content: space-between;
        }
        .text {
          color: #fff;
          font-size: 25px;
          font-weight: 700;
          padding-top: 60px;
        }
        .bot {
          display: flex;
          justify-content: space-between;
          color: #fff;
          .title {
            font-size: 14px;
          }
          .fonte {
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
      .data {
        max-width: 350px;
        margin-left: 50px;
      }
    }
  }
  .visualizar {
    .title-doc {
      color: #055550;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
  .proposta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #055550;
        font-size: 20px;
        font-weight: 700;
      }
      .icon {
        cursor: pointer;
      }
    }
    .base {
      display: flex;
      overflow: auto;
      .card {
        &.selectedProposta {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0.6) 100%
            ),
            linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
        }
        cursor: pointer;
        margin-right: 20px;
        color: #fff;
        padding: 30px;
        background: linear-gradient(90deg, #055550 0%, #1b7e6c 100%);
        min-width: 300px;
        height: 420px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 42px;
        .card-indica {
          border-radius: 10px;
          background: #fc0;
          width: 220px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          p {
            font-size: 18px;
            font-weight: 700;
          }
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .card-title1 {
            font-size: 18px;
            font-weight: 700;
          }
          .card-title2 {
            color: #fc0;
            font-size: 12px;
            font-weight: 700;
          }
          .card-button {
            color: #fc0;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            border: 1px solid #fc0;
            width: fit-content;
            padding: 12px;
            border-radius: 10px;
          }
        }
        .card-bottom-text {
          font-size: 14px;
        }
        .card-bottom-value {
          p {
            color: #055550;
            font-weight: 700;
          }
          margin-top: 5px;
          border-radius: 10px;
          width: 160px;
          height: 40px;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .button-outline {
        color: #1b7e6c;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid #1b7e6c;
        width: fit-content;
        padding: 12px;
        border-radius: 10px;
      }
    }
  }
}
@media (max-width: 870px) {
  .moldura {
    .cardcredit {
      width: 100%;
      .base {
        flex-direction: column-reverse;
        .data {
          margin-bottom: 10px;
          margin-left: 0;
        }
      }
    }
  }
}
@media (max-width: 870px) {
  .moldura {
    .fiador {
      height: auto;
      .pessoal {
        margin-right: 0 !important;
      }
      .outro {
        flex-direction: column;
      }
    }
  }
}
@media (max-width: 500px) {
  .moldura {
    .proposta {
      height: auto;
      .header {
        .title {
          width: 80%;
          font-size: 18px;
        }
      }
      .bottom {
        flex-direction: column-reverse;
        :deep(button) {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }
    .cardcredit {
      height: auto;
      .base {
        .cartao {
          transform: scale(0.7);
        }
      }
    }
  }
}
</style>
