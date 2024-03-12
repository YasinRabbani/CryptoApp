import { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { coinData } from './coin-data';
import { DataGrid,GridToolbar } from "@mui/x-data-grid";

const coinListStyle = css`
  padding: 20px;
`;

const coinItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const coinNameStyle = css`
  font-weight: bold;
`;

const priceStyle = css`
  margin-left: 20px;
`;

const CoinList = () => {
  const defaultCoins = useRef([])
  const [coins, setCoins] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      console.log(response)
      
      const data = response.ok ? await response.json() : coinData;
      
      setCoins(data);
      defaultCoins.current = data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: "market_cap_rank", headerName: "Rank", width: 10 },
    {
      field: "image",
      headerName: "Symbol Image",
      width: 60,
      renderCell: (params) => <img src={params.value} />,
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "current_price", headerName: "Price", width: 100 },
    { field: "high_24h", headerName: "High_24h", width: 100 },
    { field: "low_24h", headerName: "Low_24h", width: 100 },
    { field: "price_change_24h", headerName: "price-change-24", width: 100 },
    { field: "total_volume", headerName: "total_volume", width: 100 },
    { field: "price_change_percentage_24h", headerName: "Percentage-24", width: 100 },
   
   
  ];
  

  useEffect(() => {
    console.log(coinData)
    fetchData();
  }, []);

  const searchCrypto = (event) => {
    event.preventDefault()
    const newCoins = defaultCoins.current.filter(coin => coin.id.includes(event.target.value) || coin.symbol.includes(event.target.value))
    setCoins(newCoins)
  }

  if(coins.length ===0){
    return <>Loading </>
  }

  return (
    <div className={coinListStyle}>
      <h2>Cryptocurrency Prices</h2>
      <input onChange={searchCrypto}></input>
      <div>
      <DataGrid            
        loading
        {...coins}
          rows={coins}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 10]}  
          checkboxSelection    
        />   
      </div>
    </div>
  );
};

export default CoinList;