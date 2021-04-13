import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const BREADCRUMB_FIELDS = gql`
  fragment BreadcrumbFields on DataEntity {
    breadcrumbs {
      items {
        id
        name
        type
      }
    }
  }
`;
