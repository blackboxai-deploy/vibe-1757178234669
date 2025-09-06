'use client';

import { Layout } from '@/components/layout/Layout';
import { RealTimeMetrics } from '@/components/analytics/RealTimeMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">
            Real-time metrics, performance insights, and detailed reporting
          </p>
        </div>

        <Tabs defaultValue="realtime" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="realtime" className="mt-6">
            <RealTimeMetrics />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-500">
                Detailed performance metrics and agent comparisons coming soon
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Campaign Analytics
              </h3>
              <p className="text-gray-500">
                Campaign-specific metrics and ROI analysis coming soon
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Custom Reports
              </h3>
              <p className="text-gray-500">
                Generate and export custom reports coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}