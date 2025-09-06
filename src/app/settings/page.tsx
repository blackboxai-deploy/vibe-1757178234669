'use client';

import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useDialer } from '@/contexts/DialerContext';

export default function SettingsPage() {
  const { state, updateConfig } = useDialer();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure your power dialer system and AI features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dialer Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Dialer Configuration</CardTitle>
              <CardDescription>
                Configure calling behavior and system parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="call-timeout">Call Timeout (seconds)</Label>
                <Input
                  id="call-timeout"
                  type="number"
                  value={state.config.callTimeout}
                  onChange={(e) => updateConfig({ callTimeout: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input
                  id="retry-attempts"
                  type="number"
                  value={state.config.retryAttempts}
                  onChange={(e) => updateConfig({ retryAttempts: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-delay">Retry Delay (seconds)</Label>
                <Input
                  id="retry-delay"
                  type="number"
                  value={state.config.retryDelay}
                  onChange={(e) => updateConfig({ retryDelay: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-recording">Call Recording</Label>
                  <p className="text-sm text-gray-500">
                    Automatically record all calls
                  </p>
                </div>
                <Switch
                  id="enable-recording"
                  checked={state.config.enableRecording}
                  onCheckedChange={(checked) => updateConfig({ enableRecording: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-voicemail">Voicemail Detection</Label>
                  <p className="text-sm text-gray-500">
                    Detect and handle voicemails automatically
                  </p>
                </div>
                <Switch
                  id="enable-voicemail"
                  checked={state.config.enableVoicemail}
                  onCheckedChange={(checked) => updateConfig({ enableVoicemail: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Predictive Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Predictive Dialer Filters</CardTitle>
              <CardDescription>
                Configure smart filtering for predictive dialing mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Filter Voicemails</Label>
                  <p className="text-sm text-gray-500">
                    Skip calls that go to voicemail
                  </p>
                </div>
                <Switch
                  checked={state.config.predictiveFilters.filterVoicemail}
                  onCheckedChange={(checked) => 
                    updateConfig({
                      predictiveFilters: {
                        ...state.config.predictiveFilters,
                        filterVoicemail: checked
                      }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Filter Busy Signals</Label>
                  <p className="text-sm text-gray-500">
                    Skip busy numbers automatically
                  </p>
                </div>
                <Switch
                  checked={state.config.predictiveFilters.filterBusy}
                  onCheckedChange={(checked) => 
                    updateConfig({
                      predictiveFilters: {
                        ...state.config.predictiveFilters,
                        filterBusy: checked
                      }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Filter No Answer</Label>
                  <p className="text-sm text-gray-500">
                    Skip unanswered calls
                  </p>
                </div>
                <Switch
                  checked={state.config.predictiveFilters.filterNoAnswer}
                  onCheckedChange={(checked) => 
                    updateConfig({
                      predictiveFilters: {
                        ...state.config.predictiveFilters,
                        filterNoAnswer: checked
                      }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure AI-powered features and models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select defaultValue="claude-sonnet-4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude-sonnet-4">Claude Sonnet 4</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-haiku">Claude Haiku</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">API Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Endpoint:</span>
                    <span className="text-blue-600 font-mono text-xs">
                      https://oi-server.onrender.com/...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Status:</span>
                    <Badge variant="default" className="bg-green-600">
                      Connected
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate Voicemails</Label>
                  <p className="text-sm text-gray-500">
                    Automatically create personalized voicemails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Call Summaries</Label>
                  <p className="text-sm text-gray-500">
                    Generate AI summaries after each call
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Version:</span>
                  <div className="font-medium">PowerDialer v2.1.0</div>
                </div>
                <div>
                  <span className="text-gray-500">License:</span>
                  <div className="font-medium">Enterprise</div>
                </div>
                <div>
                  <span className="text-gray-500">Uptime:</span>
                  <div className="font-medium">4 days, 12 hours</div>
                </div>
                <div>
                  <span className="text-gray-500">Active Users:</span>
                  <div className="font-medium">4 agents</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full">
                  Export System Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}