<template>
  <router-view />
</template>

<style>

:root {
  --accent-color: #ff9d01b3;
  background-color: #FAF8F4;
}

body {
  font-family: 'Rubik';
  position: relative;
  display: block;
  justify-content: center;
  align-content: center;
}

main {
  min-width: 1370px;
  max-width: 100%;
}

form > * {
  min-width: 686px;
}

form {
  background-color: white;
}

button, input, select {
  font-family: 'Rubik';
  font-size: 20px;
  font-weight: 400;
  height: 56px;
  border-radius: 17px;
  margin-bottom: 32px;
  box-sizing: border-box;
}

button {
  background: #FAF8F4;
  color: black;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

input, select {
  padding-inline-start: 20px;
  padding-inline-end: 0;
}

.input-inline {
  display: block;
  min-width: 686px;
}

button:hover,button:focus {
  background: black;
  color: white;
  filter: contrast(115%);
}

label{
  display: inline-block;
  vertical-align: middle;
  font-family: 'Rubik';
  padding-bottom: 24px;
  font-size: 20px;
}

fieldset, input, select {
  border: 1px solid #0000002E;
}

.vs-form {
  border: #F6F9FC solid 1px;
  border-radius: 48px;
  padding: 20px;
  margin-left: 32px;
  margin-right: 32px;
  box-shadow: 0 30px 50px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%);
  background-color: white;
}

#payment-form {
  margin: 32px;
}

.logos {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.big-logo {
  margin-top: 12px;
  margin-left: 32px;
}

.small-logo {
  margin: 24px 2rem 0 0;
}

mark {
  background-color: var(--accent-color);
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Label for checkbox*/
.container {
  display: block;
  position: relative;
  padding-left: 45px;
  padding-top: 20px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Checkbox border */
.customCheckbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 32px;
  width: 32px;
  background-color: white;
  border-radius: 18%;
  border: 1px solid #0000002E;
  margin-top: 16px;
}

/* When the checkbox is checked, add a background */
.container input:checked ~ .customCheckbox {
  background-color: var(--accent-color);
}

/* Create the customCheckbox/indicator (hidden when not checked) */
.customCheckbox:after {
  content: "";
  position: absolute;
}

/* Show the checkmark when checked */
.container input:checked ~ .customCheckbox:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .customCheckbox:after {
  left: 12px;
  top: 7px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

#contact-us {
  border-radius: 24px;
  font-size: 20px;
  justify-content: space-between;
  display: flex;
}

#copyright {
  color: #26252A80;
}

#vs-email {
  color: #148DFF;
  background-color: white;
}

.light-grey-mark {
  color: #00000080;
  background-color: white;
}

.bold-text {
  font-weight: 500;
  font-size: 24px;
  margin-right: 8px;
}

#donate-button {
  display: block;
  min-width: 686px;
  color: #000000;
  background: var(--accent-color);
  margin-top: 32px;
}

#main-header {
  margin-bottom: 10px;
  font-family: 'Old Standard TT';
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  font-size: 48px;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label, input[type="radio"]:checked + label {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 17px;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Not focused */
input[type="radio"] + label {
  background: #FAF8F4;
  color: black;
}

/* Focused */
input[type="radio"]:checked + label {
  background: black;
  color: white;
}

.radio-label {
  display: flex;
  padding-top: 24px;
}

.radio-container-medium {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 218px 218px 218px;
  margin-bottom: 32px;
  margin-top: 32px;
}

.radio-container-big {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 335px 335px;
  margin-bottom: 16px;
  margin-top: 16px;
}

.radio-container-small {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 160px 160px 334px;
  margin-top: 16px;
}

.crypto-address {
  width: 100%;
  height: 100px;
  border: 1px solid #0000002E;
  border-radius: 17px;
  margin-bottom: 16px;
  display: inline-flex;
  justify-content: space-between;
  padding-inline: 20px;
  box-sizing: border-box;
  align-items: center;
}

.crypto-buttons {
  justify-content: right;
  justify-items: right;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 18px 18px;
}

</style>