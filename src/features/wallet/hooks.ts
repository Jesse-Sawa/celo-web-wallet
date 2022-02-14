import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'src/app/rootReducer'
import { NULL_ADDRESS } from 'src/consts'
import { getAccounts } from 'src/features/wallet/manager'
import { StoredAccountData } from 'src/features/wallet/storage'
import { logger } from 'src/utils/logger'
import { select } from 'typed-redux-saga'

export function useIsVoteSignerAccount() {
  const voteSignerFor = useSelector((s: RootState) => s.wallet.account.voteSignerFor)
  return !!voteSignerFor
}

export function useWalletAddress() {
  const address = useSelector((s: RootState) => s.wallet.address)
  return address || NULL_ADDRESS
}

export function useAccountList(
  onReady?: (accs: StoredAccountData[]) => void,
  refetchTrigger?: boolean
) {
  const [accounts, setAccounts] = useState<StoredAccountData[] | null>(null)
  useEffect(
    () => {
      // Get account list on screen mount
      const storedAccounts = getAccounts()
      if (!storedAccounts?.size) {
        logger.warn('No accounts found')
        return
      }
      const accountList = Array.from(storedAccounts.values())
      setAccounts(accountList)
      if (onReady) onReady(accountList)
    },
    typeof refetchTrigger === 'boolean' ? [refetchTrigger] : []
  )
  return accounts
}

export function useVoterAccountAddress() {
  const { address, account } = useSelector((s: RootState) => s.wallet)
  return account.voteSignerFor ?? address ?? NULL_ADDRESS
}

export function* selectVoterAccountAddress() {
  const { address, account } = yield* select((state: RootState) => state.wallet)
  if (!address || !account.lastUpdated)
    throw new Error('Attempting to select vote signer before wallet is initialized')
  return account.voteSignerFor ?? address
}
