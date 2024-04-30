import { customElement } from 'lit/decorators.js'
import { useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useHistory } from 'react-router-dom'
import { Provider, inject, observer } from 'mobx-react'

import { BlockElement } from '@blocksuite/block-std'
import {
   AppUIStoreContext,
   HiveUnitStoresProvider,
   IDMCoreWMStoresProvider,
   WorkflowsStoreProvider,
   appUIStore
} from '@hive-frontend/hive/hive-core'
import {
   ApolloClientWithAuthProvider,
   InvalidAuthSessionError,
   getAuthLink,
   useAuthSession
} from '@hive-frontend/shared/auth/common'
import { apolloClientConfig, region, url } from '@hive-frontend/hive/graphql'
import { CookieAuthSessionProvider } from '@hive-frontend/shared/auth/web'
import {
   ACCESS_TOKEN_KEY_NAME,
   REFRESH_TOKEN_KEY_NAME,
   useGetRefreshTokensAPI
} from '@hive-frontend/hive/auth'
import {
   APIError,
   isAppInUnderMaintenance,
   statusCodes
} from '@hive-frontend/shared/common'
import {
   LOGIN_ROUTE_PATH,
   WorkbookManagementUIStore,
   workbookManagementUIStore
} from '@hive-frontend/hive/common'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { CardBlockModel } from './schema'
import Card from './Card'

export const queryClient = new QueryClient()

interface ApolloClientWithAuthProviderWrapperProps {
   cardId: string
   onClickInvalidCard: () => void
}

interface InjectedProps extends ApolloClientWithAuthProviderWrapperProps {
   workbookManagementUIStore: WorkbookManagementUIStore
}

const ApolloClientWithAuthProviderWrapper = inject('workbookManagementUIStore')(
   observer((props: ApolloClientWithAuthProviderWrapperProps) => {
      const { getAccessToken: getAccessTokenFn, clearAccessTokenCookie } =
         useAuthSession()

      const { cardId, onClickInvalidCard, workbookManagementUIStore } =
         props as InjectedProps

      const history = useHistory()

      const handleGraphqlErrors = (error: any): void => {
         if (error.statusCode === statusCodes.UNDER_MAINTENANCE_CODE) {
            const apiErrorResponse: APIError = error.result

            if (isAppInUnderMaintenance(apiErrorResponse)) {
               appUIStore.setUnderMaintenance()
            }
         }
      }

      const getAccessToken = async (): Promise<string | void> => {
         try {
            const accessToken = await getAccessTokenFn()

            return accessToken
         } catch (error) {
            if (error instanceof InvalidAuthSessionError) {
               history.replace(LOGIN_ROUTE_PATH)
            }
         }
      }

      const link = getAuthLink({
         url,
         region,
         getAccessToken,
         handleGraphqlErrors,
         clearAccessTokenCookie
      })

      return (
         <ApolloClientWithAuthProvider config={{ ...apolloClientConfig, link }}>
            <Card
               cardId={cardId}
               onClickInvalidCard={onClickInvalidCard}
               workbookManagementUIStore={workbookManagementUIStore}
            />
         </ApolloClientWithAuthProvider>
      )
   })
)

interface CookieAuthSessionProviderWrapperProps {
   cardId: string
   onClickInvalidCard: () => void
}

const CookieAuthSessionProviderWrapper = observer(
   (props: CookieAuthSessionProviderWrapperProps) => {
      const getRefreshTokenAPI = useGetRefreshTokensAPI()

      return (
         <CookieAuthSessionProvider
            cookieDetails={{
               refreshTokensAPI: getRefreshTokenAPI,
               accessTokenKeyName: ACCESS_TOKEN_KEY_NAME,
               refreshTokenKeyName: REFRESH_TOKEN_KEY_NAME
            }}
         >
            <HiveUnitStoresProvider>
               <WorkflowsStoreProvider>
                  <IDMCoreWMStoresProvider>
                     <ApolloClientWithAuthProviderWrapper
                        cardId={props.cardId}
                        onClickInvalidCard={props.onClickInvalidCard}
                     />
                  </IDMCoreWMStoresProvider>
               </WorkflowsStoreProvider>
            </HiveUnitStoresProvider>
         </CookieAuthSessionProvider>
      )
   }
)

interface QueryClientProviderWrapperProps {
   cardId: string
   onClickInvalidCard: () => void
}

export const QueryClientProviderWrapper = observer(
   (props: QueryClientProviderWrapperProps) => {
      const { cardId, onClickInvalidCard } = props

      const appUIStoreRef = useRef(appUIStore)
      const stores = {
         workbookManagementUIStore
      }

      return (
         <QueryClientProvider client={queryClient}>
            <AppUIStoreContext.Provider value={appUIStoreRef.current}>
               <Provider {...stores}>
                  <CookieAuthSessionProviderWrapper
                     cardId={cardId}
                     onClickInvalidCard={onClickInvalidCard}
                  />
               </Provider>
            </AppUIStoreContext.Provider>
         </QueryClientProvider>
      )
   }
)

@customElement('affine-card-block')
export class CardBlockComponent extends BlockElement<CardBlockModel> {
   onClickInvalidCard = () => {
      this.doc.deleteBlock(this.model)
   }

   override connectedCallback() {
      super.connectedCallback()

      const root = this.attachShadow({ mode: 'open' })
      const mountPoint = document.createElement('div')
      root.appendChild(mountPoint)

      ReactDOM.render(
         <BrowserRouter>
            <QueryClientProviderWrapper
               cardId={this.model.cardId}
               onClickInvalidCard={this.onClickInvalidCard}
            />
         </BrowserRouter>,
         mountPoint
      )
   }
}
