function toggleStocks(sectorId) {
    const allChildren = document.querySelectorAll('.children');
    allChildren.forEach(child => {
        if (child.id === sectorId) {
            child.style.display = child.style.display === 'block' ? 'none' : 'block';
        } else {
            child.style.display = 'none';
        }
    });

    const allParents = document.querySelectorAll('.node.parent');
    allParents.forEach(parent => {
        if (parent.id + '-children' === sectorId) {
            parent.classList.toggle('active');
        } else {
            parent.classList.remove('active');
        }
    });
}

function calculateStatus(high, low, close) {
    const pivot = (high + low + close) / 3;
    return close > pivot ? 'bullish' : 'bearish';
}

function updateTree() {
    const sectors = document.querySelectorAll('.node.parent');
    sectors.forEach(sector => {
        const high = parseFloat(sector.dataset.high);
        const low = parseFloat(sector.dataset.low);
        const close = parseFloat(sector.dataset.close);
        const status = calculateStatus(high, low, close);
        sector.classList.add(status);

        const sectorId = sector.id + "-children";
        const stocks = document.querySelectorAll(`#${sectorId} .node.stock`);
        stocks.forEach(stock => {
            const stockHigh = parseFloat(stock.dataset.high);
            const stockLow = parseFloat(stock.dataset.low);
            const stockClose = parseFloat(stock.dataset.close);
            const stockStatus = calculateStatus(stockHigh, stockLow, stockClose);
            stock.classList.add(stockStatus);
        });
    });
}

window.onload = updateTree;
