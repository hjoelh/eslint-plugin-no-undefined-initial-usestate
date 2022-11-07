# eslint-plugin-no-undefined-initial-usestate

example of what this lints
```
const [state, useState] = useState()
const [state, useState] = useState(undefined)
```




install
```
yarn add eslint-plugin-no-undefined-initial-usestate -D
npm i eslint-plugin-no-undefined-initial-usestate --save-dev
```
 

eslint config 
```javascript
  "plugins": ["no-undefined-initial-usestate"]
  "rules": {
    "no-undefined-initial-usestateRH-352 1231/no-undefined-initial-usestate": "warn",
```
