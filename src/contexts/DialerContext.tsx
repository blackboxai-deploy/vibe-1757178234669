'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DialerState, CallSession, DialingMode, CallDisposition, DialerConfig } from '@/types/dialer';

interface DialerContextType {
  state: DialerState;
  startDialing: (contactIds: string[]) => void;
  stopDialing: () => void;
  switchMode: (mode: DialingMode) => void;
  updateCallStatus: (callId: string, status: CallSession['status']) => void;
  setDisposition: (callId: string, disposition: CallDisposition) => void;
  updateConfig: (config: Partial<DialerConfig>) => void;
}

const DialerContext = createContext<DialerContextType | undefined>(undefined);

type DialerAction =
  | { type: 'START_DIALING'; payload: string[] }
  | { type: 'STOP_DIALING' }
  | { type: 'SWITCH_MODE'; payload: DialingMode }
  | { type: 'UPDATE_CALL_STATUS'; payload: { callId: string; status: CallSession['status'] } }
  | { type: 'SET_DISPOSITION'; payload: { callId: string; disposition: CallDisposition } }
  | { type: 'UPDATE_CONFIG'; payload: Partial<DialerConfig> }
  | { type: 'UPDATE_METRICS' };

const initialState: DialerState = {
  isActive: false,
  currentMode: 'power',
  activeCalls: [],
  callQueue: [],
  metrics: {
    totalCalls: 0,
    connectedCalls: 0,
    voicemails: 0,
    busySignals: 0,
    noAnswers: 0,
    connectionRate: 0,
    averageCallDuration: 0,
    callsPerHour: 0,
  },
  config: {
    mode: 'power',
    simultaneousCalls: 1,
    callTimeout: 30,
    retryAttempts: 3,
    retryDelay: 300,
    enableRecording: true,
    enableVoicemail: true,
    predictiveFilters: {
      filterVoicemail: true,
      filterBusy: true,
      filterNoAnswer: true,
    },
  },
};

function dialerReducer(state: DialerState, action: DialerAction): DialerState {
  switch (action.type) {
    case 'START_DIALING':
      return {
        ...state,
        isActive: true,
        callQueue: action.payload,
      };
    case 'STOP_DIALING':
      return {
        ...state,
        isActive: false,
        activeCalls: [],
        callQueue: [],
      };
    case 'SWITCH_MODE':
      return {
        ...state,
        currentMode: action.payload,
        config: {
          ...state.config,
          mode: action.payload,
          simultaneousCalls: action.payload === 'parallel' ? 5 : 1,
        },
      };
    case 'UPDATE_CALL_STATUS':
      return {
        ...state,
        activeCalls: state.activeCalls.map(call =>
          call.id === action.payload.callId
            ? { ...call, status: action.payload.status }
            : call
        ),
      };
    case 'SET_DISPOSITION':
      return {
        ...state,
        activeCalls: state.activeCalls.map(call =>
          call.id === action.payload.callId
            ? { ...call, disposition: action.payload.disposition }
            : call
        ),
      };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    default:
      return state;
  }
}

export function DialerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dialerReducer, initialState);

  const startDialing = (contactIds: string[]) => {
    dispatch({ type: 'START_DIALING', payload: contactIds });
  };

  const stopDialing = () => {
    dispatch({ type: 'STOP_DIALING' });
  };

  const switchMode = (mode: DialingMode) => {
    dispatch({ type: 'SWITCH_MODE', payload: mode });
  };

  const updateCallStatus = (callId: string, status: CallSession['status']) => {
    dispatch({ type: 'UPDATE_CALL_STATUS', payload: { callId, status } });
  };

  const setDisposition = (callId: string, disposition: CallDisposition) => {
    dispatch({ type: 'SET_DISPOSITION', payload: { callId, disposition } });
  };

  const updateConfig = (config: Partial<DialerConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  };

  return (
    <DialerContext.Provider
      value={{
        state,
        startDialing,
        stopDialing,
        switchMode,
        updateCallStatus,
        setDisposition,
        updateConfig,
      }}
    >
      {children}
    </DialerContext.Provider>
  );
}

export const useDialer = () => {
  const context = useContext(DialerContext);
  if (context === undefined) {
    throw new Error('useDialer must be used within a DialerProvider');
  }
  return context;
};