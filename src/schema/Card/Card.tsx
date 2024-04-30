import React, { useEffect } from 'react'
import { observer } from 'mobx-react'

import { isAPIFetching } from '@ib/api-utils'
import {
   CardStatus,
   useCardStoreV2,
   useHiveUnitStore
} from '@hive-frontend/hive/hive-core'
import { WorkbookManagementUIStore } from '@hive-frontend/hive/common'

import { cardDoubleClickSlot, cardSingleClickSlot } from '../../slot/slot'

import useGetCards from './GetCards/useGetCards'
import BaseCard from './BaseCard'

interface CardProps {
   cardId: string
   onClickInvalidCard: () => void
   workbookManagementUIStore: WorkbookManagementUIStore
}

const Card = (props: CardProps): React.ReactElement => {
   const hiveUnitStore = useHiveUnitStore()

   const { cardId, onClickInvalidCard, workbookManagementUIStore } = props
   const cardsStore = useCardStoreV2()
   const getCardDetailsAPIObj = useGetCards()

   const isCardAvailable = cardsStore.hasCard(cardId)
   const cardDetails = cardsStore.getCardWithStatus(cardId)

   useEffect(() => {
      if (isCardAvailable) return

      const isBulkCardsAPIFetching =
         workbookManagementUIStore.bulkCardsAPIStatuses.some(isAPIFetching)
      if (isBulkCardsAPIFetching) return

      getCardDetailsAPIObj.triggerAPI({
         cardIds: [cardId]
      })
   }, [])

   const onClickCard = () => {
      cardSingleClickSlot.emit({ cardId })
   }

   const onDoubleClickCard = () => {
      cardDoubleClickSlot.emit({ cardId })
   }

   const renderErrorCard = (): React.ReactElement => (
      <div
         onClick={onClickInvalidCard}
         style={{
            border: '1px solid #d92d20',
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
               color: '#d92d20',
               margin: '0px'
            }}
            title={'Invalid Card'}
         >
            {'Invalid Card'}
         </p>
      </div>
   )

   const renderSuccessView = (): React.ReactElement => {
      switch (cardDetails.status) {
         case CardStatus.SUCCESS: {
            const hiveUnitModel = hiveUnitStore.hasHiveUnit(
               cardDetails.cardModel.hiveUnitId
            )

            if (!hiveUnitModel) return renderErrorCard()

            return (
               <BaseCard
                  hiveUnitId={cardDetails.cardModel.hiveUnitId}
                  onClickCard={onClickCard}
                  onDoubleClickCard={onDoubleClickCard}
               />
            )
         }
         case CardStatus.ERROR:
            return renderErrorCard()

         case CardStatus.FETCHING:
            return (
               <div
                  style={{
                     border: '1px solid #ffffff',
                     borderRadius: '8px',
                     backgroundColor: '#d0d5dd',
                     cursor: 'pointer',
                     minWidth: '100px',
                     minHeight: '40px',
                     boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                  }}
               ></div>
            )
      }
   }

   return renderSuccessView()
}

export default observer(Card)
