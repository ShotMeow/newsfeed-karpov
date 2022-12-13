import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { IPartnerArticle } from '../../../partnersArticles/types';
import { getPartnersArticles } from '@app/api';

export const AdminArticles: FC = () => {
  const [articles, setArticles] = useState<IPartnerArticle[]>([]);

  useEffect(() => {
    (async () => {
      const articles = await getPartnersArticles();

      setArticles(articles);
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            Партнерские статьи
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" component={Link} to="/admin/create">
              Добавить новую
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {articles.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Card>
              <CardActionArea component={Link} to={`/admin/edit/${item.id}`}>
                <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
