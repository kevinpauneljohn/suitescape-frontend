import {useEffect, useState} from 'react';
import SuitescapeAPI from '../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../utilities/apiHelpers';
import {Alert} from 'react-native';
import {userStorage} from '../storage/userStorage';

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const token = userStorage.getString('token');

  const fetchVideos = async cursorOverride => {
    if (isLoading) {
      return;
    }

    const currentCursor =
      cursorOverride !== undefined ? cursorOverride : nextCursor;

    try {
      console.log('Fetching...', `/videos?cursor=${currentCursor}`);
      setIsLoading(true);
      const response = await SuitescapeAPI.get(
        `/videos?cursor=${currentCursor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleApiResponse({
        response,
        onSuccess: res => {
          let newVideos = res.data;

          if (cursorOverride !== undefined) {
            setVideos(newVideos);
            setNextCursor(res.next_cursor);
            return;
          }

          if (videos.length !== 0) {
            const existingVideoIds = new Set(videos.map(v => v.id));
            newVideos = newVideos.filter(
              video => !existingVideoIds.has(video.id),
            );
          }
          if (newVideos.length === 0) {
            return;
          }
          setVideos(prevVideos => [...prevVideos, ...newVideos]);
          setNextCursor(res.next_cursor);
        },
      });
    } catch (err) {
      handleApiError(err, e => Alert.alert('Error', e.message));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVideos().catch(() => {});
  }, []);

  return {videos, isLoading, isRefreshing, fetchVideos};
};

export default useFetchVideos;
