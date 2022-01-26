import React, { FC } from 'react';
import styles from './VideoList.module.css';

export type Video = {
  title: string
  thumbnail: string
}

interface VideoListProps {
  videos?: Video[]
}

const VideoList: FC<VideoListProps> = ({ videos }) => (
  <div className={styles.VideoList} data-testid="VideoList">
    {
      videos?.map((videoData, i) => (
        <figure key={i}>
          <img src={'/videos/' + videoData.thumbnail}/>
          <figcaption>{videoData.title}</figcaption>
        </figure>
      ))
    }
  </div>
);

export default VideoList;
