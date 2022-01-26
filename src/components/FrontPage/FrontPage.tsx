import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import VideoList, { Video } from '../VideoList/VideoList';
import styles from './FrontPage.module.css';

interface FrontPageProps { }
// I don't use Netflix too much so it's based off of this design from Pinterest:
// https://www.pinterest.com/pin/403916660332765856/
const FrontPage: FC<FrontPageProps> = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function getTitles() {
      const res = await fetch('http://localhost:9001/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getTitles {
                title
                thumbnail
              }
            }
          `,
        }),
      });

      return res.json()
    }

    getTitles()
      .then(async res => setVideos(res.data.getTitles))
      .catch(err => console.error(err))
  }, []);

  return (
    <div className={styles.FrontPage} data-testid="FrontPage">
      <Header></Header>
      <VideoList {...{ videos }}></VideoList>
    </div>
  );
};

export default FrontPage;
