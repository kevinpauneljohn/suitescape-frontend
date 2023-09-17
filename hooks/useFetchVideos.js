import {useEffect, useState} from 'react';
import SuitescapeAPI from '../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../utilities/apiHelpers';
import {Alert} from 'react-native';

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const resetVideos = () => {
    setVideos([]);
  };

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
      );
      handleApiResponse({
        response,
        onError: e => Alert.alert('Error', e.message),
        onSuccess: res => {
          if (videos.length === 0) {
            setVideos(res.data);
          } else if (nextCursor) {
            setVideos(prevVideos => [...prevVideos, ...res.data]);
          }
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

  return {videos, isLoading, isRefreshing, fetchVideos, resetVideos};
};

export default useFetchVideos;
