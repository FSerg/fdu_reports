import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

import StatsSales from './StatsSales';
import StatsCards from './StatsCards';

class StatsPage extends Component {
  render() {
    return (
      <div>
        <StatsCards />
        <Divider horizontal />
        <StatsSales />
      </div>
    );
  }
}

export default StatsPage;
