import { ApolloError, useLazyQuery } from '@apollo/client'
import { useCardStoreV2 } from '@hive-frontend/hive/hive-core'
import { APIStatus } from '@ib/api-constants'

import { getAPIStatusFromNetworkStatus } from '@hive-frontend/shared/utils/web'

import {
   GetCardsQuery as Query,
   GetCardsDocument as QueryDocument,
   GetCardsQueryVariables as QueryVariables
} from './query.generatedTypes'
import useResponseHandler from './useResponseHandler'

interface TriggerAPIArgsType {
   cardIds: string[]
   onSuccess?: () => void
   onError?: (apolloError: ApolloError) => void
}

interface APIReturnType {
   apiError: ApolloError | null
   apiStatus: APIStatus
   triggerAPI: (args: TriggerAPIArgsType) => void
}

const useGetCards = (): APIReturnType => {
   const [getQueryData, { error, data, networkStatus }] = useLazyQuery<
      Query,
      QueryVariables
   >(QueryDocument)

   const responseHandler = useResponseHandler()
   const cardStore = useCardStoreV2()

   const triggerAPI = async (args: TriggerAPIArgsType): Promise<void> => {
      const { cardIds, onSuccess, onError } = args

      const variables = {
         params: {
            cardIds: cardIds
         }
      }

      const response = await getQueryData({
         variables,
         onError(error) {
            cardStore.addServerErrorCardIds(args.cardIds)
            onError?.(error)
         }
      })

      responseHandler.handleAPIResponse({
         data: response.data,
         onSuccess: onSuccess
      })
   }

   const result: APIReturnType = {
      triggerAPI,
      apiStatus: getAPIStatusFromNetworkStatus(networkStatus, data),
      apiError: error ?? null
   }

   return result
}

export default useGetCards
