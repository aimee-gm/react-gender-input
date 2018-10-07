# React-gender

_A better gender form option implemeted as a react component_

[![Build Status](https://travis-ci.org/ajgamble-milner/react-gender.svg?branch=master)](https://travis-ci.org/ajgamble-milner/react-gender)

## Usage

```html
<GenderInput name='my-gender-field-name' onUpdate={(val) => {}} />
```

## Options

- `name`: type: `string`, default: `gender-input`. Form name property used for the input
- `required`: type `boolean`, default: `false`. Toggles `required="required" on form inputs
- `preferNotToSay`: type `boolean`, default: `true`. Toggles an additional "Prefer not to say option"
- `onUpdate`: type `function`. Method to call when the selected value changes. Called with one argument: the new value.
