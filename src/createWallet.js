//Importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Definir a rede
//Bitcoin - rede principal - mainnet
//Testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet

//Derivação de carteiras (hierarchical deterministic wallet)
//Destnet - rede de teste - tesnet `m/49'/1'/0'/0`
//Bitcoin - rede principal - mainnet `m/49'/0'/0'/0`
const path = `m/49'/1'/0'/0` 

//Criando mnemonic para a seed (conjunto de palavras senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira 
let root = bip32.fromSeed(seed, network)

//criando keys - par pvt-pub keys (chaves privadas e públicas)
let account = root.derivePath(path)

//Criação de  nós de derivação 
let node = account.derive(0).derive(0)

//Criação de endereços
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)

//Gerenciamento de carteiras - node.toWIF
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)


//No terminal:

//-cd .\src\
//Entrando na pasta *src


//-node .\createWallet.js
//Executar a criação da wallet. 
