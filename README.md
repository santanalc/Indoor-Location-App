# Indoor-Location-App

Aplicativo desenvolvido para realizar a localização in door em mapa fixo, utilizando principalmente [**React**](https://pt-br.reactjs.org/) e [**CapacitorJs**](https://capacitorjs.com/).

## Execução
Antes de começar, instale o [**node**](https://nodejs.org/en/), [**typescript**](https://www.npmjs.com/package/typescript), [**yarn**](https://yarnpkg.com/lang/en/).

1. Instale as dependência com **yarn**:
```
yarn
```

2. Exercute o comando **yarn start**:
```
yarn start
```
A web view vai rodar no browser na porta 3000 por padrão.

Como o aplicativo utiliza o bluetooth, o acelerômetro e o giroscópio, não é possivel testá-lo direto na web sendo assim é necessario utilizar o [**android-studio**](https://developer.android.com/studio) para gerar o apk e testa-lo direto no celular

## Gerar o apk
Antes de começar confira se o path do android-studio no capacitor.config.json na pasta raiz do projeto está correta.

1. Na raiz do repositório, digite **yarn run build**:
```
yarn run build
```
2. Em seguida digite **yarn cap sync**:
```
yarn cap sync
```
3. Abra o projeto no android-studio atráves do comando **yarn cap open android**:
```
yarn cap open android
```
Obs: Caso de erro para abrir o projeto, novamente, verifique o path.

4. Dentro do android-studio vá em Build->Build Bundle(s)/APK(s)->Build APK(s)

5. Após finalizar o processo, o software irá mostrar uma mensagem no lado inferior direito com o titulo Build APK(s), então selecione o locate para abrir o local em que o apk foi salvo.
