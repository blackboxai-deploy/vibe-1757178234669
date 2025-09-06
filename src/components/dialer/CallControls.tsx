'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDialer } from '@/contexts/DialerContext';

export function CallControls() {
  const { state, updateCallStatus } = useDialer();

  const handleEndCall = (callId: string) => {
    updateCallStatus(callId, 'disconnected');
  };

  const handleHoldCall = (callId: string) => {
    updateCallStatus(callId, 'on-hold');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Call Controls</CardTitle>
      </CardHeader>
      <CardContent>
        {state.activeCalls.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No active calls at the moment
          </div>
        ) : (
          <div className="space-y-4">
            {state.activeCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-medium">{call.phoneNumber}</div>
                    <div className="text-sm text-gray-500">
                      Contact ID: {call.contactId}
                    </div>
                  </div>
                  <Badge variant="outline">{call.status}</Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleHoldCall(call.id)}
                  >
                    Hold
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Transfer
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleEndCall(call.id)}
                  >
                    End Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}