import { memo } from 'react'
import SwapIcon from 'src/components/icons/swap.svg'
import { Box } from 'src/components/layout/Box'
import { CELO, Token } from 'src/currency'
import { Color } from 'src/styles/Color'

function _ExchangeIcon({ toToken }: { toToken: Token }) {
  const backgroundColor = toToken.id === CELO.id ? Color.primaryGold : Color.primaryGreen
  return (
    <Box
      align="center"
      justify="center"
      styles={{
        height: '34px',
        width: '34px',
        borderRadius: '50%',
        backgroundColor,
      }}
    >
      <img width="18px" height="18px" src={SwapIcon} alt="Exchange" />
    </Box>
  )
}

export const ExchangeIcon = memo(_ExchangeIcon)
