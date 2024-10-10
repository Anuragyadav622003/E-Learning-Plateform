import React, { memo } from 'react'
import ActiveUserNewUserCart from './ActiveUserNewUserCart'
import RevenueProfitChart from './RevenueGenerateChart'

function DashboardCharts() {
  return (
    <>
    <div className=''>
        <ActiveUserNewUserCart/>
    </div>
    <div>
    <ActiveUserNewUserCart/>
    </div>
    <div>
    <RevenueProfitChart/>
    </div>
    </>
  )
}

export default memo(DashboardCharts)