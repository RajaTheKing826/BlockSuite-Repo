import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { theme } from 'twin.macro'

import { useGetCardBaseDetails } from '@hive-frontend/hive/common'
import { ArrowNarrowRightIcon } from '@hive-frontend/shared/icons'
import { CardColorEnum, cardColorTheme } from '@hive-frontend/shared/tasks'
import { isHexColor } from '@hive-frontend/shared/utils/common'

interface BaseCardProps {
   hiveUnitId: string
   onClickCard: () => void
   onDoubleClickCard: () => void
}

const BaseCard = (props: BaseCardProps): React.ReactElement => {
   const { hiveUnitId, onClickCard, onDoubleClickCard } = props
   const cardBaseDetails = useGetCardBaseDetails(hiveUnitId)

   const color = cardBaseDetails.color
   const cardBorderColor = useMemo(() => {
      const isHexColorPresent = isHexColor(color)
      if (isHexColorPresent) return color

      if (color === CardColorEnum.WHITE) return null

      const cardColorThemeObj = cardColorTheme[color as CardColorEnum]
      if (cardColorThemeObj) return cardColorThemeObj.labelColor

      return null
   }, [color])

   const renderSuffix = (): React.ReactElement => (
      <div
         style={{
            marginLeft: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
         onClick={onClickCard}
      >
         <ArrowNarrowRightIcon
            height={18}
            width={20}
            stroke={theme('colors.button-secondary-fg')}
         />
      </div>
   )

   const title = cardBaseDetails.title
   return (
      <div
         onDoubleClick={onDoubleClickCard}
         style={{
            border: `1px solid ${cardBorderColor ? cardBorderColor : '#d0d5dd'}`,
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
         }}
      >
         <p
            style={{
               fontSize: '16px',
               fontWeight: '500',
               lineHeight: '24px',
               width: '100%',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               whiteSpace: 'nowrap',
               color: '#101828',
               margin: '0px'
            }}
            title={title}
         >
            {title}
         </p>
         {renderSuffix()}
      </div>
   )
}

export default observer(BaseCard)
