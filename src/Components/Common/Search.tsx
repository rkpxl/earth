import React, { ChangeEvent } from 'react';
import { Grid, InputBase, IconButton, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import id from 'date-fns/esm/locale/id/index.js';
import { debounce } from '../../Utils/util';


interface IProps {
  setText: Function
}

const SearchPage: React.FC<IProps> = ( { setText } ) => {
  const textDebouce = debounce((value: string) => {
    setText(value);
  }, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    textDebouce(e.target.value)
  };


  return (
    <Grid container>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '20px',
          padding: '2px 4px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
        />
      </Paper>
    </Grid>
  );
};

export default SearchPage;
