var config = {};

// self explanatory, your application name, descriptions, etc
config.appName = 'Securus Wallet';
config.appDescription = 'Securus Wallet';
config.appSlogan = 'securus is safe';
config.appId = 'securus.walletshell';
config.appGitRepo = 'https://github.com/JOXW/securus-wallet'; //github rein

// default port number for your daemon (e.g. Securus)
config.daemonDefaultRpcPort = 14115;

// wallet file created by this app will have this extension
config.walletFileDefaultExt = 'swc';

// change this to match your wallet service executable filename
config.walletServiceBinaryFilename = 'securus-service';

// version on the bundled service (securus-service)
config.walletServiceBinaryVersion = "v1.0.4";

// config file format supported by wallet service, possible values:
// ini -->  for turtle service (or its forks) version <= v0.8.3
// json --> for turtle service (or its forks) version >= v0.8.4
config.walletServiceConfigFormat = "json";

// default port number for your wallet service (e.g. turtle-service)
config.walletServiceRpcPort = 18114;

// block explorer url, the [[TX_HASH]] will be substituted w/ actual transaction hash
config.blockExplorerUrl = 'http://explorer.securuscoin.org/?hash=[[TX_HASH]]#blockchain_transaction';

// default remote node to connect to, set this to a known reliable node for 'just works' user experience
config.remoteNodeDefaultHost = 'securuscoin.org';

// remote node list update url, set to null if you don't have one
config.remoteNodeListUpdateUrl = 'https://raw.githubusercontent.com/JOXW/securuscoin_nodes/master/securuscoin_nodes.json';
//config.remoteNodeListUpdateUrl = null;


// fallback remote node list, in case fetching update failed, fill this with known to works remote nodes
config.remoteNodeListFallback = [
  'securuscoin.org:14115',
  '85.214.24.190:14115',
];

// your currency name
config.assetName = 'Securus';
// your currency ticker
config.assetTicker = 'SCR';
// your currency address prefix, for address validation
config.addressPrefix = 'SCR';
// standard wallet address length, for address validation
config.addressLength = 98;
// integrated wallet address length, for address validation. Added length is length of payment ID encoded in base58.
config.integratedAddressLength = config.addressLength + ((64 * 11) / 8);

// minimum fee for sending transaction
config.minimumFee = 0.010;
// minimum amount for sending transaction
config.mininumSend = 0.010;
// default mixin/anonimity for transaction
config.defaultMixin = 0;
// to represent human readable value
config.decimalPlaces = 3;
// to convert from atomic unit
config.decimalDivisor = 10 ** config.decimalPlaces;

// obfuscate address book entries, set to false if you want to save it in plain json file.
// not for security because the encryption key is attached here
config.addressBookObfuscateEntries = true;
// key use to obfuscate address book contents
config.addressBookObfuscationKey = '79009fb00ca1b7130832a42de45142cf6c4b7f333fe6fba5';
// initial/sample entries to fill new address book
config.addressBookSampleEntries = [
  {
    name: 'Your donation for the upcoming exchange listings',
    address: 'SCR1PahF4AN2DCBDE8MbFFTk6ABFiRe2nUNSP6gVhZANFfx2t6P5t8LKi7J2YkeaaJcR7jR4ZVKK2j88PtVmdAG18SwZKeLBUn',
    paymentId: '',
  }
];
// cipher config for private address book
config.addressBookCipherConfig = {
  algorithm: 'aes-256-gcm',
  saltLenght: 128,
  pbkdf2Rounds: 10000,
  pbkdf2Digest: 'sha512'
};

module.exports = config;
