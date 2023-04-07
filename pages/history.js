import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '../lib/userData';

export default function history() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let parsedHistory = [];

  searchHistory.forEach(h => {
  let params = new URLSearchParams(h);
  let entries = params.entries();
  parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index])) 
  };
  return (
    <>{parsedHistory.length === 0 && (
        <Card className="mt-3">
          <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
        </Card>
      )}
      {parsedHistory.length > 0 && (
        <ListGroup className="mt-3">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}</>
  )
}
