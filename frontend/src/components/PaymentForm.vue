<script setup>
import { ref, reactive } from "vue"
import { loadScript } from "@paypal/paypal-js"

const PaymentMethods = Object.freeze({
  FOREIGN_CARDS: 0,
  RUSSIAN_CARDS: 1,
  CRYPTO: 2
});

const email = ref()
const name = ref()
let donationAmount = ref(10) // todo ?
let isDonateButtonClicked = ref(false)
let withSubscription = ref(false)
let acceptConditions = ref(false)

let paymentMethod = ref(PaymentMethods.FOREIGN_CARDS)

const formBodyStyle = reactive({
  width: '686px',
  minHeight: '600px',
  marginLeft: '32%',
  marginRight: '32%',
  alignItems: 'center',
  justifyContent: 'center',
})

const onDonateButtonClicked = async() => {
  if (acceptConditions.value === false || !email.value) {
    return;
  }
  // Paypal
  isDonateButtonClicked.value = true

  // if (withSubscription.value === false) {
  loadScript({
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "EUR"
  }).then((paypal) => {
    paypal.Buttons({
      style: {
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      },
      message: {
        amount: 1,
      },

      async createOrder() {
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: donationAmount.value,
              email: email.value
            }),
          });
          const orderData = await response.json();
          if (orderData.id) {
            return orderData.id;
          }
          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);
          console.error(errorMessage)
          throw new Error(errorMessage);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      },

      async onApprove(data, actions) {
        try {
          const response = await fetch(
              `/api/orders/${data.orderID}/capture`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
          );
          const orderData = await response.json();
          const errorDetail = orderData?.details?.[0];
          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            return actions.restart();
          } else if (errorDetail) {
            throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
            );
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            console.log("Payment successful");
          }
        } catch (error) {
          console.error("Error capturing order:", error);
        }
      }

    }).render('#paypal-button-container')
  }).catch((err) => {
    console.error("failed to load the PayPal JS SDK script", err);
  });
  // }
}

function onClickCrypto() {
  paymentMethod.value = PaymentMethods.CRYPTO;
  isDonateButtonClicked.value = false;
}

function onClickForeignCards() {
  paymentMethod.value = PaymentMethods.FOREIGN_CARDS;
  isDonateButtonClicked.value = false;
}

function onClickRussianCards() {
  paymentMethod.value = PaymentMethods.RUSSIAN_CARDS;
}

function onClickSumButton(sum) {
  donationAmount.value = sum;
}

function onClickSubscription(subscribe) {
  withSubscription.value = subscribe;
}

function onClickAccept() {
  acceptConditions.value = !acceptConditions.value;
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

</script>

<template>
  <main>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

    <div class="logos">
      <img alt="Вольные слушатели" class="big-logo" src="../assets/vs_icon.svg" width="48" height="48" />
      <div>
        <a href="https://t.me/volnyeslushateli">
          <img alt="Telegram" class="small-logo" src="../assets/ic_telegram.svg" width="24" height="24" />
        </a>
        <a href="https://www.instagram.com/volnyeslushateli/profilecard">
          <img alt="Instagram" class="small-logo" src="../assets/ic_instagram.svg" width="24" height="24" />
        </a>
      </div>
    </div>

    <form
        id="payment-form" class="vs-form"
          @donate-button.prevent="isDonateButtonClicked">
      <div :style="formBodyStyle" id="form-body">
        <h1 id="main-header">Помогите<br> политзаключенным<br> <mark>продолжить образование</mark> </h1>

          <div class="radio-container-medium">
            <input @click="onClickForeignCards" type="radio" id="foreign-cards" name="payment-method" checked/>
            <label class="radio-label" for="foreign-cards">Зарубежные карты</label>

            <input type="radio" id="russian-cards" name="payment-method"/>
            <label @click="onClickRussianCards" class="radio-label" for="russian-cards">Карты РФ</label>

            <input @click="onClickCrypto" type="radio" id="crypto" name="payment-method"/>
            <label class="radio-label" for="crypto">Крипта</label>
          </div>

        <div v-if="paymentMethod === PaymentMethods.FOREIGN_CARDS" id="foreign-cards-form">
          <div class="radio-container-big">
            <input @click="onClickSubscription(true)" type="radio" id="subscription" name="payment-period"/>
            <label class="radio-label" for="subscription">Ежемесячно</label>

            <input @click="onClickSubscription(false)" type="radio" id="one-time" name="payment-period" checked/>
            <label class="radio-label" for="one-time">Разово</label> <br>
          </div>

          <div class="radio-container-small">
            <input @click="onClickSumButton(10)" type="radio" id="10-dollars" name="donation-amount" checked/>
            <label class="radio-label" for="10-dollars">10$</label>

            <input @click="onClickSumButton(20)" type="radio" id="20-dollars" name="donation-amount"/>
            <label class="radio-label" for="20-dollars">20$</label>

            <input v-model="donationAmount" type="text" pattern="[0-9]*" name="donation-amount" placeholder="Другая сумма">
          </div>

          <input class="input-inline" v-model="email" type="email" name="email" width="100" placeholder="Электронная почта" required>
          <input class="input-inline" v-model="name" type="text" name="name" placeholder="Имя (необязательно)"/>

          <label class="container">Принимаю условия договорной оферты
            <input @click="onClickAccept" type="checkbox" required>
            <span class="customCheckbox"></span>
          </label>
          <button id="donate-button" v-if="!isDonateButtonClicked" @click="onDonateButtonClicked">
            Поддержать проект
          </button>
          <div v-if="isDonateButtonClicked" id="paypal-button-container"/>
        </div>

        <div v-if="paymentMethod === PaymentMethods.RUSSIAN_CARDS" id="russian-cards-form">
          По номеру телефона <mark class="light-grey-mark">Сбер</mark><br>
          <span class="bold-text">+78997778787</span>
          <a href="#">
          <img alt="copy" src="../assets/ic_copy.svg" width="18" height="18" @click="copyText('+78997778787')"/>
          </a><br><br>
          По номеру карты  <mark class="light-grey-mark">Сбер</mark><br>
          <span class="bold-text">2987 8789 8966 8778</span>
          <a href="#">
          <img alt="copy" src="../assets/ic_copy.svg" width="18" height="18" @click="copyText('2987878989668778')"/>
          </a>
        </div>
        <div v-if="paymentMethod === PaymentMethods.CRYPTO" id="crypto-form">
          <div class="crypto-address">
            <img alt="Bitcoin" class="crypto-logo" src="../assets/ic_bitcoin.svg" width="48" height="48"/>
            <span class="bold-text">1234567890</span>
            <div class="crypto-buttons">
              <img alt="copy" src="../assets/ic_copy.svg" width="18" height="18" @click="copyText('')"/>
              <img alt="scan" src="../assets/ic_scan.svg" width="18" height="18"/>
            </div>
          </div>
          <div class="crypto-address">
            <img alt="Ether" class="crypto-logo" src="../assets/ic_ether.svg" width="48" height="48"/>
            <span class="bold-text">1234567890</span>
            <div class="crypto-buttons">
              <img alt="copy" src="../assets/ic_copy.svg" width="18" height="18" @click="copyText('')"/>
              <img alt="scan" src="../assets/ic_scan.svg" width="18" height="18"/>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="vs-form" id="contact-us">
      <span>
        Если хотите связаться с нами, напишите нам на почту <a href="mailto:volnyeslushatel@gmail.com"><mark id="vs-email">volnyeslushatel@gmail.com</mark></a>
      </span>
      <span id="copyright">
        © Вольные слушатели, 2025
      </span>
    </div>

  </main>
</template>
