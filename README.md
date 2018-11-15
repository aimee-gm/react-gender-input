# react-gender-input

_A better gender form option implemeted as a react component_

[![NPM Version](https://img.shields.io/npm/v/react-gender-input.svg)](https://www.npmjs.com/package/react-gender-input)
[![Build Status](https://travis-ci.org/aimee-gm/react-gender-input.svg?branch=master)](https://travis-ci.org/aimee-gm/react-gender-input)
[![License](https://img.shields.io/github/license/aimee-gm/react-gender-input.svg)](/LICENSE)

## Demo

View the component in action in [our interactive demo](https://aimee-gm.github.io/react-gender-input/)

## Installation

Use npm to install `react-gender-input`

```
npm install --save react-gender-input
```

## Usage

```jsx
import { GenderInput } from 'react-gender-input';

<GenderInput
	name='my-gender-field-name'
	onUpdate={(val) => {...}}
	value={user.gender}
/>
```

## Options

- `name`: type: `string`, default: `gender-input`. Form name property used for the input
- `value`: type: `string`. Selected gender value
- `required`: type `boolean`, default: `false`. Toggles `required="required" on form inputsVY
- `preferNotToSay`: type `boolean`, default: `true`. Toggles an additional "Prefer not to say option"
- `otherReveal`: type `'select' | false`, default: `select`. Defines form input that is revealed on selecting "Other"
- `onUpdate`: type `function`. Method to call when the selected value changes. Called with one argument: the new value.
