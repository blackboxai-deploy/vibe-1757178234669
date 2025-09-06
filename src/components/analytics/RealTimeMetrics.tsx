'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDialer } from '@/contexts/DialerContext';

export function RealTimeMetrics() {
  const { state } = useDialer();

  // Mock real-time data for demonstration
  const hourlyData = [
    { time: '09:00', calls: 12, connections: 8 },
    { time: '10:00', calls: 18, connections: 12 },
    { time: '11:00', calls: 24, connections: 16 },
    { time: '12:00', calls: 15, connections: 9 },
    { time: '13:00', calls: 21, connections: 14 },
    { time: '14:00', calls: 30, connections: 19 },
    { time: '15:00', calls: 27, connections: 18 },
    { time: '16:00', calls: 33, connections: 22 },
  ];

  const callOutcomes = [
    { name: 'Connected', value: 145, color: '#10b981' },
    { name: 'Voicemail', value: 89, color: '#f59e0b' },
    { name: 'Busy', value: 34, color: '#ef4444' },
    { name: 'No Answer', value: 67, color: '#6b7280' },
  ];

  const agentPerformance = [
    { agent: 'Sarah M.', calls: 89, connections: 67, rate: 75.3 },
    { agent: 'Mike R.', calls: 76, connections: 54, rate: 71.1 },
    { agent: 'Lisa K.', calls: 92, connections: 61, rate: 66.3 },
    { agent: 'Tom W.', calls: 68, connections: 41, rate: 60.3 },
  ];

  const totalCalls = callOutcomes.reduce((sum, item) => sum + item.value, 0);
  const connectionRate = ((callOutcomes.find(item => item.name === 'Connected')?.value || 0) / totalCalls * 100);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {state.isActive ? 1 : 0}
            </div>
            <div className="flex items-center mt-2">
              <Badge variant={state.isActive ? 'default' : 'secondary'}>
                {state.isActive ? 'Running' : 'Idle'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Calls Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalCalls}</div>
            <div className="text-sm text-gray-500 mt-1">
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Connection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {connectionRate.toFixed(1)}%
            </div>
            <Progress value={connectionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Call Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4:32</div>
            <div className="text-sm text-gray-500 mt-1">
              +0:15 from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Call Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Call Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Total Calls"
                />
                <Line 
                  type="monotone" 
                  dataKey="connections" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Connections"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Outcomes Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={callOutcomes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {callOutcomes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentPerformance.map((agent) => (
              <div key={agent.agent} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {agent.agent.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{agent.agent}</div>
                    <div className="text-sm text-gray-500">
                      {agent.connections}/{agent.calls} calls connected
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {agent.rate}%
                  </div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[
              { time: '3:42 PM', agent: 'Sarah M.', action: 'Connected call with John Smith at Tech Corp', status: 'success' },
              { time: '3:41 PM', agent: 'Mike R.', action: 'Left voicemail for Lisa Johnson at Marketing Inc', status: 'voicemail' },
              { time: '3:40 PM', agent: 'Lisa K.', action: 'Call ended - Callback scheduled for tomorrow', status: 'callback' },
              { time: '3:39 PM', agent: 'Tom W.', action: 'Connected call with David Wilson at Sales Ltd', status: 'success' },
              { time: '3:38 PM', agent: 'Sarah M.', action: 'Busy signal - Will retry in 15 minutes', status: 'busy' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'voicemail' ? 'bg-orange-500' :
                  activity.status === 'callback' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}></div>
                <div className="text-gray-500 w-16">{activity.time}</div>
                <div className="font-medium w-20">{activity.agent}</div>
                <div className="flex-1">{activity.action}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}