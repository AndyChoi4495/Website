import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { searchHistoryAtom } from "../store";
import { useAtom } from 'jotai';
import { addToHistory } from '../lib/userData';

export default function Search() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
            defaultValues: {
            searchBy: ["title"],
            q: "",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false
        }
      });



  const submitForm = async (data) => {
    console.log(data)
    let queryString = "";
    queryString = queryString.concat(`${data.searchBy}=true`)

    if(data.geoLocation != null && data.geoLocation != undefined &&  data.geoLocation == " "){
            queryString = queryString.concat(`&geoLocation=${data.geoLocation}`)
        }

        if(data.medium != null && data.medium != undefined && data.medium == " " ){
            queryString = queryString.concat(`&medium=${data.medium}`)
        }

        queryString = queryString.concat(`&isOnView=${data.isOnView}`)
        queryString = queryString.concat(`&isHighlight=${data.isHighlight}`)
        queryString = queryString.concat(`&q=${data.q}`)
        console.log(queryString)
    
    setSearchHistory(await addToHistory(queryString));
    
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="q"
              {...register("q", { required: true })}
              className={errors.q ? 'is-invalid' : ''}
              />
              {errors.q && <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with
              multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" name="medium"  {...register("medium")}/>
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;,
              &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check type="checkbox" label="Highlighted" name="isHighlight"  {...register("isHighlight")} />
          <Form.Check type="checkbox" label="Currently on View" name="isOnView"  {...register("isOnView")} />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    </>
  )
}
