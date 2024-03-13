import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IncomeTax from './IncomeTax';
import GST from './GST';
import MCA from './MCA';
import PF from './PF';
import ESIC from './ESIC';
import TDS from './TDS';

function CustomTabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
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

export default function Form() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Income Tax" {...a11yProps(0)} />
          <Tab label="GST" {...a11yProps(1)} />
          <Tab label="MCA" {...a11yProps(2)} />
          <Tab label="PF" {...a11yProps(3)} />
          <Tab label="ESIC" {...a11yProps(4)} />
          <Tab label="TDS" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IncomeTax/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GST/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MCA/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PF/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <ESIC/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <TDS/>
      </CustomTabPanel>
    </Box>
  );
}