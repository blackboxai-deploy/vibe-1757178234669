'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDialer } from '@/contexts/DialerContext';
import { useContacts } from '@/contexts/ContactsContext';

export function Dashboard() {
  const { state: dialerState } = useDialer();
  const { state: contactsState } = useContacts();

  // Mock data for demonstration
  const todayMetrics = {
    callsStarted: 147,
    connectionsToday: 89,
    voicemailsLeft: 23,
    appointmentsSet: 12,
    conversionRate: 13.5,
    averageCallDuration: 245,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'call',
      contact: 'John Smith',
      company: 'Tech Corp',
      outcome: 'Connected',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'voicemail',
      contact: 'Sarah Johnson',
      company: 'Marketing Inc',
      outcome: 'Voicemail sent',
      time: '5 minutes ago',
    },
    {
      id: 3,
      type: 'callback',
      contact: 'Mike Wilson',
      company: 'Sales Ltd',
      outcome: 'Callback scheduled',
      time: '8 minutes ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to PowerDialer</h1>
        <p className="text-blue-100 mb-4">
          Your comprehensive power dialing solution with AI-powered features
        </p>
        <div className="flex items-center space-x-4">
          <Button 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Start New Campaign
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Import Contacts
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {todayMetrics.callsStarted}
            </div>
            <p className="text-xs text-gray-500">
              {todayMetrics.connectionsToday} connected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Connection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {((todayMetrics.connectionsToday / todayMetrics.callsStarted) * 100).toFixed(1)}%
            </div>
            <Progress 
              value={(todayMetrics.connectionsToday / todayMetrics.callsStarted) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {contactsState.contacts.length}
            </div>
            <p className="text-xs text-gray-500">
              {contactsState.selectedContacts.length} selected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Conversions Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {todayMetrics.appointmentsSet}
            </div>
            <p className="text-xs text-gray-500">
              {todayMetrics.conversionRate}% rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dialing Status */}
        <Card>
          <CardHeader>
            <CardTitle>Dialing Status</CardTitle>
            <CardDescription>
              Current system status and active campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Status</span>
                <Badge variant={dialerState.isActive ? 'default' : 'secondary'}>
                  {dialerState.isActive ? 'Active' : 'Idle'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dialing Mode</span>
                <Badge variant="outline">
                  {dialerState.currentMode.charAt(0).toUpperCase() + dialerState.currentMode.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Calls</span>
                <span className="text-sm text-gray-600">
                  {dialerState.activeCalls.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Queue Length</span>
                <span className="text-sm text-gray-600">
                  {dialerState.callQueue.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest calls and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'call' ? 'bg-blue-500' :
                    activity.type === 'voicemail' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.contact}
                      </p>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {activity.company} • {activity.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Preview */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Features</CardTitle>
          <CardDescription>
            Intelligent automation and insights for better results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Smart Voicemails</h3>
              <p className="text-sm text-gray-600">
                AI-generated personalized voicemail messages
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Call Summaries</h3>
              <p className="text-sm text-gray-600">
                Automated conversation analysis and insights
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Predictive Analytics</h3>
              <p className="text-sm text-gray-600">
                Smart lead scoring and optimization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}