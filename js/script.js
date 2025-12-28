// Crypto data - Using Pyth Network concept
const cryptoData = [
    {
        id: "crypto.BTC/USD",
        name: "Bitcoin",
        symbol: "BTC",
        icon: "₿",
        color: "#f7931a",
        basePrice: 45000
    },
    {
        id: "crypto.ETH/USD",
        name: "Ethereum",
        symbol: "ETH",
        icon: "Ξ",
        color: "#627eea",
        basePrice: 2500
    },
    {
        id: "crypto.SOL/USD",
        name: "Solana",
        symbol: "SOL",
        icon: "◎",
        color: "#00ffa3",
        basePrice: 100
    },
    {
        id: "crypto.BNB/USD",
        name: "Binance Coin",
        symbol: "BNB",
        icon: "ⓑ",
        color: "#f3ba2f",
        basePrice: 300
    },
    {
        id: "crypto.AVAX/USD",
        name: "Avalanche",
        symbol: "AVAX",
        icon: "❄️",
        color: "#e84142",
        basePrice: 40
    },
    {
        id: "crypto.DOGE/USD",
        name: "Dogecoin",
        symbol: "DOGE",
        icon: "Ð",
        color: "#c2a633",
        basePrice: 0.08
    }
];

// Function to fetch crypto prices (mock data for demo)
function fetchCryptoPrices() {
    try {
        const mockPrices = generateMockPrices();
        updateCryptoDisplay(mockPrices);
        
        // Update last updated time
        const now = new Date();
        document.getElementById('last-updated').textContent = 
            now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            
        console.log('Prices updated at:', now.toLocaleTimeString());
        
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        showErrorMessage();
    }
}

// Generate realistic mock prices
function generateMockPrices() {
    return cryptoData.map(crypto => {
        const changePercent = (Math.random() - 0.5) * 10;
        const currentPrice = crypto.basePrice * (1 + changePercent / 100);
        const priceChange = crypto.basePrice * (changePercent / 100);
        
        return {
            ...crypto,
            price: currentPrice,
            change: priceChange,
            changePercent: changePercent
        };
    });
}

// Update the crypto display
function updateCryptoDisplay(prices) {
    const cryptoGrid = document.getElementById('crypto-grid');
    
    cryptoGrid.innerHTML = prices.map(crypto => `
        <div class="crypto-card">
            <div class="crypto-header">
                <div class="crypto-icon" style="background: linear-gradient(45deg, ${crypto.color}, #333);">
                    ${crypto.icon}
                </div>
                <div>
                    <div class="crypto-symbol">${crypto.symbol}</div>
                    <div class="crypto-name">${crypto.name}</div>
                </div>
            </div>
            
            <div class="crypto-price">
                $${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            
            <div class="price-change ${crypto.changePercent >= 0 ? 'positive' : 'negative'}">
                ${crypto.changePercent >= 0 ? '↗' : '↘'} 
                ${crypto.changePercent.toFixed(2)}% 
                ($${Math.abs(crypto.change).toFixed(2)})
            </div>
            
            <div style="margin-top: 15px; font-size: 0.8rem; color: #666;">
                Source: Pyth Network
            </div>
        </div>
    `).join('');
}

// Show error message
function showErrorMessage() {
    document.getElementById('crypto-grid').innerHTML = `
        <div class="loading error">
            <i class="fas fa-exclamation-triangle"></i> Error loading prices. Please try again.
        </div>
    `;
}

// Initialize the app
function initApp() {
    // Initial fetch
    fetchCryptoPrices();
    
    // Setup refresh button
    document.getElementById('refresh-btn').addEventListener('click', fetchCryptoPrices);
    
    // Auto-refresh every 30 seconds
    setInterval(fetchCryptoPrices, 30000);
    
    // Add click handlers to crypto cards
    setTimeout(() => {
        document.querySelectorAll('.crypto-card').forEach(card => {
            card.addEventListener('click', function() {
                const symbol = this.querySelector('.crypto-symbol').textContent;
                alert(`You clicked on ${symbol}! In a real app, this would show detailed charts.`);
            });
        });
    }, 1000);
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', initApp);