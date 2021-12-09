import React from 'react';
import styled from '@emotion/styled';
import { colors, mq } from '../styles';
import { humanReadableTimeFromSeconds } from '../utils/helpers';
import { Link } from '@reach/router';
import { gql, useMutation } from '@apollo/client';

/**
 * Mutation to increment track's number of views
 * (exported for tests)
 */
export const INCREMENT_TRACK_VIEWS = gql`
  mutation IncrementTrackViewsMutation($incrementTrackViewsId: ID!) {
    incrementTrackViews(id: $incrementTrackViewsId) {
      code
      success
      message
      track {
        id
        numberOfViews
      }
    }
  }
`;

/**
 * Track Card component renders basic info in a card format
 * for each track populating the tracks grid homepage.
 */
const TrackCard = ({ track }) => {
  const { title, thumbnail, author, durationInSeconds, modulesCount, id } = track;

  /**
   * const [mutateFunction, {loading, error, data}] = useMutation(GRAPHQL_OPERATION, {
   *    variables: {var1: id}
   * });
   * Now, here's a twist: unlike with useQuery, calling useMutation doesn't actually execute the mutation automatically!
   * Instead, the useMutation hook returns an array with two elements, which we'll start to destructure here.
   * The first element is the mutate function we'll use to actually run the mutation later on. We'll call it incrementTrackViews.
   * The second element is an object with information about the mutation: loading, error and data. This component doesn't need for now.
   * This hook takes a GraphQL operation as the first parameter
   * It also takes in an options object as the second parameter, where properties like variables are set.
   */
  const [incrementTrackViews] = useMutation(INCREMENT_TRACK_VIEWS, {
    variables: { incrementTrackViewsId: id },
    // to observe what the mutation response returns
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return (
    <CardContainer to={`/track/${id}`} onClick={incrementTrackViews}>
      <CardContent>
        <CardImageContainer>
          <CardImage src={thumbnail} alt={title} />
        </CardImageContainer>
        <CardBody>
          <CardTitle>{title || ''}</CardTitle>
          <CardFooter>
            <AuthorImage src={author.photo} />
            <AuthorAndTrack>
              <AuthorName>{author.name}</AuthorName>
              <TrackLength>
                {modulesCount} modules - {humanReadableTimeFromSeconds(durationInSeconds)}
              </TrackLength>
            </AuthorAndTrack>
          </CardFooter>
        </CardBody>
      </CardContent>
    </CardContainer>
  );
};

export default TrackCard;

/** Track Card styled components */
const CardContainer = styled(Link)({
  borderRadius: 6,
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [mq[0]]: {
    width: '90%',
  },
  [mq[1]]: {
    width: '47%',
  },
  [mq[2]]: {
    width: '31%',
  },
  height: 380,
  margin: 10,
  overflow: 'hidden',
  position: 'relative',
  ':hover': {
    backgroundColor: colors.pink.lightest,
  },
  cursor: 'pointer',
  textDecoration: 'none',
});

const CardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
});

const CardTitle = styled.h3({
  textAlign: 'center',
  fontSize: '1.4em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text,
  flex: 1,
});

const CardImageContainer = styled.div({
  height: 220,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(250,0,150,0.20)',
  },
});

const CardImage = styled.img({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  filter: 'grayscale(60%)',
});

const CardBody = styled.div({
  padding: 18,
  flex: 1,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const CardFooter = styled.div({
  display: 'flex',
  flexDirection: 'Row',
});

const AuthorImage = styled.img({
  height: 30,
  width: 30,
  marginRight: 8,
  borderRadius: '50%',
  objectFit: 'cover',
});

const AuthorAndTrack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AuthorName = styled.div({
  lineHeight: '1em',
  fontSize: '1.1em',
});

const TrackLength = styled.div({
  fontSize: '0.8em',
});
