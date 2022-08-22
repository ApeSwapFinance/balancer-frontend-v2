import { ref } from 'vue';

import LS_KEYS from '@/constants/local-storage.keys';
import { lsGet, lsSet } from '@/lib/utils';

export enum EthereumTxType {
  LEGACY = 'Legacy'
}

const lsEthereumTxType = lsGet(
  LS_KEYS.App.EthereumTxType,
  EthereumTxType.LEGACY
);

// STATE
export const ethereumTxType = ref<EthereumTxType>(lsEthereumTxType);

// MUTATIONS
function setEthereumTxType(txType: EthereumTxType): void {
  ethereumTxType.value = txType;
  lsSet(LS_KEYS.App.EthereumTxType, txType);
}

// INIT
setEthereumTxType(ethereumTxType.value);

export default function useEthereumTxType() {
  return {
    ethereumTxType,
    setEthereumTxType
  };
}
