import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/ui/Loader';
import type { AppDispatch, RootState } from '../../../store/store';
import { fetchProducts } from '../../../store/slice';
import type { Product } from './dashboard.schema';

const PAGE_SIZE = 25;

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, loading } = useSelector((state: RootState) => state.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page, pageSize: PAGE_SIZE }));
  }, [dispatch, page]);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f4f6fa', minHeight: '100vh' }}>
      <Typography variant="h5" align="left" gutterBottom>
        Products
      </Typography>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <Typography variant="h6" color="text.secondary">
            No data to display
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={product.id} >
              <Card>
                <CardActionArea onClick={() => handleCardClick(product)} sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/260x180?text=No+Image'
                    }
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" fontWeight={500}>
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                      {product.description?.slice(0, 60) || ''}
                    </Typography>
                    {product.category?.name && (
                      <Chip label={product.category.name} size="small" sx={{ mt: 1, bgcolor: '#e3f2fd', color: '#1976d2' }} />
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination count={Math.ceil(total / PAGE_SIZE)} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
          {selectedProduct?.title}
          <IconButton aria-label="close" onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box>
              <CardMedia
                component="img"
                height="200"
                image={
                  selectedProduct.images && selectedProduct.images.length > 0
                    ? selectedProduct.images[0]
                    : 'https://via.placeholder.com/400x250?text=No+Image'
                }
                alt={selectedProduct.title}
                sx={{ objectFit: 'cover', borderRadius: 2, mb: 2 }}
              />
              <Typography variant="h6" fontWeight={600} mb={1}>
                ${selectedProduct.price}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {selectedProduct.description}
              </Typography>
              {selectedProduct.category?.name && (
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Category: {selectedProduct.category.name}
                </Typography>
              )}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  {selectedProduct.images.slice(1).map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`product-${idx}`}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 6,
                        border: '1px solid #eee',
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
