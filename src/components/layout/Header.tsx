'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDialer } from '@/contexts/DialerContext';

export function Header() {
  const { state } = useDialer();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Power Dialer System
          </h2>
          <Badge 
            variant={state.isActive ? 'default' : 'secondary'}
            className={state.isActive ? 'bg-green-600' : 'bg-gray-500'}
          >
            {state.isActive ? 'Active' : 'Idle'}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          {/* Real-time metrics */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {state.activeCalls.length}
              </div>
              <div className="text-gray-500">Active Calls</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {state.metrics.connectionRate.toFixed(1)}%
              </div>
              <div className="text-gray-500">Connect Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {state.callQueue.length}
              </div>
              <div className="text-gray-500">In Queue</div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant={state.isActive ? 'destructive' : 'default'}
              size="sm"
            >
              {state.isActive ? 'Stop Dialing' : 'Start Dialing'}
            </Button>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}