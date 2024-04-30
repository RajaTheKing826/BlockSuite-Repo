import * as Types from '@hive-frontend/hive/graphql'

import { gql } from '@apollo/client'
import { Shared_MacroCardInfoFragmentDoc } from '@hive-frontend/hive/graphql-docs'
import * as Apollo from '@apollo/client'
export type GetCardsQueryVariables = Types.Exact<{
   params: Types.GetCardsInWorkbookParams
}>

export type GetCardsQuery = {
   __typename?: 'Query'
   getCardsInWorkbook: Array<
      | {
           __typename?: 'Card'
           cardId: string
           hiveUnitId: string
           templateId: string
           title: {
              __typename?: 'FieldResponse'
              fieldResponseId: string
              fieldId: string
              systemFieldEnum?: Types.SystemFieldEnum | null
              response?:
                 | {
                      __typename?: 'GQLDateTimeType'
                      dateTimeValue?: string | null
                   }
                 | { __typename?: 'GQLDateType'; dateValue?: string | null }
                 | { __typename?: 'GQLFloatType'; floatValue?: number | null }
                 | { __typename?: 'GQLIntType'; integerValue?: number | null }
                 | {
                      __typename?: 'GQLListStringType'
                      listValue: Array<string>
                   }
                 | { __typename?: 'GQLStringType'; stringValue?: string | null }
                 | { __typename?: 'GQLTimeType'; timeValue?: string | null }
                 | {
                      __typename?: 'PhoneNumberResponse'
                      dialCode: string
                      phoneNumber: string
                      iso2CountryCode?: string | null
                   }
                 | {
                      __typename?: 'Stage'
                      stageId: string
                      baseDetails: {
                         __typename?: 'BaseStage'
                         name: string
                         order: number
                         color: string
                      }
                   }
                 | {
                      __typename?: 'User'
                      userId: string
                      baseDetails: {
                         __typename?: 'UserBaseDetails'
                         profilePicUrl?: string | null
                         userName?: string | null
                      }
                   }
                 | {
                      __typename?: 'UserListType'
                      values: Array<{ __typename?: 'User'; userId: string }>
                   }
                 | null
           }
           priority?: {
              __typename?: 'FieldResponse'
              fieldResponseId: string
              fieldId: string
              systemFieldEnum?: Types.SystemFieldEnum | null
              response?:
                 | {
                      __typename?: 'GQLDateTimeType'
                      dateTimeValue?: string | null
                   }
                 | { __typename?: 'GQLDateType'; dateValue?: string | null }
                 | { __typename?: 'GQLFloatType'; floatValue?: number | null }
                 | { __typename?: 'GQLIntType'; integerValue?: number | null }
                 | {
                      __typename?: 'GQLListStringType'
                      listValue: Array<string>
                   }
                 | { __typename?: 'GQLStringType'; stringValue?: string | null }
                 | { __typename?: 'GQLTimeType'; timeValue?: string | null }
                 | {
                      __typename?: 'PhoneNumberResponse'
                      dialCode: string
                      phoneNumber: string
                      iso2CountryCode?: string | null
                   }
                 | {
                      __typename?: 'Stage'
                      stageId: string
                      baseDetails: {
                         __typename?: 'BaseStage'
                         name: string
                         order: number
                         color: string
                      }
                   }
                 | {
                      __typename?: 'User'
                      userId: string
                      baseDetails: {
                         __typename?: 'UserBaseDetails'
                         profilePicUrl?: string | null
                         userName?: string | null
                      }
                   }
                 | {
                      __typename?: 'UserListType'
                      values: Array<{ __typename?: 'User'; userId: string }>
                   }
                 | null
           } | null
           color?: {
              __typename?: 'FieldResponse'
              fieldResponseId: string
              fieldId: string
              systemFieldEnum?: Types.SystemFieldEnum | null
              response?:
                 | {
                      __typename?: 'GQLDateTimeType'
                      dateTimeValue?: string | null
                   }
                 | { __typename?: 'GQLDateType'; dateValue?: string | null }
                 | { __typename?: 'GQLFloatType'; floatValue?: number | null }
                 | { __typename?: 'GQLIntType'; integerValue?: number | null }
                 | {
                      __typename?: 'GQLListStringType'
                      listValue: Array<string>
                   }
                 | { __typename?: 'GQLStringType'; stringValue?: string | null }
                 | { __typename?: 'GQLTimeType'; timeValue?: string | null }
                 | {
                      __typename?: 'PhoneNumberResponse'
                      dialCode: string
                      phoneNumber: string
                      iso2CountryCode?: string | null
                   }
                 | {
                      __typename?: 'Stage'
                      stageId: string
                      baseDetails: {
                         __typename?: 'BaseStage'
                         name: string
                         order: number
                         color: string
                      }
                   }
                 | {
                      __typename?: 'User'
                      userId: string
                      baseDetails: {
                         __typename?: 'UserBaseDetails'
                         profilePicUrl?: string | null
                         userName?: string | null
                      }
                   }
                 | {
                      __typename?: 'UserListType'
                      values: Array<{ __typename?: 'User'; userId: string }>
                   }
                 | null
           } | null
           breakdownEntity?: {
              __typename?: 'BreakdownEntity'
              workbookId: string
              pageId: string
              listId?: string | null
           } | null
           stage?: {
              __typename?: 'FieldResponse'
              fieldResponseId: string
              fieldId: string
              systemFieldEnum?: Types.SystemFieldEnum | null
              response?:
                 | {
                      __typename?: 'GQLDateTimeType'
                      dateTimeValue?: string | null
                   }
                 | { __typename?: 'GQLDateType'; dateValue?: string | null }
                 | { __typename?: 'GQLFloatType'; floatValue?: number | null }
                 | { __typename?: 'GQLIntType'; integerValue?: number | null }
                 | {
                      __typename?: 'GQLListStringType'
                      listValue: Array<string>
                   }
                 | { __typename?: 'GQLStringType'; stringValue?: string | null }
                 | { __typename?: 'GQLTimeType'; timeValue?: string | null }
                 | {
                      __typename?: 'PhoneNumberResponse'
                      dialCode: string
                      phoneNumber: string
                      iso2CountryCode?: string | null
                   }
                 | {
                      __typename?: 'Stage'
                      stageId: string
                      baseDetails: {
                         __typename?: 'BaseStage'
                         name: string
                         order: number
                         color: string
                      }
                   }
                 | {
                      __typename?: 'User'
                      userId: string
                      baseDetails: {
                         __typename?: 'UserBaseDetails'
                         profilePicUrl?: string | null
                         userName?: string | null
                      }
                   }
                 | {
                      __typename?: 'UserListType'
                      values: Array<{ __typename?: 'User'; userId: string }>
                   }
                 | null
           } | null
        }
      | {
           __typename?: 'CardAccessDenied'
           message?: string | null
           cardId: string
        }
      | {
           __typename?: 'CardIsDeleted'
           message?: string | null
           cardId: string
        }
      | { __typename?: 'CardNotFound'; message?: string | null; cardId: string }
   >
}

export const GetCardsDocument = gql`
   query GetCards($params: GetCardsInWorkbookParams!) {
      getCardsInWorkbook(params: $params) {
         ... on Card {
            ...Shared_MacroCardInfo
         }
         ... on CardNotFound {
            message
            cardId
         }
         ... on CardAccessDenied {
            message
            cardId
         }
         ... on CardIsDeleted {
            message
            cardId
         }
      }
   }
   ${Shared_MacroCardInfoFragmentDoc}
`
export type GetCardsQueryResult = Apollo.QueryResult<
   GetCardsQuery,
   GetCardsQueryVariables
>
