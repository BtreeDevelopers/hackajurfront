<script setup lang="ts">
import UmIcon from "@/components/icons/1Icon.vue";
import DoisIcon from "@/components/icons/2Icon.vue";
import TresIcon from "@/components/icons/3Icon.vue";
import QuatroIcon from "@/components/icons/4Icon.vue";
import { useTaxIdMask } from "@/composables/TaxIdMask";

const { updateCpfCnpj, isCpfCnpjValid, cpfCnpjWithoutMask } = useTaxIdMask();
</script>

<template>
  <div class="home">
    <img src="@/assets/negocie.png" alt="negocie sua divida" class="negocie" />
    <div class="consulta">
      <div class="internal">
        <p class="text">
          Consulte o seu CPF, verifique seu direito ao desconto e negocie sua
          dívida
        </p>
        <div class="verificacao">
          <input
            type="text"
            class="text-field"
            placeholder="*CPF/CNPJ"
            @input="updateCpfCnpj"
          />
          <p v-if="!isCpfCnpjValid && cpfCnpjWithoutMask" style="color: red">
            CPF/CNPJ inválido
          </p>
          <button class="action mt-2 py-2">Verificar desconto</button>
        </div>
      </div>
    </div>
    <div class="tutorial">
      <div class="internal">
        <p class="title">Como funciona a negociação?</p>
        <div class="base">
          <div class="numbers">
            <div class="valor">
              <UmIcon></UmIcon>
            </div>
            <div class="detail">
              <p class="detail-title">Consulte seu CPF</p>
              <p class="detail-text">
                Verifique gratuitamente seu CPF para descobrir as possibilidades
                de negociação disponíveis.
              </p>
            </div>
          </div>
          <div class="numbers">
            <div class="valor">
              <DoisIcon></DoisIcon>
            </div>
            <div class="detail">
              <p class="detail-title">Negocie sua divida</p>
              <p class="detail-text">
                Complete os campos obrigatórios para avaliar sua dívida e
                potencialmente assegurar descontos nos juros, multas e no valor
                original do débito.
              </p>
            </div>
          </div>
          <div class="numbers">
            <div class="valor">
              <TresIcon></TresIcon>
            </div>
            <div class="detail">
              <p class="detail-title">Aprove seu acordo</p>
              <p class="detail-text">
                Depois que encaminhamos uma nova proposta, é só dar sua
                aprovação. O processo de negociação é completamente digital e
                leva menos de 5 minutos!
              </p>
            </div>
          </div>
          <div class="numbers">
            <div class="valor">
              <QuatroIcon></QuatroIcon>
            </div>
            <div class="detail">
              <p class="detail-title">Tenha seu nome limpo em 5 dias úteis</p>
              <p class="detail-text">
                Depois de efetuar o pagamento da primeira parcela ou quitar o
                valor total, é só aguardar até que seu nome seja regularizado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="internal">
        <div class="base">
          <p class="title">Não perca essa oportunidade!</p>
          <p class="body">
            Recupere sua tranquilidade financeira: Negocie sua dívida hoje!
            Descontos especiais aguardam por você.
          </p>
          <button class="negociar">Negociar dívida</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  .negocie {
    width: 100%;
    max-width: 1920px;
    margin: auto;
  }
  .consulta {
    background: #f0f0f0;
    .internal {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      max-width: 1920px;
      width: 100%;
      margin: auto;
    }
    .text {
      color: #055550;
      font-size: 18px;
      font-weight: 700;
      width: 45%;
    }
    .verificacao {
      display: flex;
      flex-direction: column;
      padding-top: 50px;
      padding-bottom: 50px;
      .text-field {
        border-radius: 10px;
        border: 1px solid #055550;
        width: 312px;
        height: 40px;
        background: none;
        &,
        &::placeholder {
          color: #055550;
          font-size: 12px;
          font-weight: 400;
        }
        padding-left: 18px;
        &:focus {
          outline: none !important;
          border: 2px solid #055550;
        }
      }
      .action {
        border: none;
        border-radius: 10px;
        background: #02a64c;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        height: 40px;
        cursor: pointer;
        &:hover {
          background: #01612c;
        }
        &:active {
          background: #02a64c;
        }
      }
    }
  }
  .tutorial {
    .internal {
      max-width: 1920px;
      width: 100%;
      margin: auto;
      padding-left: 20px;
      padding-right: 20px;
    }
    .title {
      color: #055550;
      font-size: 20px;
      font-weight: 700;
      padding-top: 30px;
      text-align: center;
    }
    .base {
      margin: 70px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 100px;
      grid-row-gap: 60px;
      .numbers {
        display: flex;
        align-items: center;
        color: #1b7e6c;
        .valor {
          height: 100%;
          min-width: 100px;
          text-align: center;
        }
        .detail {
          padding-left: 20px;
          .detail-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .detail-text {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
    }
  }
  .bottom {
    .internal {
      padding-top: 100px;
      padding-bottom: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1920px;
      width: 100%;
      margin: auto;
    }
    background: #1b7e6c;
    color: #fff;

    .base {
      width: 40%;
      text-align: center;
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 30px;
      }
      .body {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 30px;
      }
      .negociar {
        border: none;
        border-radius: 10px;
        background: #fc0;
        color: #1b7e6c;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
        height: 40px;
        cursor: pointer;
        &:hover {
          background: #d1a700;
        }
        &:active {
          background: #fc0;
        }
      }
    }
  }
}
@media (max-width: 970px) {
  .home {
    .tutorial {
      .base {
        margin: 30px;
        grid-column-gap: 70px;
        grid-row-gap: 30px;
      }
    }
  }
}
@media (max-width: 800px) {
  .home {
    .tutorial {
      .base {
        grid-template-columns: 1fr;
        grid-row-gap: 50px;
      }
    }
    .bottom .base {
      width: 50%;
    }
  }
}
@media (max-width: 750px) {
  .home {
    .consulta .internal {
      display: flex;
      flex-direction: column;
      padding-top: 25px;
      padding-bottom: 25px;
      .text {
        width: 60% !important;
      }
      .verificacao {
        width: 60% !important;
        padding-bottom: 0px !important;
        .text-field,
        .action {
          width: 100% !important;
        }
      }
    }
    .tutorial {
      .base {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .bottom .base {
      width: 55%;
    }
  }
}
@media (max-width: 600px) {
  .home {
    .consulta .internal {
      .text {
        width: 80% !important;
      }
      .verificacao {
        width: 80% !important;
      }
    }
    .bottom .base {
      width: 80%;
    }
  }
}
</style>
