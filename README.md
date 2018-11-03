# react-gender-input

_A better gender form option implemeted as a react component_

[![Build Status](https://travis-ci.org/ajgamble-milner/react-gender-input.svg?branch=master)](https://travis-ci.org/ajgamble-milner/react-gender-input)
[![License](https://img.shields.io/github/license/ajgamble-milner/react-gender-input.svg)](/LICENSE)

## Demo

View the component in action in [our interactive demo](https://ajgamble-milner.github.io/react-gender-input/)

## Usage

```html
<GenderInput name='my-gender-field-name' onUpdate={(val) => {}} />
```

## Options

- `name`: type: `string`, default: `gender-input`. Form name property used for the input
- `required`: type `boolean`, default: `false`. Toggles `required="required" on form inputsVY
- `preferNotToSay`: type `boolean`, default: `true`. Toggles an additional "Prefer not to say option"
- `otherReveal`: type `'select' | false`, default: `select`. Defines form input that is revealed on selecting "Other"
- `onUpdate`: type `function`. Method to call when the selected value changes. Called with one argument: the new value.
