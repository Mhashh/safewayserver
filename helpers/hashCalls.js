const {
    Client,FileCreateTransaction,
    ContractCreateTransaction,
    Hbar,
    ContractCreateFlow,
    Mnemonic,
    AccountCreateTransaction,
  
  } = require("@hashgraph/sdk");
  require("dotenv").config();
  
  async function environmentSetup() {
    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
  
    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }
  
    // Create your connection to the Hedera Network
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
  
    //Set the default maximum transaction fee (in Hbar)
    client.setDefaultMaxTransactionFee(new Hbar(700));
  
    //Set the maximum payment for queries (in Hbar)
    client.setMaxQueryPayment(new Hbar(100));
    return client;
  
  }

  async function getPrivateKey(mnemonicStr){
       return Mnemonic.fromString(mnemonicStr).then((mnemonic)=>{
        return mnemonic;
    }).then((mnemonic)=>{
        const prv = mnemonic.toStandardECDSAsecp256k1PrivateKey();
        return prv
    }).then((privatekey)=>{
        const result = {
          retString:privatekey.toStringDer(),
          pubString:privatekey.publicKey.toStringDer()
        }

        return result;
    }).catch((err)=>{
        throw new Error("Unable to convert.")
    })
  }

  exports.getPrivateKey = getPrivateKey;