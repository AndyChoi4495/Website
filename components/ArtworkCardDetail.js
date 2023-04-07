import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { favouritesAtom } from '../store';
import { useAtom } from 'jotai';
import {useState, useEffect} from 'react'
import { addToFavourites, removeFromFavourites} from '@/lib/userData'


export default function ArtworkCardDetail({objectID}) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID)) }, [favouritesList]) 

  const favouritesClicked = async () => {
  if (showAdded) {
    setFavouritesList(await removeFromFavourites(objectID));
    setShowAdded(false);
  } else {
    setFavouritesList(await addToFavourites(objectID)) 
    setShowAdded(true);
  }
};
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }
  return (
    <>
      <Card style={{ width: '50rem' }}>
      <Card.Title>{data.title}</Card.Title>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage}/>}
      <Card.Body>
        <Card.Text>
          Object Date: {data.objectDate || "N/A"}
          <br />
          Classification: {data.classification || "N/A"}
          <br />
          Medium: {data.medium || "N/A"}
          <br />
          <br />
          Artist: {data.artistDisplayName || "N/A"}
          {data.artistWikidata_URL && (
            <a href={data.artistWikidata_URL}target="_blank"rel="noreferrer"> Wiki</a>
          )}
          <br />
          Credit Line: {data.creditLine || "N/A"}
          <br />
          Dimensions: {data.dimensions || "N/A"}
        </Card.Text>
      </Card.Body>
      <Button variant={showAdded ? 'primary' : 'outline-primary'}
                    onClick={favouritesClicked}>{objectID}
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                  </Button>
    </Card>
    </>
  )
}