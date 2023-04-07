import useSWR from 'swr';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {Pagination} from 'react-bootstrap'
import { Row, Col,Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json'
const PER_PAGE = 12;

export default function Index(){

    const [artworkList, setArtWorkList] = useState();
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    console.log(finalQuery)
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    if (error){
        return <Error statusCode={404} /> 
    }

    function previous(e){
        if(page >= 1){
          setPage(page-1)
        }
      }
      
      function next(e){
        if(page <artworkList.length){
          setPage(page + 1)  
        }
        
      }

      useEffect(() => {
        if (data) {
            let results = []
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
              const chunk = filteredResults.slice(i, i + PER_PAGE);
              results.push(chunk);
          }
            setArtWorkList(results)
            setPage(1)
        }
      }, [data]);

      if(artworkList == null){
        return null
      }

      return(
        <>
        {artworkList.length > 0 ? (
            <Row className="gy-4">
            {artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
                </Col>
            ))}
            </Row>
        ) : (
            <Card>
            <Card.Body>
                <h4>Nothing Here, Try searching for something else.</h4>
            </Card.Body>
            </Card>
        )}

        {artworkList.length > 0 && (
            <Row className="justify-content-center mt-4">
            <Col xs="auto">
                <Pagination>
                <Pagination.Prev onClick={previous} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={next} />
                </Pagination>
            </Col>
            </Row>
        )}
        </>
      )

}