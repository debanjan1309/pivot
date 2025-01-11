from flask import Flask, render_template, request, jsonify
import nselib
from nselib import capital_market

app = Flask(__name__)

# F&O Equity List in List format
fnoEquityList = capital_market.fno_equity_list()
indian_stocks = [fnoEquityList['symbol'].iloc[i] for i in range(len(fnoEquityList))]

# Function to calculate pivot points for stocks
def pivotCalculatior(stockName):
    data = capital_market.price_volume_data(stockName, from_date='09-01-2025', to_date='10-01-2025')
    data['OpenPrice'] = data['OpenPrice'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['ClosePrice'] = data['ClosePrice'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['HighPrice'] = data['HighPrice'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['LowPrice'] = data['LowPrice'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    
    close = data['ClosePrice'].iloc[1]
    high = data['HighPrice'].iloc[1]
    low = data['LowPrice'].iloc[1]
    
    pivot = (high + close + low) / 3
    candleSize = high - low
    support1 = pivot - (0.382 * candleSize)
    support2 = pivot - (0.618 * candleSize)
    support3 = pivot - candleSize
    resistance1 = pivot + (0.382 * candleSize)
    resistance2 = pivot + (0.618 * candleSize)
    resistance3 = pivot + candleSize
    
    return {
        "pivot": round(pivot, 2),
        "support1": round(support1, 2),
        "support2": round(support2, 2),
        "support3": round(support3, 2),
        "resistance1": round(resistance1, 2),
        "resistance2": round(resistance2, 2),
        "resistance3": round(resistance3, 2),
    }

# Function to calculate pivot points for indexes
def indexPivotCalculator(indexName):
    data = capital_market.index_data(indexName, from_date='09-01-2025', to_date='10-01-2025')
    data['OPEN_INDEX_VAL'] = data['OPEN_INDEX_VAL'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['CLOSE_INDEX_VAL'] = data['CLOSE_INDEX_VAL'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['HIGH_INDEX_VAL'] = data['HIGH_INDEX_VAL'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    data['LOW_INDEX_VAL'] = data['LOW_INDEX_VAL'].apply(lambda x: float(x.replace(',', '')) if isinstance(x, str) else float(x))
    
    close = data['CLOSE_INDEX_VAL'].iloc[1]
    high = data['HIGH_INDEX_VAL'].iloc[1]
    low = data['LOW_INDEX_VAL'].iloc[1]
    
    pivot = (high + close + low) / 3
    candleSize = high - low
    support1 = pivot - (0.382 * candleSize)
    support2 = pivot - (0.618 * candleSize)
    support3 = pivot - candleSize
    resistance1 = pivot + (0.382 * candleSize)
    resistance2 = pivot + (0.618 * candleSize)
    resistance3 = pivot + candleSize
    
    return {
        "pivot": round(pivot, 2),
        "support1": round(support1, 2),
        "support2": round(support2, 2),
        "support3": round(support3, 2),
        "resistance1": round(resistance1, 2),
        "resistance2": round(resistance2, 2),
        "resistance3": round(resistance3, 2),
    }

# Route to display all stocks
@app.route('/')
def index():
    nifty_pivots = indexPivotCalculator('NIFTY 50')
    bank_nifty_pivots = indexPivotCalculator('NIFTY BANK')
    return render_template('index.html', stocks=indian_stocks, nifty=nifty_pivots, bank_nifty=bank_nifty_pivots)

# Route to fetch pivot points for a stock
@app.route('/get_pivot', methods=['POST'])
def get_pivot():
    stock_name = request.form.get('stock_name')
    if stock_name.upper() in indian_stocks:
        pivot_data = pivotCalculatior(stock_name.upper())
        return jsonify({"stock": stock_name.upper(), **pivot_data})
    else:
        return jsonify({"error": "Stock not found"})

if __name__ == '__main__':
    app.run(debug=True)
