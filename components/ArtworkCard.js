import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import React, { useState } from 'react';



export default function ArtworkCard({objectID}) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
  );
  if (error) return <Error statusCode={404} />;
  if (!data) {
    return null;
  }

  const imageSrc = data.primaryImageSmall
    ?  data.primaryImageSmall
    : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  return (
    <>
      <Card style={{ width: '18rem' }}>
      <Card.Title>{data.title}</Card.Title>
        <Card.Img variant="top" src={imageSrc} />
        <Card.Body>
          <Card.Text>
            Object Date: {data.objectDate || "N/A"}
            <br />
            Classification: {data.classification || "N/A"}
            <br />
            Medium: {data.medium || "N/A"}
          </Card.Text>
          <Nav.Link href={`/artwork/${objectID}`} passHref legacyBehaviour>
            <Button variant="outline-success">{objectID}</Button>
          </Nav.Link>
        </Card.Body>
      </Card>
    </>
  )
}


