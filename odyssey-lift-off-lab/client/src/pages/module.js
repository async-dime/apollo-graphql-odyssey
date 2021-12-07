import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Layout, QueryResult } from '../components';
import ModuleDetail from '../components/module-detail';

// GraphQL query to fetch module and parent track data (built in apollo studio)
export const GET_MODULE_AND_PARENT_TRACK = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

/**
 * Module page fetches both parent track data and module's detail data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and provides it to the ModuleDetail component to display
 */
const Module = ({ trackId, moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: { trackId, moduleId },
  });

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
