import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Upload, Play, Pause, Square, TrendingUp, TrendingDown, DollarSign, Activity, Settings, Eye, Trash2, FileText, AlertCircle } from 'lucide-react';

const CryptoTradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [strategies, setStrategies] = useState([
    {
      id: 1,
      name: 'DCA Bitcoin Strategy',
      status: 'running',
      roi: 12.5,
      totalValue: 15750,
      initialValue: 14000,
      trades: 24,
      lastTrade: '2025-08-03T10:30:00Z',
      type: 'DCA',
      asset: 'BTC/USDT'
    },
    {
      id: 2,
      name: 'Arbitrage ETH-MATIC',
      status: 'paused',
      roi: -2.1,
      totalValue: 9895,
      initialValue: 10100,
      trades: 8,
      lastTrade: '2025-08-03T08:15:00Z',
      type: 'Arbitrage',
      asset: 'ETH/MATIC'
    },
    {
      id: 3,
      name: 'Momentum Trading',
      status: 'running',
      roi: 28.3,
      totalValue: 6415,
      initialValue: 5000,
      trades: 156,
      lastTrade: '2025-08-03T11:45:00Z',
      type: 'Momentum',
      asset: 'Multi-Asset'
    }
  ]);

  const [portfolioData, setPortfolioData] = useState([
    { date: '2025-07-01', value: 25000 },
    { date: '2025-07-08', value: 26200 },
    { date: '2025-07-15', value: 25800 },
    { date: '2025-07-22', value: 27500 },
    { date: '2025-07-29', value: 29100 },
    { date: '2025-08-03', value: 32060 }
  ]);

  const [recentTrades, setRecentTrades] = useState([
    { id: 1, strategy: 'DCA Bitcoin Strategy', type: 'BUY', amount: '0.025 BTC', price: '$62,450', time: '11:45 AM', status: 'completed' },
    { id: 2, strategy: 'Momentum Trading', type: 'SELL', amount: '150 MATIC', price: '$0.68', time: '11:30 AM', status: 'completed' },
    { id: 3, strategy: 'DCA Bitcoin Strategy', type: 'BUY', amount: '0.030 BTC', price: '$61,890', time: '10:30 AM', status: 'completed' },
    { id: 4, strategy: 'Momentum Trading', type: 'BUY', amount: '2.5 ETH', price: '$3,245', time: '09:15 AM', status: 'completed' }
  ]);

  const assetAllocation = [
    { name: 'BTC', value: 45, color: '#f7931a' },
    { name: 'ETH', value: 30, color: '#627eea' },
    { name: 'MATIC', value: 15, color: '#8247e5' },
    { name: 'USDT', value: 10, color: '#26a17b' }
  ];

  const performanceMetrics = [
    { metric: 'Total P&L', value: '+$7,060', change: '+28.24%', trend: 'up' },
    { metric: 'Win Rate', value: '68.5%', change: '+2.1%', trend: 'up' },
    { metric: 'Sharpe Ratio', value: '1.85', change: '+0.12', trend: 'up' },
    { metric: 'Max Drawdown', value: '-5.2%', change: '+1.8%', trend: 'up' }
  ];

  const toggleStrategy = (id, action) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id 
        ? { ...strategy, status: action }
        : strategy
    ));
  };

  const removeStrategy = (id) => {
    setStrategies(prev => prev.filter(strategy => strategy.id !== id));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate strategy upload
      const newStrategy = {
        id: strategies.length + 1,
        name: file.name.replace('.py', '').replace(/[_-]/g, ' '),
        status: 'stopped',
        roi: 0,
        totalValue: 0,
        initialValue: 0,
        trades: 0,
        lastTrade: null,
        type: 'Custom',
        asset: 'TBD'
      };
      setStrategies(prev => [...prev, newStrategy]);
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.metric}</p>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${metric.trend === 'up' ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
                <DollarSign className={`w-6 h-6 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {assetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                <span className="text-gray-300 text-sm">{asset.name}: {asset.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Trades</h3>
          <div className="space-y-3">
            {recentTrades.slice(0, 6).map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${trade.type === 'BUY' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <p className="text-white text-sm font-medium">{trade.amount}</p>
                    <p className="text-gray-400 text-xs">{trade.strategy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{trade.price}</p>
                  <p className="text-gray-400 text-xs">{trade.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StrategiesTab = () => (
    <div className="space-y-6">
      {/* Upload Strategy */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Upload Trading Strategy</h3>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Upload your Python trading strategy</p>
          <p className="text-gray-500 text-sm mb-4">Supports .py files with 1inch API integration</p>
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
            Choose File
            <input type="file" className="hidden" accept=".py" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Active Strategies */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Active Strategies</h3>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-semibold text-white mr-3">{strategy.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strategy.status === 'running' ? 'bg-green-400/20 text-green-400' :
                      strategy.status === 'paused' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-gray-400/20 text-gray-400'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">ROI</p>
                      <p className={`font-semibold ${strategy.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {strategy.roi >= 0 ? '+' : ''}{strategy.roi}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Value</p>
                      <p className="text-white font-semibold">${strategy.totalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Trades</p>
                      <p className="text-white font-semibold">{strategy.trades}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Asset</p>
                      <p className="text-white font-semibold">{strategy.asset}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {strategy.status === 'running' ? (
                    <button
                      onClick={() => toggleStrategy(strategy.id, 'paused')}
                      className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStrategy(strategy.id, 'running')}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => toggleStrategy(strategy.id, 'stopped')}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeStrategy(strategy.id)}
                    className="p-2 bg-gray-600 hover:bg-red-600 rounded-lg text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Strategy Performance Comparison */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Strategy Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={strategies}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Bar dataKey="roi" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trade Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Trade Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Successful Trades</span>
              <span className="text-green-400 font-semibold">129 (68.5%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '68.5%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Failed Trades</span>
              <span className="text-red-400 font-semibold">59 (31.5%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: '31.5%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Value at Risk (VaR)</span>
              <span className="text-white">$1,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Beta</span>
              <span className="text-white">1.12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Alpha</span>
              <span className="text-green-400">+0.08</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Volatility</span>
              <span className="text-white">15.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">CryptoTrader Pro</h1>
            <span className="ml-3 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">1inch Powered</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Portfolio</p>
              <p className="text-lg font-semibold text-white">$32,060</p>
            </div>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex space-x-8">
          {['dashboard', 'strategies', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'strategies' && <StrategiesTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </main>

      {/* 1inch Integration Notice */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">1inch API Integration</p>
            <p className="text-xs opacity-90 mt-1">
              All trades are executed through 1inch DEX aggregator for optimal rates and minimal slippage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTradingPlatform;