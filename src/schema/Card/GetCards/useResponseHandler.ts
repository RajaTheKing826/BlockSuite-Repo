import { action } from 'mobx'

import { CardModelFactory } from '@hive-frontend/hive/file-workbook-management-common'
import {
   useCardStoreV2,
   useHiveUnitStore,
   useHiveUnitTemplateStore
} from '@hive-frontend/hive/hive-core'
import { Shared_MacroCardInfoFragment } from '@hive-frontend/hive/graphql-docs'

import { GetCardsQuery as Query } from './query.generatedTypes'

interface ResponseArgsType {
   data?: Query
   onSuccess?: () => void
}
interface ReturnType {
   handleAPIResponse: (args: ResponseArgsType) => void
}

const useResponseHandler = (): ReturnType => {
   const cardStore = useCardStoreV2()
   const hiveUnitStore = useHiveUnitStore()
   const hiveUnitTemplateStore = useHiveUnitTemplateStore()

   const handleCardResponse = action((card: Shared_MacroCardInfoFragment) => {
      CardModelFactory.createOrUpdateMacroCardInfo(
         cardStore,
         hiveUnitStore,
         hiveUnitTemplateStore,
         card
      )
   })

   const handleAPIResponse = (args: ResponseArgsType) => {
      if (!args.data) return
      const { getCardsInWorkbook } = args.data

      const notFoundCardIds: string[] = []
      const accessDeniedCardIds: string[] = []
      const deletedCardIds: string[] = []

      getCardsInWorkbook.forEach(card => {
         switch (card.__typename) {
            case 'Card': {
               handleCardResponse(card)
               break
            }
            case 'CardNotFound': {
               notFoundCardIds.push(card.cardId)
               break
            }
            case 'CardAccessDenied': {
               accessDeniedCardIds.push(card.cardId)
               break
            }
            case 'CardIsDeleted': {
               deletedCardIds.push(card.cardId)
               break
            }
            default: {
               cardStore.addServerErrorCardIds([card.cardId])
            }
         }
      })

      cardStore.addNotFoundCardIds(notFoundCardIds)
      cardStore.addDeletedCardIds(deletedCardIds)
      cardStore.addAccessDeniedCardIds(accessDeniedCardIds)
   }

   return { handleAPIResponse }
}
export default useResponseHandler
