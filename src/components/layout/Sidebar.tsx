'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    description: 'Overview and quick stats',
  },
  {
    name: 'Dialer',
    href: '/dialer',
    description: 'Active calling interface',
    badge: 'Live',
  },
  {
    name: 'Contacts',
    href: '/contacts',
    description: 'Manage leads and lists',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    description: 'Performance and reports',
  },
  {
    name: 'Settings',
    href: '/settings',
    description: 'System configuration',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">PowerDialer</h1>
            <p className="text-sm text-gray-500">Operative System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start h-auto p-3 text-left',
                  isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? 'secondary' : 'default'}
                          className={cn(
                            'text-xs',
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-green-100 text-green-800'
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className={cn(
                      'text-xs mt-1',
                      isActive ? 'text-blue-100' : 'text-gray-500'
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <h3 className="text-sm font-medium text-blue-900">System Status</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-700">Connection</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-700">AI Services</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}