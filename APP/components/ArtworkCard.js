import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

export default function ArtworkCard({ objectID }){
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const {
      primaryImageSmall,
      title,
      objectDate,
      classification,
      medium,
    } = data;

    const imageUrl = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[Not+Available]';

    return (
      <Card>
        <Card.Img src={imageUrl} alt={title} />
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {objectDate || 'N/A'}
          <br />
          Classification: {classification || 'N/A'}
          <br />
          Medium: {medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card>
    );
  }

  return null;
};

