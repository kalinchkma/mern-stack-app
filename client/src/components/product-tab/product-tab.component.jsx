import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, List, ListItem} from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
// component imports
import ProductCard from './product-card/product-card.component';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
            {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// product tab components
export default function ProductTab({selectProduct, products, gameInfo}) {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="Info" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* product list */}
      <TabPanel value={value} index={0} >
          <List sx={{width: "100%", mt: 3, bgcolor: "background.paper"}} >
            {
              products.length &&
              products.map(product => (
                <ProductCard key={product._id} product={product} 
                  selectProduct={selectProduct}
                  
                 />
              ))
            }
          </List>
      </TabPanel>



      {/* game info */}
      <TabPanel value={value} index={1}>
          <Box sx={{
            padding: "10px  "
          }}>
            <List sx={{width: "100%", mt: 3, }}>
              {/* sigle items =========== */}
                { gameInfo.description.length > 0 && 
                  gameInfo.description.map(info => (
                    <ListItem key={info} sx={{display: "flex", alignItems: "start", justifyContent: "start"}} >
                      <ArrowRightIcon />{ info }
                    </ListItem>
                  ))
                }
              
                {/* ================ */}
                {/* video link */}
                { gameInfo.videoLink.length > 0 &&
                  <ListItem sx={{display: "flex", alignItems: "start", justifyContent: "start"}} >
                    <VideoLibraryIcon sx={{marginRight: "10px", color: "red"}} /><Link target="_blank" sx={{textTransform: "lowercase"}} href={gameInfo.videoLink}>{gameInfo.videoLink}</Link>
                  </ListItem>      
                }

              
                {/* ==================== */}
            </List>
          </Box>
      </TabPanel>
      
    </Box>
  );
}
