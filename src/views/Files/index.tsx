import { Redirect, Route, Switch } from 'react-router';
import FilesDir from 'views/Files/FilesDir';
import FilesFavorites from 'views/Files/FilesFavorites';
import FilesNewest from 'views/Files/FilesNewest';

const FilesRouter: React.FC = () => {
  return (
    <Switch>
      <Route path='/files' exact>
        <Redirect to='/files/dir' />
      </Route>
      <Route path='/files/dir'>
        <FilesDir />
      </Route>
      <Route path='/files/newest' exact>
        <FilesNewest />
      </Route>
      <Route path='/files/favorites' exact>
        <FilesFavorites />
      </Route>
    </Switch>
  );
};

export default FilesRouter;
