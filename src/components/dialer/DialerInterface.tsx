'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useDialer } from '@/contexts/DialerContext';
import { CallControls } from './CallControls';
import { DialingMode } from '@/types/dialer';

export function DialerInterface() {
  const { state, startDialing, stopDialing, switchMode } = useDialer();
  const [selectedContacts] = useState<string[]>([]);

  const handleModeSwitch = (mode: string) => {
    switchMode(mode as DialingMode);
  };

  const handleStartDialing = () => {
    if (selectedContacts.length > 0) {
      startDialing(selectedContacts);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dialer Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Power Dialer Interface</h1>
            <p className="text-indigo-100">
              Advanced calling system with AI-powered features
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-100">Current Mode</div>
            <Badge className="bg-white text-indigo-600 font-semibold">
              {state.currentMode.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Dialing Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Dialing Modes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={state.currentMode} onValueChange={handleModeSwitch} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="power">Power Dialer</TabsTrigger>
              <TabsTrigger value="parallel">Parallel Dialer</TabsTrigger>
              <TabsTrigger value="predictive">Predictive Dialer</TabsTrigger>
              <TabsTrigger value="ringless">Ringless VM</TabsTrigger>
            </TabsList>
            
            <TabsContent value="power" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Power Dialer</h3>
                <p className="text-gray-600">
                  Sequential one-at-a-time calling with full conversation control.
                  Perfect for high-quality, personalized interactions.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Simultaneous Calls:</span> 1
                  </div>
                  <div>
                    <span className="font-medium">Control Level:</span> Full
                  </div>
                  <div>
                    <span className="font-medium">Best For:</span> Quality conversations
                  </div>
                  <div>
                    <span className="font-medium">Efficiency:</span> Medium
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="parallel" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parallel Dialer</h3>
                <p className="text-gray-600">
                  Simultaneous calling to 5 numbers with first-answered priority.
                  Maximizes connection opportunities.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Simultaneous Calls:</span> 5
                  </div>
                  <div>
                    <span className="font-medium">Control Level:</span> Automated
                  </div>
                  <div>
                    <span className="font-medium">Best For:</span> High volume
                  </div>
                  <div>
                    <span className="font-medium">Efficiency:</span> High
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="predictive" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Predictive Dialer</h3>
                <p className="text-gray-600">
                  Smart filtering of voicemails, busy signals, and unanswered calls.
                  AI-powered call optimization.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Smart Filtering:</span> Enabled
                  </div>
                  <div>
                    <span className="font-medium">AI Optimization:</span> Active
                  </div>
                  <div>
                    <span className="font-medium">Best For:</span> Qualified leads
                  </div>
                  <div>
                    <span className="font-medium">Efficiency:</span> Very High
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ringless" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ringless Voicemail</h3>
                <p className="text-gray-600">
                  Direct voicemail drops without ringing phones.
                  Perfect for follow-ups and mass messaging.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Phone Rings:</span> No
                  </div>
                  <div>
                    <span className="font-medium">AI Voicemails:</span> Supported
                  </div>
                  <div>
                    <span className="font-medium">Best For:</span> Follow-ups
                  </div>
                  <div>
                    <span className="font-medium">Efficiency:</span> Maximum
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Status */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Status</span>
                <Badge variant={state.isActive ? 'default' : 'secondary'}>
                  {state.isActive ? 'Active' : 'Ready'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Calls in Queue</span>
                  <span className="font-medium">{state.callQueue.length}</span>
                </div>
                <Progress value={(state.callQueue.length / 100) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Active Calls</span>
                  <span className="font-medium">{state.activeCalls.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Connection Rate</span>
                  <span className="font-medium text-green-600">
                    {state.metrics.connectionRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={state.isActive ? stopDialing : handleStartDialing}
                  className={`w-full ${
                    state.isActive 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                  disabled={!state.isActive && selectedContacts.length === 0}
                >
                  {state.isActive ? 'Stop Campaign' : 'Start Dialing'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Live Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {state.metrics.totalCalls}
                </div>
                <div className="text-xs text-gray-600">Total Calls</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {state.metrics.connectedCalls}
                </div>
                <div className="text-xs text-gray-600">Connected</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {state.metrics.voicemails}
                </div>
                <div className="text-xs text-gray-600">Voicemails</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {state.metrics.callsPerHour}
                </div>
                <div className="text-xs text-gray-600">Calls/Hour</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Call Controls */}
      {state.isActive && (
        <CallControls />
      )}
    </div>
  );
}