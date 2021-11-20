import { Route, Switch } from 'react-router';
import Photos from 'views/Photos/Photos';
import PhotoVideos from 'views/Photos/PhotoVideos';
import PhotoFavorites from 'views/Photos/PhotoFavorites';

const PhotosRouter: React.FC = () => {
  return (
    <Switch>
      <Route path='/photos' exact>
        <Photos />
      </Route>
      <Route path='/photos/videos' exact>
        <PhotoVideos />
      </Route>
      <Route path='/photos/favorites' exact>
        <PhotoFavorites />
      </Route>
    </Switch>
  );
};

export default PhotosRouter;
