import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import ArtworkCard from "../components/ArtworkCard";
import { Container, Row, Col, Card } from "react-bootstrap";



export default function favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  if(!favouritesList) return null; 
  
  return (
    <>
    {favouritesList.length === 0 ? (
      <Card>
        <Card.Body>
          <h4>Nothing Here.</h4>
          <p>Try adding some new artwork to the list.</p>
        </Card.Body>
      </Card>
      ) : (
      <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}

      </>
  )
}
